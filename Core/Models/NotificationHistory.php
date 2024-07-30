<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Model;

class NotificationHistory extends Model
{
    protected static $table = 'reviews';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                order_id BIGINT UNSIGNED,
                notification_content LONGTEXT NULL,
                medium VARCHAR(255) NOT NULL,
                notify_type VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }

}