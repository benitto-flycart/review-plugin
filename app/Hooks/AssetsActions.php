<?php

namespace Flycart\Review\App\Hooks;

use Flycart\Review\App\Helpers\AssetHelper;

defined('ABSPATH') or exit;

class AssetsActions
{
    public static function register()
    {
        static::enqueue();
    }

    /**
     * Enqueue scripts
     */
    public static function enqueue()
    {
        add_action('admin_enqueue_scripts', [__CLASS__, 'addAdminPluginAssets']);
        add_action('wp_enqueue_scripts', [__CLASS__, 'addStoreFrontScripts']);
    }

    public static function addAdminPluginAssets($hook)
    {
        if (strpos($hook, 'flycart-review') !== false) {
            $reactDistUrl = AssetHelper::getReactAssetURL();
            $resourceUrl = AssetHelper::getResourceURL();

            wp_enqueue_style('flycart-review-plugin-styles', "{$reactDistUrl}/main.css", [], F_Review_VERSION);
            wp_enqueue_script('flycart-review-plugin-script', "{$reactDistUrl}/main.bundle.js", array('wp-element'), F_Review_VERSION, true);
            wp_enqueue_media();
            remove_all_actions('admin_notices');
        }
    }

    public static function addStoreFrontScripts()
    {
        //code goes here
    }
}