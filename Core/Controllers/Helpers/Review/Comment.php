<?php

namespace Flycart\Review\Core\Controllers\Helpers\Review;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\OrderReview;
use Flycart\Review\Core\Models\Review;


class Comment
{
    public $order = null;
    public $product;
    public $comment = null;
    public $comment_meta = [];
    public $attachments = [];

    public function __construct($product_id, $order_id = null)
    {
        $this->product = wc_get_product($product_id);

        if ($order_id) {
            $this->order = wc_get_order($order_id);
            $this->setComment();
            $this->setAttachments();
        }
    }

    public function setComment()
    {
        if (!$this->order) {
            // If no order is provided, skip fetching the comment
            return;
        }

        $commentMetaTable = Database::getCommentsMetaTable();
        $commentsTable = Database::getCommentsTable();

        // Fetch the comment and meta if the order is present
        $comment = Database::table($commentsTable)
            ->select("*, {$commentMetaTable}.meta_key as order_meta_key, {$commentMetaTable}.meta_value as order_meta_id")
            ->leftJoin($commentMetaTable, "{$commentsTable}.comment_ID = {$commentMetaTable}.comment_id")
            ->where("{$commentsTable}.comment_post_ID = %d AND comment_type = %s", [$this->product->get_id(), 'review'])
            ->where(
                "{$commentMetaTable}.meta_key = %s AND {$commentMetaTable}.meta_value = %d",
                [OrderReview::COMMENT_META_ORDER_KEY, $this->order->get_id()]
            )
            ->first();

        if ($comment) {
            $this->comment = (array)$comment;
            $this->comment_meta = get_comment_meta($comment->comment_ID);
        }
    }

    public function isCommentAlreadyAddedForProductOrder()
    {
        // If there's no order, allow adding a new comment
        if (!$this->order) {
            return false;
        }

        return $this->comment && !empty($this->comment['order_meta_id']);
    }

    public function setAttachments()
    {
        $attachments = [];

        if ($this->comment) {
            foreach ($this->comment_meta as $key => $meta) {
                if ($key == '_r_review_attachments') {
                    $attachments = Functions::jsonDecode($meta[0]);
                    break;
                }
            }
        }

        $this->attachments = [
            'photos' => $attachments['photos'] ?? [],
            'videos' => $attachments['videos'] ?? []
        ];
    }

    public function isEnableAddPhotos()
    {
        //TODO: the second is not mandatory i think
        return apply_filters('flycart_review_enable_add_photos_in_new_comments', true) && count($this->attachments['photos'] ?? []) < 5;
    }

    public function getNextReviewItems()
    {
        if (!$this->order) {
            return []; // Return empty if no order
        }

        $items = $this->order->get_items();
        $items = array_filter($items, function ($item) {
            return $this->product->get_id() != $item['product_id'];
        });

        $args = [
            'meta_query' => [
                [
                    'key' => '_review_order_id',
                    'compare' => '=',
                    'value' => $this->order->get_id(),
                ],
            ],
            'type' => 'review'
        ];

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

    public function updateComment($comment_data, $comment_meta_data = [])
    {
        if (!$this->comment) {
            // If no comment exists, create a new one
            $comment_id = wp_insert_comment($comment_data);

            // Add meta data if provided
            foreach ($comment_meta_data as $meta_key => $meta_value) {
                update_comment_meta($comment_id, $meta_key, $meta_value);
            }

            $this->comment = get_comment($comment_id, ARRAY_A);
            $this->comment_meta = get_comment_meta($comment_id);

            Review::query()->create([
                'review_id' =>  $comment_id,
                'order_id' =>  $comment_meta_data['_review_order_id'],
                'product_id' =>  $comment_data['comment_post_ID'],
                'woo_order_id' => $comment_meta_data['_review_order_id'],
                'customer_email' => $comment_data['comment_author_email'],
                'created_at' =>  Functions::currentUTCTime(),
                'updated_at' =>  Functions::currentUTCTime(),
            ]);
        } else {

            if (!empty($comment_data)) {
                // If a comment exists, update it
                wp_update_comment($comment_data);
            }

            // Update meta data
            foreach ($comment_meta_data as $meta_key => $meta_value) {
                update_comment_meta($this->comment['comment_ID'], $meta_key, $meta_value);
            }

            // Refresh the comment and meta data in the class
            $this->comment = get_comment($this->comment['comment_ID'], ARRAY_A);
            $this->comment_meta = get_comment_meta($this->comment['comment_ID']);
        }

        return $this->comment['comment_ID'];
    }

    public function isPhotoAlreadyAdded()
    {
        return count($this->attachments['photos'] ?? []);
    }
}
