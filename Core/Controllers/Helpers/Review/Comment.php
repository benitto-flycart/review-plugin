<?php

namespace Flycart\Review\Core\Controllers\Helpers\Review;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\OrderReview;

class Comment
{
    public $order;

    public $product;
    public $comment = null;
    public $comment_meta = [];
    public $attachments = [];


    public function __construct($order_id, $product_id)
    {
        $this->order = wc_get_order($order_id);
        $this->product = wc_get_product($product_id);
        $this->setComment();
        $this->setAttachments();
    }

    public function setComment()
    {
        $commentMetaTable = Database::getCommentsMetaTable();
        $commentsTable = Database::getCommentsTable();

        $comment = Database::table($commentsTable)
            ->select("{$commentMetaTable}.meta_key as order_meta_key, {$commentMetaTable}.meta_value as order_meta_id ,*")
            ->leftJoin($commentMetaTable, "{$commentsTable}.comment_ID = {$commentMetaTable}.comment_id")
            ->where("{$commentsTable}.comment_post_ID = %d AND comment_type = %s", [$this->product->get_id(), 'review'])
            ->where("{$commentMetaTable}.meta_key = %s AND {$commentMetaTable}.meta_value = %d",
                [OrderReview::COMMENT_META_ORDER_KEY, $this->order->get_id()])
            ->first();

        if ($comment) {
            $this->comment = (array)$comment;
            $this->comment_meta = get_comment_meta($comment->comment_ID);
        }
    }

    public function isCommentAlreadyAddedForProductOrder()
    {
        return $this->comment && !empty($this->comment['order_meta_id']);
    }

    public function setAttachments()
    {
        if ($this->comment) {
            $meta_data = array_filter($this->comment_meta, function ($meta) {
                return $meta['meta_key'] == '_r_review_attachments';
            });
            if (count($meta_data) == 1) {
                $attachments = $meta_data[0];
            }
            $attachments = Functions::jsonDecode($attachments);
        }

        $this->attachments = [
            'photos' => $attachments['photos'] ?? [],
            'videos' => $attachments['videos'] ?? []
        ];
    }

    public function isEnableAddPhotos()
    {
        return apply_filters('flycart_review_enable_add_photos_in_new_comments', true) && count($this->attachments['photos']) < 5;
    }

    public function getNextReviewItems()
    {
        $items = $this->order->get_items();

        $items = array_filter($items, function ($item) {
            return $this->product->get_id() != $item['product_id'];
        });

        $args = [
            'meta_query' => [
                [
                    'key' => '_review_order_id',  // Replace with your meta key
                    'compare' => '=',  // Ensure the meta key exists
                    'value' => $this->order->get_id(),  // Ensure the meta key exists
                ],
            ],
            'type' => 'review'
        ];

// Fetch comments with the specified meta key
        $comments = get_comments($args);

        $product_ids = [];

        foreach ($comments as $comment) {
            $product_ids[] = $comment->comment_post_ID;
        }

        $remaining_items = [];

        foreach ($items as $item) {
            if (!in_array($item['product_id'], $product_ids)) {
                $remaining_items[] = $item;
            }
        }

        return $remaining_items;

    }
}