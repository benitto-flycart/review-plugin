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
        add_action('admin_enqueue_scripts', [__CLASS__, 'addAdminPluginAssets'], 100);
        add_action('wp_enqueue_scripts', [__CLASS__, 'addStoreFrontScripts'], 100);
    }

    public static function addAdminPluginAssets($hook)
    {
        if (strpos($hook, 'flycart-review') !== false) {
            $reactDistUrl = AssetHelper::getReactAssetURL();
            $resourceUrl = AssetHelper::getResourceURL();

            wp_enqueue_style('flycart-review-plugin-styles', "{$reactDistUrl}/main.css", [], F_Review_VERSION);
            wp_enqueue_script('flycart-review-plugin-script', "{$reactDistUrl}/main.bundle.js", array('wp-element'), F_Review_VERSION, true);
            wp_enqueue_style('flycart-review-styles-font-awesome', "{$resourceUrl}/admin/css/review-fonts.css", [], F_Review_VERSION);
            error_log("{$resourceUrl}/admin/css/review-fonts.css");
            wp_enqueue_media();
            remove_all_actions('admin_notices');
        }
    }

    public static function addStoreFrontScripts()
    {
        $reactDistUrl = AssetHelper::getReactAssetURL();

        if (isset($_GET['review-template-preview'])) {
            wp_enqueue_style('flycart-review-template-plugin-styles', "{$reactDistUrl}/main.css", [], F_Review_VERSION);
            wp_enqueue_script('flycart-review-template-plugin-script', "{$reactDistUrl}/main.bundle.js", array('wp-element'), F_Review_VERSION, true);
        }
    }
}