<?php
namespace Flycart\Review\App\Hooks;

class WooCommerceHooks extends RegisterHooks
{
    public static function register()
    {
        static::registerCoreHooks('woocommerce-hooks.php');

        if (rwp_app()->get('is_pro_plugin')) {
            static::registerProHooks('woocommerce-hooks.php');
        }
    }
}