<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;

use Flycart\Review\App\Model;

class NotificationHistory extends Model
{
    protected static $table = 'notification_histories';

    public const PENDING = 'pending';
    public const SUCCESS = 'success';
    public const FAILED = 'failed';

    public const MEDIUM_EMAIL = 'email';


    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                model_id BIGINT UNSIGNED,
                model_type VARCHAR(255) NOT NULL,
                order_id BIGINT UNSIGNED,
                notification_content LONGTEXT NULL,
                extra JSON NULL,
                medium VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL,
                notify_type VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }

    public static function isReviewRequestType($type)
    {
        return $type == 'review_request';
    }

    public static function isReviewReminderType($type)
    {
        return $type == 'review_reminder';
    }

    public static function isAlreadySent($status)
    {
        return $status == static::SUCCESS;
    }
}
