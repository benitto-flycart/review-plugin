<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;

use Flycart\Review\App\Model;

class OrderReview extends Model
{
    protected static $table = 'order_reviews';

    public  const COMMENT_META_ORDER_KEY = '_review_order_id';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                woo_order_id BIGINT UNSIGNED,
                photo_added boolean default 0,
                video_added boolean default 0,
                photo_discount_code VARCHAR(255) NULL,
                video_discount_code VARCHAR(255) NULL,
                text_discount_code VARCHAR(255) NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }

    public static function isPhotoAdded($orderReview)
    {
        return $orderReview->photo_added;
    }
}
