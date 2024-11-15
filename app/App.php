<?php

namespace Flycart\Review\App;

defined('ABSPATH') || exit;

use Flycart\Review\App\ShortCode\FloatingProductWidgetShortCode;
use Flycart\Review\App\ShortCode\PopupWidgetShortCode;
use Flycart\Review\App\ShortCode\ProductWidgetShortCode;
use Flycart\Review\App\ShortCode\RatingWidgetShortCode;
use Flycart\Review\App\ShortCode\ReviewFormWidgetShortCode;
use Flycart\Review\App\ShortCode\SidebarWidgetShortCode;
use Flycart\Review\App\ShortCode\SnippetWidgetShortCode;
use Flycart\Review\App\ShortCode\ViewReviewDetailWidgetShortCode;

class App extends Container
{

    public static $app;

    public static function make()
    {
        if (!isset(self::$app)) {
            self::$app = new static();
        }

        return self::$app;
    }

    /* Bootstrap plugin
     */
    public function bootstrap()
    {
        Setup::init();
        add_action('plugins_loaded', function () {
            do_action('flycart_review_before_init');
            Route::register();
            static::registerShortCodes();
            do_action('flycart_review_after_init');
        }, 1);
    }
    public static function registerShortCodes()
    {
        //register the shortcode classes

        ProductWidgetShortCode::register();
        PopupWidgetShortCode::register();
        SnippetWidgetShortCode::register();
        RatingWidgetShortCode::register();
        SidebarWidgetShortCode::register();
        FloatingProductWidgetShortCode::register();
        ReviewFormWidgetShortCode::register();
        ViewReviewDetailWidgetShortCode::register();
    }
}

