<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;

class PopupWidgetShortCode
{
    public static function register()
    {

        add_shortcode('review_popup_widget', function () {

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-popup-widget-script";
            $registrationHandle = "{$pluginSlug}-popup-widget";
            $storeConfig = static::getProductWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/popup_widget.js", array('jquery'), F_Review_VERSION, true);

            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);

            wp_localize_script($registrationScriptHandle, 'review_popup_widget_js_data', $storeConfig);

            $resourceUrl = AssetHelper::getResourceURL();

            $popup_widget_css = $resourceUrl . "/widgets/popup_widget.css?ver=3.0";
            $popup_widget_font_css = $resourceUrl . "/admin/css/review-fonts.css?ver=3.0";
            $path = F_Review_PLUGIN_PATH . 'resources/templates/popup-widget';

            ob_start(); // Start output buffering
            include $path . '/popup-widget.php'; // Include the PHP file
            return ob_get_clean();
        });
    }

    public static function getProductWidgetConfigValues()
    {
        return [
            'home_url' => get_home_url(),
            'admin_url' => admin_url(),
            'action' => is_user_logged_in() ? Route::AJAX_NAME : Route::AJAX_NO_PRIV_NAME,
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
        ];
    }
}