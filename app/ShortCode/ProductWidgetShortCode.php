<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;

class ProductWidgetShortCode
{
    public static function register()
    {

        add_shortcode('review_product_widget_shortcode', function () {

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-product-widget-script";
            $registrationHandle = "{$pluginSlug}-product-widget";
            $storeConfig = static::getProductWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/product_widget.js", array('jquery'), F_Review_VERSION, true);
            wp_localize_script($registrationScriptHandle, 'review_product_widget_js_data', $storeConfig);


            $path = F_Review_PLUGIN_PATH . 'resources/templates/product-widget';

            ob_start(); // Start output buffering
            include $path . '/product-widget.php'; // Include the PHP file
            return ob_get_clean();
        });
    }

    public static function getProductWidgetConfigValues()
    {
        return [
            'home_url' => get_home_url(),
            'admin_url' => admin_url(),
            'action' => is_user_logged_in() ? Route::AJAX_NAME : Route::AJAX_NO_PRIV_NAME,
            'ajax_url' => admin_url('admin-ajax.php'),
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
        ];
    }
}