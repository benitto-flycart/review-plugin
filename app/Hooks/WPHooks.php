<?php

namespace Flycart\Review\App\Hooks;

defined('ABSPATH') || exit;

class WPHooks extends RegisterHooks
{
    public static function register()
    {
        static::registerCoreHooks('wp-hooks.php');

        if (flycart_review_app()->get('is_pro_plugin')) {
            static::registerProHooks('wp-hooks.php');
        }
    }
}

