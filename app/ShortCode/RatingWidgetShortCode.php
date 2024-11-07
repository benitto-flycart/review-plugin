<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\RatingWidget;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Widget;

class RatingWidgetShortCode
{
    public static function register()
    {

        add_shortcode('review_rating_shortcode', function () {

            $widget = flycart_review_app()->get('rating_widget_object');

            if (empty($widget)) {
                $widgetFactory = new WidgetFactory(Widget::RATING_WIDGET, get_locale(), null);
                $widget = $widgetFactory->widget;
                flycart_review_app()->set('rating_widget_object', $widget);
            }



            $pluginSlug = F_Review_PLUGIN_SLUG;

            if (!RatingWidget::$enqueued) {


                $registrationScriptHandle = "{$pluginSlug}-rating-widget-script";
                $registrationHandle = "{$pluginSlug}-rating-widget";
                $storeConfig = static::getWidgetConfigValues();

                $resourcePath = AssetHelper::getResourceURL();

                $rating_widget_css = home_url() . "wp-content/plugins/flycart-reviews/resources/";

                $rating_widget_font_css = home_url() . "wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css?ver=3.0";

                wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);
                wp_enqueue_style('flycart-reviews-rating-styles', "{$resourcePath}/widgets/rating_widget.css?ver=3.0.css", [], F_Review_VERSION);
                wp_enqueue_style('flycart-reviews-rating-font-styles', "{$resourcePath}/admin/css/review-fonts.css?ver=3.0", [], F_Review_VERSION);
                RatingWidget::$enqueued = true;
            }

            $path = F_Review_PLUGIN_PATH . 'resources/templates/rating-widget';

            $count = RatingWidget::$instances_count += 1;

            if (!wc_review_ratings_enabled()) {
                return '';
            }

            $data = [
                'ratings' => [
                    'rating_icon' => 'star-sharp',
                    'rating_outline_icon' => 'star-lc-outline',
                ]
            ];

            global $product;

            $rating_count = $product->get_rating_count();
            $review_count = $product->get_review_count();
            $average = $product->get_average_rating();

            ob_start(); // Start output buffering
            include $path . '/rating-widget.php'; // Include the PHP file
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
            'widget_header_type' => 'minimal',
            'widget_content_type' => 'list',
            'review_front_end_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
            '_wp_nonce_key' => 'review_frontend_nonce',
            '_wp_nonce' => WordpressHelper::createNonce('review_frontend_nonce'),
        ];
    }
}

