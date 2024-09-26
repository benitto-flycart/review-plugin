<?php

namespace Flycart\Review\App\Hooks;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;

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
            wp_enqueue_media();
            remove_all_actions('admin_notices');
        }
    }

    public static function addStoreFrontScripts()
    {
        $resourceUrl = AssetHelper::getResourceURL();

        $storeConfig = static::getStoreConfigValues();

        wp_enqueue_style('flycart-review-styles-font-awesomee', "{$resourceUrl}/admin/css/review-fonts.css", [], F_Review_VERSION);

        $handle = 'flycart-review-form-plugin-script';
        wp_enqueue_script($handle, "{$resourceUrl}/js/review_form.js", array('jquery'), F_Review_VERSION, true);
        wp_localize_script($handle, 'review_form_store_config', $storeConfig);
    }

    public static function getStoreConfigValues()
    {
        return [
            'home_url' => get_home_url(),
            'admin_url' => admin_url(),
            'action' => is_user_logged_in() ? Route::AJAX_NAME : Route::AJAX_NO_PRIV_NAME,
            'ajax_url' => admin_url('admin-ajax.php'),
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            'is_product_page' => is_product(),
        ];
    }
}