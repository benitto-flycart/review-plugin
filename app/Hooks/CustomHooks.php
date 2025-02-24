<?php

namespace Flycart\Review\App\Hooks;

defined('ABSPATH') || exit;


class CustomHooks extends RegisterHooks
{
    public static function register()
    {
        static::registerCoreHooks('custom-hooks.php');

        if (flycart_review_app()->get('is_pro_plugin')) {
            static::registerProHooks('custom-hooks.php');
        }
    }
}

