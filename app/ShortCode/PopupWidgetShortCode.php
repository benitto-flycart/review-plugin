<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Widget;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class PopupWidgetShortCode
{
    public static function register()
    {

        add_shortcode('review_popup_widget', function () {

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-popup-widget-script";
            $registrationHandle = "{$pluginSlug}-popup-widget";
            $storeConfig = static::getCofigValues();

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

    public static function getCofigValues()
    {
        return [
            'home_url' => get_home_url(),
            'admin_url' => admin_url(),
            'ajax_url' => admin_url('admin-ajax.php'),
            'action' => is_user_logged_in() ? Route::AJAX_NAME : Route::AJAX_NO_PRIV_NAME,
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            'is_product_page' => $is_product_page = is_product(),
            'product_id' => get_the_ID(),
        ];
    }

    public static function getTemplate(Request $request)
    {
        try {
            $path = F_Review_PLUGIN_PATH . 'resources/templates/popup-widget/';

            $widgetFactory = new WidgetFactory(Widget::POPUP_WIDGET, get_locale(), null);
//
            $widget = $widgetFactory->widget;

            $styles = $widget->getWidgetStyles();

            $reviews = require_once F_Review_PLUGIN_PATH . '/app/config/sample-reviews.php';
//
            $review = $reviews[random_int(0, 32)];
//
            $position = $widget->getPosition();

            $data = [
                'ratings' => [
                    'rating_icon' => 'gem',
                    'rating_outline_icon' => 'gem-outline',
                ]
            ];

            ob_start(); // Start output buffering
            include $path . 'index.php'; // Include the PHP file
            $template_content = ob_get_clean();

            Response::success([
                'template' => $template_content,
            ]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}