<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Model;

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

}