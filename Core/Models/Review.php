<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\App\Model;
use Flycart\Review\App\Services\Database;

class Review extends Model
{
    protected static $table = 'reviews';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                review_id BIGINT UNSIGNED,
                product_id BIGINT UNSIGNED,
                order_id BIGINT UNSIGNED NULL,
                woo_order_id BIGINT UNSIGNED NULL,
                customer_email VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }


    public function has_user_purchased_product($product_id)
    {
        global $wpdb;

        // Get the current user ID
        $user_id = get_current_user_id();

        if (!$user_id) {
            return false;
        }

        // Custom SQL query to check if the user has purchased the product
        $results = $wpdb->get_var($wpdb->prepare(
            "
        SELECT COUNT(*)
        FROM {$wpdb->prefix}woocommerce_order_items AS order_items
        JOIN {$wpdb->prefix}woocommerce_order_itemmeta AS itemmeta ON order_items.order_item_id = itemmeta.order_item_id
        JOIN {$wpdb->prefix}posts AS posts ON order_items.order_id = posts.ID
        WHERE itemmeta.meta_key = '_product_id'
        AND itemmeta.meta_value = %d
        AND posts.post_type = 'shop_order'
        AND posts.post_status = 'wc-completed'
        AND posts.post_author = %d
        ",
            $product_id,
            $user_id
        ));

        return $results > 0; // Return true if at least one order contains the product
    }


    public function has_user_purchased_product_hpos($product_id)
    {
        global $wpdb;

        // Get the current user ID
        $user_id = get_current_user_id();
        if (!$user_id) {
            return false;
        }

        // Custom SQL query to check if the user has purchased the product (for HPOS-enabled sites)
        $results = $wpdb->get_var($wpdb->prepare(
            "
        SELECT COUNT(*)
        FROM {$wpdb->prefix}wc_order_items AS order_items
        JOIN {$wpdb->prefix}wc_order_itemmeta AS itemmeta ON order_items.order_item_id = itemmeta.order_item_id
        JOIN {$wpdb->prefix}wc_orders AS orders ON order_items.order_id = orders.id
        WHERE itemmeta.meta_key = '_product_id'
        AND itemmeta.meta_value = %d
        AND orders.customer_id = %d
        AND orders.status = 'wc-completed'
        ",
            $product_id,
            $user_id
        ));

        return $results > 0; // Return true if at least one order contains the product
    }

    public static function getReviews($filters)
    {

        $default_filters = [
            'type' => 'comment',
            'update_comment_meta_cache' => true,
        ];

        if (isset($filters['product_id']) && !empty($filters['product_id'])) {
            $default_filters['post_id'] = $filters['product_id'];
        }

        $filters = [
            'paged' => $filters['current_page'] ?? 1,
            'parent' => $filters['parent'] ?? 0,
            'number' => $filters['per_page'] ?? 50,
            'status' => $filters['status'] ?? 'all',
            'search' => $filters['search'] ?? '',
        ];

        $comments = get_comments(array_merge($default_filters, $filters));

        $commentsAsArray = [];

        $response = [];

        foreach ($comments as $index => $comment) {
            $commentsAsArray[$index] = (array)$comment;
            $commentsAsArray[$index]['comment_meta'] = get_comment_meta($comment->comment_ID);
            $response[] = static::buildCommentArray($commentsAsArray[$index]);
        }

        return $response;
    }

    public static function buildCommentArray($comment)
    {
        return [
            'id' => $comment['comment_ID'],
            'reviewer_name' => $comment['comment_author'],
            'rating' => static::getCommentMeta($comment['comment_meta'], 'rating'),
            'is_verified' => (bool)$comment['comment_approved'],
            'date' => Functions::getWcTimeFromGMT($comment['comment_date_gmt']),
            'content' => $comment['comment_content'],
            'images' => static::getReviewImages($comment['comment_meta']),
            'replies' => static::getReviews([
                'per_page' => 100,
                'current_page' => 1,
                'parent' => $comment['comment_ID'],
                'status' => 'all',
            ]),
            //if the comment parent ID is not 0 then it means it was a reply comment no need to return the product again.
            'product' => $comment['comment_parent'] == 0 ? static::getReviewProductDetails(WC::getProduct($comment['comment_post_ID'])) : [],
        ];
    }

    public static function getCommentMeta($meta, $key)
    {
        if (isset($meta[$key])) {
            return $meta[$key][0] ?? null;
        }

        return null;
    }

    public static function getReviewImages($meta)
    {
        $attachments = static::getCommentMeta($meta, '_review_attachments');

        $attachments = Functions::jsonDecode($attachments);

        if (isset($attachments['photos'])) {
            $ids = array_column(array_filter($attachments['photos'], function ($attachment) {
                return !isset($attachment['is_hide']) || !$attachment['is_hide'];
            }), 'attachment_id');

            if (empty($ids)) return [];

            $args = array(
                'post_type' => 'attachment', // You can use any post type like 'page', 'attachment', or custom post types
                'posts_per_page' => 20,     // Retrieve all posts (or set a specific number)
                'post__in' => $ids, // The array of post IDs to retrieve
                'post_parent' => 0,
                'orderby' => 'DESC',          // Order by the array's order
            );

            $posts = get_posts($args);
            $images = static::getReviewImageDetails($posts);
            return $images;
        }
        return [];
    }

    public static function getReviewProductDetails($product)
    {
        $attachment_id = $product->get_image_id(); // Get the image attachment ID
        if ($attachment_id) {
            $product_image_url = wp_get_attachment_image_url($attachment_id, 'small'); // Get the image URL for a specific size
            $image = $product_image_url; // Outputs the URL for the 'large' image size
        } else {
            $image = null;
        }
        return [
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'product_url' => get_permalink($product->get_id()),
            'product_image' => $image,
        ];
    }

    public static function getReviewImageDetails($posts)
    {
        $attachments = [];

        foreach ($posts as $index => $attachment) {
            $attachments[$index]['variants'] = static::get_image_sizes_urls($attachment->ID);
            $attachments[$index]['id'] = $attachment->ID;
            $attachments[$index]['date'] = Functions::getWcTimeFromGMT($attachment->post_date_gmt);
            $attachments[$index]['title'] = $attachment->post_title;
            $attachments[$index]['status'] = $attachment->post_status;
            $attachments[$index]['modified_date'] = Functions::getWcTimeFromGMT($attachment->post_modified_gmt);
        }

        return $attachments;
    }

    public static function get_image_sizes_urls($attachment_id)
    {
        $sizes = array('thumbnail', 'medium', 'large', 'full'); // Specify image sizes
        $image_urls = array();

        foreach ($sizes as $size) {
            $image = wp_get_attachment_image_src($attachment_id, $size);
            if ($image) {
                $image_urls[$size] = $image[0]; // Store the URL for each size
            }
        }

        return $image_urls;
    }
}
