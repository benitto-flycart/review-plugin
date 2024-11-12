<?php

namespace Flycart\Review\App\ShortCode;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Models\Widget;

class SnippetWidgetShortCode
{
    public static function register()
    {
        add_shortcode('review_snippet_widget', function () {

            global $product;
            $pluginSlug = F_Review_PLUGIN_SLUG;
            $registrationScriptHandle = "{$pluginSlug}-snippet-widget-script";
            $registrationHandle = "{$pluginSlug}-snippet-widget";
            $storeConfig = static::getSnippetWidgetConfigValues();

            $widgetFactory = new WidgetFactory(Widget::SNIPPET_WIDGET, get_locale(), null);
            $widget = $widgetFactory->widget;


            $widgetFactory = new WidgetFactory(Widget::SNIPPET_WIDGET, get_locale(), null);
            $widget = $widgetFactory->widget;

            $no_of_reviews_count = $widget->getNoOfReviewsCount();
            $minimum_rating = $widget->getMinimumRatingToDisplay();

            $storeConfig['allowed_review_count'] =  $no_of_reviews_count;

            $reviews = Review::getReviews([
                'product_id' => $product->get_id(),
                'type' => Review::getCommentType(),
                'paged' =>  1,
                'number' => $no_of_reviews_count,
                'status' => 'approve',
                'meta_query' => [
                    [
                        'key'   => 'rating',
                        'value' => $minimum_rating,
                        'compare' => '>='
                    ]
                ],
            ]);

            if (empty($reviews)) {
                return null;
            }

            $data = [
                'ratings' => [
                    'rating_icon' => 'gem',
                    'rating_outline_icon' => 'gem-outline',
                ]
            ];


            $resourcePath = AssetHelper::getResourceURL();
            wp_enqueue_script($registrationScriptHandle, "{$resourcePath}/js/snippet_widget.js", array('jquery'), F_Review_VERSION, true);

            wp_enqueue_style('flycart-reviews-plugin-styles', "{$resourcePath}/css/all_widget.css", [], F_Review_VERSION);

            wp_localize_script($registrationScriptHandle, 'review_snippet_widget_js_data', $storeConfig);

            $snippet_widget_css = $resourcePath . "/widgets/snippet_widget.css?ver=4.0";
            $snippet_widget_font_css = $resourcePath . "/admin/css/review-fonts.css?ver=3.0";
            $styles =  $widget->getSnippetWidgetStyles();

            $path = F_Review_PLUGIN_PATH . 'resources/templates/snippet-widget';

            ob_start(); // Start output buffering
            include $path . '/snippet-widget.php'; // Include the PHP file
            return ob_get_clean();
        });
    }

    public static function getSnippetWidgetConfigValues()
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
