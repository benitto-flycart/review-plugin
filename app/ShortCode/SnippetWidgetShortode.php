<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;

class SnippetWidgetShortode
{
    public static function register()
    {

        add_shortcode('review_snippet_widget', function () {

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-snippet-widget-script";
            $registrationHandle = "{$pluginSlug}-snippet-widget";
            $storeConfig = static::getProductWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/snippet_widget.js", array('jquery'), F_Review_VERSION, true);

            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);

            wp_localize_script($registrationScriptHandle, 'review_snippet_widget_js_data', $storeConfig);

            $snippet_widget_css = home_url() . "wp-content/plugins/flycart-reviews/resources/widgets/snippet_widget.css?ver=3.0";
            $snippet_widget_font_css = home_url() . "wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=3.0";

            $path = F_Review_PLUGIN_PATH . 'resources/templates/snippet-widget';

            ob_start(); // Start output buffering
            include $path . '/snippet-widget.php'; // Include the PHP file
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
            'widget_header_type' => 'minimal',
            'widget_content_type' => 'list',
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
        ];
    }
}