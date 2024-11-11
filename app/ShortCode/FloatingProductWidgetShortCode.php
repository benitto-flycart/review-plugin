<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Widget;

class FloatingProductWidgetShortCode
{
    public static function register()
    {

        add_shortcode('review_floating_widget_shortcode', function () {
            $widget = flycart_review_app()->get('floating_widget_object');

            if (empty($widget)) {
                $widgetFactory = new WidgetFactory(Widget::FLOATING_WIDGET, get_locale(), null);
                $widget = $widgetFactory->widget;
                flycart_review_app()->set('floating_widget_object', $widget);
            }

            $pluginSlug = F_Review_PLUGIN_SLUG;

            $registrationScriptHandle = "{$pluginSlug}-floating-widget-script";
            $storeConfig = static::getWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();

            //Used in resource file
            $font_css = "{$resourcePath}/admin/css/review-fonts.css?ver=3.0";

            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);
            wp_enqueue_style('flycart-reviews-floating-font-styles', "{$resourcePath}/admin/css/review-fonts.css?ver=3.0", [], F_Review_VERSION);

            $resourcePath = AssetHelper::getResourceURL();
            $registrationHandle = "{$pluginSlug}-floating-widget";
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/floating_widget.js", array('jquery'), F_Review_VERSION, true);
            wp_localize_script($registrationScriptHandle, 'floating_review_product_widget_js_data', $storeConfig);

            $floating_widget_css = "$resourcePath/widgets/floating_product_widget.css?ver=2.0";
            $path = F_Review_PLUGIN_PATH . 'resources/templates/floating-widget';
            $styles = $widget->getStyles();

            $data = [
                'ratings' => [
                    'rating_icon' => 'star-sharp',
                    'rating_outline_icon' => 'star-lc-outline',
                ]
            ];

            $css_file = $resourcePath . "/widgets/product_widget.css?ver=3.0";

            ob_start(); // Start output buffering
            include $path . '/floating-widget.php'; // Include the PHP file
            return ob_get_clean();
        });
    }

    public static function getWidgetConfigValues()
    {
        $widgetFactory = new WidgetFactory(Widget::PRODUCT_WIDGET, get_locale(), null);
        $widget = $widgetFactory->widget;

        $header = $widget->getHeaderLayout();
        $main_content = $widget->getMainContentLayout();

        return [
            'home_url' => get_home_url(),
            'admin_url' => admin_url(),
            'action' => is_user_logged_in() ? Route::AJAX_NAME : Route::AJAX_NO_PRIV_NAME,
            'widget_header_type' => $header,
            'widget_content_type' => $main_content,
            'ajax_url' => admin_url('admin-ajax.php'),
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
        ];
    }
}
