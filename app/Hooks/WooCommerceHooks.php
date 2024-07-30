<?php
namespace Flycart\Review\App\Hooks;

class WooCommerceHooks extends RegisterHooks
{
    public static function register()
    {
        static::registerCoreHooks('woocommerce-hooks.php');

        if (flycart_review_app()->get('is_pro_plugin')) {
            static::registerProHooks('woocommerce-hooks.php');
        }
    }
}