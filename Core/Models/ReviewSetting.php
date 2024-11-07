<?php

namespace Flycart\Review\Core\Models;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Model;

class ReviewSetting extends Model
{
    protected static $table = 'review_setting';

    public const BRAND_SETTINGS = 'brand_settings';
    public const GENERAL_SETTINGS = 'general_settings';
    public const DISCOUNT_SETTINGS = 'discount_settings';

    public const SIDEBAR_WIDGET = 'sidebar_product_widget_settings';
    public const FLOATING_WIDGET = 'floating_product_review_widget';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                meta_key VARCHAR(255) NOT NULL,
                meta_value JSON NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY (id)
                ) {$charset};";
    }

    public static function getBrandSetting()
    {
        return (new BrandSettings())->get();
    }


}