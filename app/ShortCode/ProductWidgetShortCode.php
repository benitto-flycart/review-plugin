<?php

namespace Flycart\Review\App\ShortCode;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\SettingsModel;

/**
 * Shortcode class for Product Widget.
 */
class ProductWidgetShortCode
{
    /**
     * @return void
     */
    public static function getProductWidgetConfigValues(): array
    {
        $widgetFactory = new WidgetFactory(SettingsModel::PRODUCT_WIDGET, get_locale(), null);
        $widget = $widgetFactory->widget;

        $header =        $widget->getHeaderLayout();
        $main_content = $widget->getMainContentLayout();

        $product_id = 0;
        $is_product_page = false;

        if (is_product()) {
            global $product;
            $is_product_page = true;
            $product_id = $product->get_id();
        }

        return [
            'home_url' => get_home_url(),
            'admin_url' => admin_url(),
            'action' => is_user_logged_in() ? Route::AJAX_NAME : Route::AJAX_NO_PRIV_NAME,
            'ajax_url' => admin_url('admin-ajax.php'),
            'is_product_page' => $is_product_page ? true : false,
            'product_id' => $product_id,
            'widget_header_type' => $header,
            'widget_content_type' => $main_content,
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_ey' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            'name' => 'benitto',
        ];
    }

    public static function register()
    {

        add_shortcode('review_product_widget_shortcode', function () {

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-product-widget-script";
            $registrationHandle = "{$pluginSlug}-product-widget";
            $masonryJsHandle = "{$pluginSlug}-masonry-js";
            $masonryJsHandleHelper = "{$pluginSlug}-masonry-js-helper";
            $storeConfig = static::getProductWidgetConfigValues();

            $resourcePath = AssetHelper::getResourceURL();
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/product_widget.js", array('jquery'), F_Review_VERSION, true);
            wp_enqueue_script($masonryJsHandleHelper, "{$resourcePath}/admin/js/product_widget.js", array('jquery'), F_Review_VERSION, true);
            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);

            wp_enqueue_script($masonryJsHandle, "{$resourcePath}/widgets/js/masonry.min.js", array('jquery'), F_Review_VERSION, true);
            wp_localize_script($registrationScriptHandle, 'review_product_widget_js_data', $storeConfig);
            wp_localize_script($masonryJsHandle, 'review_product_widget_js_data', $storeConfig);
            wp_localize_script($masonryJsHandleHelper, 'review_product_widget_js_data', $storeConfig);
            $font_css = $resourcePath . "/admin/css/review-fonts.css?ver=3.0";


            $path = F_Review_PLUGIN_PATH . 'resources/templates/product-widget';

            $array = [
                'index1' => 1,
                'index2' => 2,
                'index3' =>    3,
            ];

            $css_file = $resourcePath . "/widgets/product_widget.css?ver=3.0";
            $js_file = $resourcePath . "/widgets/product_widget.css?ver=3.0";


            ob_start(); // Start output buffering
            include $path . '/product-widget.php'; // Include the PHP file
            return ob_get_clean();
        });
    }
}
