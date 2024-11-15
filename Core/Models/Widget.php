<?php

namespace Flycart\Review\Core\Models;

defined('ABSPATH') || exit;

use Flycart\Review\App\Model;

class Widget extends Model
{
    protected static $table = 'review_widgets';

    public const PRODUCT_WIDGET = 'product_widget';
    public const POPUP_WIDGET = 'popup_widget';
    public const SIDEBAR_WIDGET = 'sidebar_widget';
    public const FLOATING_WIDGET = 'floating_product_widget';
    public const SNIPPET_WIDGET = 'snippet_widget';
    public const RATING_WIDGET = 'rating_widget';
    public const REVIEW_FORM_WIDGET = 'review_form_widget';
    public const REVIEW_DETAIL_WIDGET = 'review_detail_widget';

    public const ACTIVE = 'active';
    public const DRAFT = 'draft';

    public function createTable()
    {
        $charset = static::getCharSetCollate();

        $table = static::getTableName();

        return "CREATE TABLE {$table} (
                id BIGINT UNSIGNED AUTO_INCREMENT,
                widget_type VARCHAR(255) NOT NULL,
                language VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL,
                theme VARCHAR(255) NOT NULL,
                settings JSON NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                PRIMARY KEY (id)
                ) {$charset};";
    }

    public static function getDefaultWidgetStatues()
    {
        return [
            'product_widget' => ['is_enabled' => true],
            'popup_widget' => ['is_enabled' => true],
            'sidebar_widget' => ['is_enabled' => true],
            'floating_product_widget' => ['is_enabled' => true],
            'snippet_widget' => ['is_enabled' => true],
            'rating_widget' => ['is_enabled' => true],
            'review_form_widget' => ['is_enabled' => true],
            'review_detail_widget' => ['is_enabled' => true],
        ];
    }
}
