<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;

class ViewReviewDetailWidgetShortCode
{
    public static function register()
    {
        add_shortcode('review_detail_widget_shortcode', function () {

            $pluginSlug = F_Review_PLUGIN_SLUG;

            $registrationScriptHandle = "{$pluginSlug}-review-detail-widget-script";
            $registrationHandle = "{$pluginSlug}-review-detail-widget";
            $storeConfig = static::getWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();

            $resourcePath = AssetHelper::getResourceURL();
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/review_detail.js", array('jquery'), F_Review_VERSION, true);
            wp_localize_script($registrationScriptHandle, 'review_detail_store_config', $storeConfig);



            $rating_widget_css = home_url() . "wp-content/plugins/flycart-reviews/resources/";

            $rating_widget_font_css = home_url() . "wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=3.0";

            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);
            wp_enqueue_style('flycart-reviews-review-detail-font-styles', "{$resourcePath}/admin/css/review-fonts.css?ver=3.0", [], F_Review_VERSION);

            $path = F_Review_PLUGIN_PATH . 'resources/templates/review-detail';

            $data = [
                'ratings' => [
                    'rating_icon' => 'star-sharp',
                    'rating_outline_icon' => 'star-lc-outline',
                ]
            ];

            ob_start(); // Start output buffering
            include $path . '/review-detail.php'; // Include the PHP file
            return ob_get_clean();
        });
    }

    public static function getWidgetConfigValues()
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
