<?php

namespace Flycart\Review\Core\Models;

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

    public const ACTIVE = 'active';

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
}