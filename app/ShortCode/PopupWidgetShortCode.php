<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\PopupWidget;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Models\Widget;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class PopupWidgetShortCode
{
    public static function register()
    {
        add_shortcode('review_popup_widget', function () {
            $widgetFactory = new WidgetFactory(Widget::POPUP_WIDGET, get_locale(), null);
            $widget = $widgetFactory->widget;

            $is_cart_page = is_cart();
            $is_shop_page = is_shop();
            $is_product_page = is_product();

            $enabled_pages = [
                $is_cart_page && $widget->showOnCartPage(),
                $is_product_page && $widget->showOnProductPage(),
                $is_shop_page && $widget->showOnShopPage(),
            ];

            error_log(print_r($enabled_pages, true));

            if (count(array_filter($enabled_pages)) <= 0) {
                error_log('popup widget not enabled');
                return null;
            }

            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-popup-widget-script";
            $registrationHandle = "{$pluginSlug}-popup-widget";
            $storeConfig = static::getCofigValues($widget);

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

    public static function getCofigValues(PopupWidget $widget)
    {
        return [
            "position" => $widget->getPosition('position'), // review_popup_widget_js_data.position ?? "top-right",
            "corner_radius" => $widget->getCornerRadiusClass('corner_radius'), // review_popup_widget_js_data.corner_radius ?? "sharp",
            "initial_delay" => $widget->getInitialDelay('initial_delay'), // review_popup_widget_js_data.initial_delay ?? 3000,
            "delay_between" => $widget->getDelayBetween('delay_between'), // review_popup_widget_js_data.delay_between ?? 2000,
            "display_time" => $widget->getDisplayTime('display_time'), // "$widget->get(' => '), //review_popup_widget_js_data".display_time ?? 2000,
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

            $is_product_page = Functions::getBoolValue($request->get('is_product_page'));
            $product_id = $request->get('product_id');
            $per_page = 1;
            $current_page = $request->get('current_page', 1);

            $filters = [
                'current_page' => $current_page,
                'per_page' => 1,
                'product_id' => $is_product_page ? $product_id : null,
            ];

            if ($is_product_page) {
                $comment_count = wp_count_comments($product_id);
                $approved_comment = $comment_count->approved;
            } else {
                $comment_count = get_comment_count();
                $approved_comment = $comment_count['approved'];
            }


            if ($current_page >= $approved_comment) {
                return
                    Response::error([
                        'message' => __("No More reviews available", 'f-review')
                    ], 400);
            }


            $reviews = Review::getReviews($filters);

            $review = $reviews[0];

            $widgetFactory = new WidgetFactory(Widget::POPUP_WIDGET, get_locale(), null);

            $widget = $widgetFactory->widget;

            $styles = $widget->getWidgetStyles();

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
                'total_approved_comment' => $approved_comment
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}
