<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\Order;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\DiscountSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\App\Model;
use Flycart\Review\App\Services\Database;

class Review extends Model
{
    protected static $table = 'reviews';

    public const COMMENT_TYPE = 'comment';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        //#review_id means comment_id
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

    /**
     * @return bool|<missing>
     * @param mixed $product_id
     */
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
    /**
     * @return bool|<missing>
     * @param mixed $product_id
     */
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

    public static function getReviewsCount($filters)
    {
        $default_filters = [
            'type' => static::getCommentType(),
            'count' => true,
        ];

        if (isset($filters['product_id']) && !empty($filters['product_id'])) {
            $default_filters['post_id'] = $filters['product_id'];
        }

        $filters = array_merge([
            'parent' => $filters['parent'] ?? 0,
            'status' => $filters['status'] ?? 'all',
            'search' => $filters['search'] ?? '',
            'meta_query' => $filters['meta_query'] ?? [],
        ], $filters);

        $filters = array_merge($default_filters, $filters);
        return get_comments($filters);
    }

    /**
     * @return array
     * @param mixed $filters
     */
    public static function getReviews($filters)
    {

        $default_filters = [
            'type' => static::getCommentType(),
            'update_comment_meta_cache' => true,
        ];

        if (isset($filters['product_id']) && !empty($filters['product_id'])) {
            $default_filters['post_id'] = $filters['product_id'];
        }

        $filters = array_merge([
            'paged' => $filters['current_page'] ?? 1,
            'parent' => $filters['parent'] ?? 0,
            'number' => $filters['per_page'] ?? 50,
            'status' => $filters['status'] ?? 'all',
            'search' => $filters['search'] ?? '',
            'meta_query' => $filters['meta_query'] ?? [],
        ], $filters);

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

    /**
     * Build Comment Array
     *
     * @param mixed $comment
     *
     * @return array<string,mixed>
     */
    public static function buildCommentArray($comment)
    {
        return [
            'id' => $comment['comment_ID'],
            'reviewer_name' => $comment['comment_author'],
            'rating' => (int)static::getMeta($comment['comment_meta'], 'rating'),
            'is_verified' => (int)static::getMeta($comment['comment_meta'], 'verified'),
            'date' => Functions::getWcTimeFromGMT($comment['comment_date_gmt']),
            'content' => $comment['comment_content'],
            'is_approved' => (int)Functions::getBoolValue($comment['comment_approved']),
            'status' => static::getCommentStatus($comment['comment_approved']),
            'images' => static::getReviewImages($comment['comment_meta']),
            'from_order' => (int)$order_id = static::getMeta($comment['comment_meta'], '_review_order_id'),
            'order_url' => $order_id ? Order::getOrderEditURL($order_id) : null,
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

    /**
     * @param mixed $key
     * @param mixed $meta
     * @return mixed|null
     */

    public static function getMeta($meta, $key)
    {
        if (isset($meta[$key])) {
            return $meta[$key][0] ?? null;
        }

        return null;
    }

    /**
     * @return array|<missing>
     * @param mixed $meta
     */
    public static function getReviewImages($meta)
    {
        $attachments = static::getMeta($meta, '_review_attachments');

        $attachments = Functions::jsonDecode($attachments);

        if (isset($attachments['photos'])) {
            $ids = array_column($attachments['photos'], 'attachment_id');

            if (empty($ids)) return [];

            $args = array(
                'post_type' => 'attachment',
                'posts_per_page' => 20,
                'post__in' => $ids,
                'post_parent' => 0,
                'orderby' => 'DESC',
            );

            $posts = get_posts($args);

            $response = [];

            foreach ($posts as $index => $post) {
                $post = (array)$post;
                $post_meta = get_post_meta($post['ID']);

                $response[] = static::buildPostArray($post, $post_meta);
            }

            return $response;
        }
        return [];
    }

    public static function buildPostArray($post, $post_meta)
    {
        $image = static::getReviewImageDetails($post, $post_meta);
        return $image;
    }

    /**
     * @return array|array<string,mixed>
     * @param mixed $product
     */
    public static function getReviewProductDetails($product)
    {
        if (empty($product)) return [];

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

    /**
     * @return array
     * @param mixed $posts
     */
    public static function getReviewImageDetails($attachment, $post_meta)
    {

        $attachment['variants'] = static::get_image_sizes_urls($attachment["ID"]);
        $attachment['id'] =  $attachment["ID"];
        $attachment['date'] = Functions::getWcTimeFromGMT($attachment['post_date_gmt']);
        $attachment['title'] = $attachment['post_title'];
        $attachment['status'] = $attachment['post_status'];
        $attachment['modified_date'] = Functions::getWcTimeFromGMT($attachment['post_modified_gmt']);
        $attachment['is_cover_photo'] = Functions::getBoolValue(static::getMeta($post_meta, '_review_cover_photo'));
        $attachment['is_hide'] = Functions::getBoolValue(static::getMeta($post_meta, '_review_hide_photo'));

        return $attachment;
    }
    /**
     * @return array
     * @param mixed $attachment_id
     */
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

    public static function deleteReview($review_id)
    {
        //delete review here
        wp_delete_comment($review_id);
    }

    public static function updateApproveStatus($review_id, $value)
    {
        wp_set_comment_status($review_id, $value ? 'approve' : 'hold');
        //update review approval status
    }

    public static function updateVerifiedStatus($review_id, $value)
    {
        //update review verified status
        $status = update_comment_meta($review_id, 'verified', $value ? 1 : 0);
        return $status;
    }

    public static function getCommentType()
    {
        return apply_filters('farp_test_comment_type', static::COMMENT_TYPE);
    }

    public static function sendPhotoRequestEmail($product_id, $order_id)
    {
        if (\ActionScheduler::is_initialized()) {

            $generalSettings = (new GeneralSettings);

            NotificationHistory::query()->create([
                'model_id' => $product_id,
                'model_type' => 'product',
                'order_id' => $order_id,
                'status' =>  'pending',
                'notify_type' => SettingsModel::EMAIL_PHOTO_REQUEST_TYPE,
                'medium' => NotificationHistory::MEDIUM_EMAIL,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $notificationHistoryId = NotificationHistory::query()->lastInsertedId();

            //Add Option in Settings Page when to send review
            $hook_name = F_Review_PREFIX . 'send_review_photo_request_email';

            $delay = $generalSettings->getReviewPhotoRequestDelay();

            $delay = PluginHelper::getStrTimeString($delay, 'days');

            as_schedule_single_action(strtotime("+{$delay}"), $hook_name, [['notification_id' => $notificationHistoryId, 'product_id' => $product_id]]);
        }
    }

    public static function createDiscountForPhotoReview($review_id, $product_id, $order_id = null)
    {
        $discountSettings = (new DiscountSettings);

        if (!empty($order_id)) {
            $orderReview = OrderReview::query()->where("woo_order_id = %d", [$order_id])->first();
        }

        if (empty($orderReview)) return [false, null];

        [$coupon_code, $expiry_date] = $discountSettings->generateCoupon($review_id);

        OrderReview::query()->update([
            'photo_added' => true,
            'photo_discount_code' => $coupon_code,
        ], ['id' => $orderReview->id]);

        if (\ActionScheduler::is_initialized()) {

            $generalSettings = (new GeneralSettings);

            NotificationHistory::query()->create([
                'model_id' => $product_id,
                'model_type' => 'product',
                'order_id' => $order_id,
                'status' =>  'pending',
                'notify_type' => SettingsModel::EMAIL_DISCOUNT_NOTIFY_TYPE,
                'medium' => NotificationHistory::MEDIUM_EMAIL,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $notificationHistoryId = NotificationHistory::query()->lastInsertedId();

            //Add Option in Settings Page when to send review
            $hook_name = F_Review_PREFIX . 'send_discount_notify_email';

            $delay = $generalSettings->getDiscountNotifyDelay();

            $delay = PluginHelper::getStrTimeString($delay, 'days');

            as_schedule_single_action(strtotime("+{$delay}"), $hook_name, [
                [
                    'notification_id' => $notificationHistoryId,
                    'product_id' => $product_id,
                    'order_review_id' => $orderReview->id,
                ]
            ]);
        }

        return [$coupon_code, $expiry_date];
    }


    public static function getRatingCounts($product_id = null)
    {
        $commentTable = Database::getCommentsTable();
        $commentMetaTable = Database::getCommentsMetaTable();

        $rating_count = Database::table($commentTable)
            ->select("{$commentMetaTable}.meta_value as meta_value, COUNT(*) as count")
            ->leftJoin($commentMetaTable, "{$commentMetaTable}.comment_id = {$commentTable}.comment_ID")
            ->where("{$commentMetaTable}.meta_key = %s", ["rating"])
            ->when($product_id,  function (Database $query) use ($product_id) {
                return $query->where("comment_post_ID = %d", [$product_id]);
            })
            ->where("{$commentTable}.comment_approved = %d", [1])
            ->groupBy("{$commentMetaTable}.meta_value");

        $rating_count = $rating_count->get();

        if (empty($rating_count)) return [];

        return array_column($rating_count, 'count', 'meta_value');
    }

    public static function approvedStatusFromSettings($rating)
    {
        $generalSettings = (new GeneralSettings);
        $auto_publish_enabled = $generalSettings->isAutoPublishEnabled();

        $auto_publish_enabled = apply_filters('farp_test_auto_publish_enabled', $auto_publish_enabled, $rating);

        return $auto_publish_enabled ? 1 : 0;
    }

    public static function getCommentStatus($comment_approved)
    {
        if ($comment_approved == 1) {
            return 'approved';
        } else if ($comment_approved == 'trash') {
            return 'trash';
        } else if ($comment_approved == 'spam') {
            return 'spam';
        } else if ($comment_approved == 0) {
            return 'hold';
        }
    }

    public static function getStatusValue($status)
    {
        if ($status == 'all') {
            return 'all';
        } else if ($status == 'approve') {
            return 'approve';
        } else if ($status == 'hold') {
            return 'hold';
        } else if ($status == 'trash') {
            return 'trash';
        } else if ($status == 'spam') {
            return 'spam';
        }

        return null;
    }
}
