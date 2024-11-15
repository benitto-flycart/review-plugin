<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Model;
use Flycart\Review\Core\Emails\Settings\DiscountNotifySetting;
use Flycart\Review\Core\Emails\Settings\DiscountReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\PhotoRequest;
use Flycart\Review\Core\Emails\Settings\ReplyRequest;
use Flycart\Review\Core\Emails\Settings\ReviewReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;

class SettingsModel extends Model
{
    protected static $table = 'settings';

    public const STATUS_OPTION_KEY = 'flycart_review_app_status_settings';

    public const EMAIL_TYPE = 'email';

    public const EMAIL_REVIEW_REQUEST_TYPE = 'review_request';
    public const EMAIL_REVIEW_REMINDER_TYPE = 'review_reminder';
    public const EMAIL_PHOTO_REQUEST_TYPE = 'photo_request';

    public const EMAIL_DISCOUNT_REMINDER_TYPE = 'discount_reminder';
    public const EMAIL_DISCOUNT_NOTIFY_TYPE = 'discount_notify';
    public const EMAIL_REVIEW_REPLY_TYPE = 'review_reply';

    public const ACTIVE = 'active';
    public const DRAFT = 'draft';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                type VARCHAR(255) NOT NULL,
                sub_type VARCHAR(255) NOT NULL,
                language VARCHAR(255) NOT NULL,
                settings JSON NOT NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }

    public static function getDefaultEmailSettingStatus()
    {
        return [
            static::EMAIL_REVIEW_REQUEST_TYPE => ["is_enabled" => true],
            static::EMAIL_REVIEW_REMINDER_TYPE => ["is_enabled" => true],
            static::EMAIL_PHOTO_REQUEST_TYPE => ["is_enabled" => true],
            static::EMAIL_DISCOUNT_NOTIFY_TYPE => ["is_enabled" => true],
            static::EMAIL_DISCOUNT_REMINDER_TYPE => ["is_enabled" => true],
            static::EMAIL_REVIEW_REPLY_TYPE => ["is_enabled" => true],
        ];
    }

    public static function getPluginStatusSettings()
    {
        $settings = get_option(static::STATUS_OPTION_KEY, "{}");

        if (is_string($settings)) {
            $settings = Functions::jsonDecode($settings);
        }

        return $settings;
    }

    public static function updatePluginStatusSettings($settings)
    {
        return update_option(static::STATUS_OPTION_KEY, $settings);
    }

    public static function resolveObjectByType($language, $type)
    {
        switch ($type) {
            case static::EMAIL_REVIEW_REQUEST_TYPE:
                return ReviewRequest::make($language);
            case static::EMAIL_REVIEW_REMINDER_TYPE:
                return ReviewReminderEmailSetting::make($language);
            case static::EMAIL_PHOTO_REQUEST_TYPE;
                return PhotoRequest::make($language);
            case static::EMAIL_DISCOUNT_NOTIFY_TYPE:
                return DiscountNotifySetting::make($language);
            case static::EMAIL_DISCOUNT_REMINDER_TYPE:
                return DiscountReminderEmailSetting::make($language);
            case static::EMAIL_REVIEW_REPLY_TYPE:
                return ReplyRequest::make($language);
        }
    }
}
