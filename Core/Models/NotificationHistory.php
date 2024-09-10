<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Model;

class NotificationHistory extends Model
{
    protected static $table = 'notification_histories';

    public const PENDING = 'pending';
    public const SUCCESS = 'success';

    public const MEDIUM_EMAIL = 'email';


    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                woo_order_id BIGINT UNSIGNED,
                order_id BIGINT UNSIGNED,
                notification_content LONGTEXT NULL,
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

    public static function isAlreadySent($status)
    {
        return $status == static::SUCCESS;
    }
}