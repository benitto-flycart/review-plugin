<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Model;

class EmailSetting extends Model
{
    protected static $table = 'email_settings';

    const REVIEW_REQUEST_TYPE = 'review_request';
    const REVIEW_REMINDER_TYPE = 'review_remainder';
    const PHOTO_REQUEST_TYPE = 'review_photo_request';

    const DISCOUNT_REQUEST_TYPE = 'review_discount_request';

    const REPLY_REQUEST_TYPE = 'review_reply_request';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                type VARCHAR(255) NOT NULL,
                language VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL,
                settings JSON NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }

    public static function getReviewSettingsAsArray($settings)
    {
        if (is_array($settings)) return $settings;

        return Functions::jsonDecode($settings);
    }



    public static function getDefaultReviewRemainderSettings($language)
    {
        $data = [
            'body' => __('Review Remainder Body', 'flycart-review'),
            'subject' => __('Review Remainder Subject', 'flycart-review'),
            'button_text' => __('Review Remainder Button Text', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Remainder Body') {
            $data['body'] = "Hello {name}, We would be grateful if you shared how things look and feel . Your reviews help us and the community that support us, and it only takes a few seconds";
        }

        if ($data['subject'] == 'Review Remainder Subject') {
            $data['subject'] = "Reminder: Order #{order_number}, how did it go?";
        }

        if ($data['button_text'] == 'Review Remainder Button Text') {
            $data['button_text'] = 'Write a Review';
        }

        return apply_filters('flycart_review_review_remainder_data', $data, $language);
    }

    public static function getDefaultReviewPhotoRequestSettings($language)
    {
        $data = [
            'body' => __('Review Photo Request Body', 'flycart-review'),
            'minimum_star' => '5_stars',
            'subject' => __('Review Photo Request Subject', 'flycart-review'),
            'discount_text' => __('Review Photo Request Discount Text', 'flycart-review'),
            'button_text' => __('Review Photo Request Button Text', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Photo Request Body') {
            $data['body'] = "Hello {name}, We would be grateful if you shared how things look and feel . Your reviews help us and the community that support us, and it only takes a few seconds";
        }

        if ($data['subject'] == 'Review Photo Request Subject') {
            $data['subject'] = "Reminder: Order #{order_number}, how did it go?";
        }

        if ($data['discount_text'] == 'Review Photo Request Discount Text') {
            $data['discount_text'] = 'Add Photo/Video to get the discount off on next purchase';
        }

        if ($data['button_text'] == 'Review Photo Request Button Text') {
            $data['button_text'] = 'Write a Review';
        }

        return apply_filters('flycart_review_review_photo_request_data', $data, $language);
    }

    public static function getDefaultReviewDiscountRequestSettings($language)
    {
        $data = [
            'body' => __('Review Discount Request Body', 'flycart-review'),
            'subject' => __('Review Discount Request Subject', 'flycart-review'),
            'discount_text' => __('Review Discount Request Discount Text', 'flycart-review'),
            'button_text' => __('Review Discount Request Button Text', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Discount Request Body') {
            $data['body'] = "Hello {name}, Thank you for sharing your experience!. Use the following Discount Code for {discount} off your next purchase {client}!";
        }

        if ($data['subject'] == 'Review Discount Request Subject') {
            $data['subject'] = "Discount: Order #{order_number}, Discount!!?";
        }

        if ($data['button_text'] == 'Review Discount Request Button Text') {
            $data['button_text'] = 'Write a Review';
        }

        return apply_filters('flycart_review_review_discount_request_data', $data, $language);
    }

    public static function getDefaultReviewReplyRequestSettings($language)
    {
        $data = [
            'body' => __('Review Reply Request Body', 'flycart-review'),
            'subject' => __('Review Reply Request Subject', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Discount Request Body') {
            $data['body'] = "Hello {name}, A reply was added to your review of {product} {reply_content} To respond privately, reply to this email. ";
        }

        if ($data['subject'] == 'Review Discount Request Subject') {
            $data['subject'] = "In Response to your review of {product}";
        }

        return apply_filters('flycart_review_review_reply_request_data', $data, $language);
    }


    public function getSettings($reviewRequest)
    {

        //code
    }
}

