<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Model;

class EmailSetting extends Model
{
    protected static $table = 'email_settings';

    const REVIEW_REQUEST_TYPE = 'review_request';
    const REVIEW_REMINDER_TYPE = 'review_remainder';

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

    public static function getDefaultReviewRequestSettings($language)
    {
        $data = [
            'body' => __('Review Request Body', 'flycart-review'),
            'subject' => __('Review Request Subject', 'flycart-review'),
            'button_text' => __('Review Request Button Text', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Request Body') {
            $data['body'] = 'Order #{order_number}, how did it go?';
        }

        if ($data['subject'] == 'Review Request Subject') {
            $data['subject'] = 'Order #{order_number}, how did it go?';
        }

        if ($data['button_text'] == 'Review Request Button Text') {
            $data['button_text'] = 'Write a Review';
        }

        return apply_filters('flycart_review_review_request_data', $data, $language);
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
}