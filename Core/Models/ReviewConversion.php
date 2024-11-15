<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;

use Flycart\Review\App\Model;

class ReviewConversion extends Model
{
    protected static $table = 'review_conversions';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                order_id BIGINT UNSIGNED,
                discount_code VARCHAR(255) NULL,
                discount_id VARCHAR(255) NOT NULL,
                review_id BIGINT UNSIGNED NOT NULL,
                customer_id BIGINT UNSIGNED NULL,
                customer_email VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }
}

