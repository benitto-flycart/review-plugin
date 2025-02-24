<?php

namespace Flycart\Review\App\ShortCode;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\SettingsModel;

class SidebarWidgetShortCode
{
    public static function register()
    {
        add_shortcode('review_sidebar_widget_shortcode', function () {

            $widget = flycart_review_app()->get('sidebar_widget_object');

            if (empty($widget)) {
                $widgetFactory = new WidgetFactory(SettingsModel::SIDEBAR_WIDGET, get_locale(), null);
                $widget = $widgetFactory->widget;
                flycart_review_app()->set('sidebar_widget_object', $widget);
            }

            $pluginSlug = F_Review_PLUGIN_SLUG;

            $registrationScriptHandle = "{$pluginSlug}-sidebar-widget-script";
            $registrationHandle = "{$pluginSlug}-sidebar-widget";
            $storeConfig = static::getWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();

            $rating_widget_css = home_url() . "wp-content/plugins/flycart-reviews/resources/";

            $rating_widget_font_css = home_url() . "wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=3.0";

            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);
            wp_enqueue_style('flycart-reviews-sidebar-styles', "{$resourcePath}/widgets/sidebar_widget.css?ver=3.0.css", [], F_Review_VERSION);
            wp_enqueue_style('flycart-reviews-sidebar-font-styles', "{$resourcePath}/admin/css/review-fonts.css?ver=3.0", [], F_Review_VERSION);

            $path = F_Review_PLUGIN_PATH . 'resources/templates/sidebar-widget';

            $data = [
                'ratings' => [
                    'rating_icon' => 'star-sharp',
                    'rating_outline_icon' => 'star-lc-outline',
                ]
            ];

            ob_start(); // Start output buffering
            include $path . '/sidebar-widget.php'; // Include the PHP file
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
