<?php

namespace Flycart\Review\Core\Controllers;

use Error;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Route;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class LocalDataController
{
    public function getLocalData(Request $request)
    {
        $currentUserData = wp_get_current_user();

        try {
            $localData = [
                'is_pro' => PluginHelper::isPRO(),
                'plugin_name' => F_Review_PLUGIN_NAME,
                'user' => [
                    'nick_name' => $currentUserData->user_nicename,
                    'email' => $currentUserData->user_email,
                    'url' => $currentUserData->user_url,
                    'is_admin' => $currentUserData->caps['administrator']
                ],
                'nonces' => [
                    'flycart_review_nonce' => WordpressHelper::createNonce('flycart_review_nonce'),
                ],
                'common' => [
                    'pagination_limit' => 10,
                    'wlr_apps_nonce' => '', //Woocommerce::create_nonce('wlr_apps_nonce'),
                    'wlr_common_user_nonce' => '',
                    'site_url' => site_url(),
                    'site_icon_url' => get_site_icon_url(),
                    'version' => F_Review_VERSION,
                ],
                'home_url' => get_home_url(),
                'admin_url' => admin_url(),
                'ajax_url' => admin_url('admin-ajax.php'),
                'ajax_name' => Route::AJAX_NAME,
                'version' => F_Review_VERSION,
                'available_languages' => WordpressHelper::getAvailableLanguages(),
                'current_locale' => get_locale(),
                'order_statuses' => wc_get_order_statuses(),
                'iframe_styles' => [
                    'font_css' => plugins_url('resources/admin/css/review-fonts.css', F_Review_PLUGIN_FILE),
                    'product_widget' => [
                        'widget_css' => plugins_url('resources/widgets/product_widget.css', F_Review_PLUGIN_FILE),
                        'widget_js' => plugins_url('resources/admin/js/product_widget.js', F_Review_PLUGIN_FILE). "?t=" .time(),
                        'masonry_js' => plugins_url('resources/widgets/js/masonry.min.js', F_Review_PLUGIN_FILE),
                    ],
                    'popup_widget' => [
                        'widget_css' => plugins_url('resources/widgets/popup_widget.css', F_Review_PLUGIN_FILE),
                    ],
                    'rating_widget' => [
                        'widget_css' => plugins_url('resources/widgets/rating_widget.css', F_Review_PLUGIN_FILE),
                    ],
                    'review_form_widget' => [
                        'widget_css' => plugins_url('resources/widgets/review_form_widget.css', F_Review_PLUGIN_FILE),
                    ],
                    'sidebar_widget' => [
                        'widget_css' => plugins_url('resources/widgets/sidebar_widget.css', F_Review_PLUGIN_FILE). "?t=" .time(),
                    ],
                    'snippet_widget' => [
                        'widget_css' => plugins_url('resources/widgets/snippet_widget.css', F_Review_PLUGIN_FILE),
                    ],
                    'floating_product_reviews_widget' => [
                        'widget_css' => plugins_url('resources/widgets/floating_product_widget.css', F_Review_PLUGIN_FILE),
                        // 'masonry_js' => plugins_url('resources/widgets/js/masonry.min.js', F_Review_PLUGIN_FILE),
                     ],
                    'review_detail_widget' => [
                        'widget_css' => plugins_url('resources/widgets/review_detail_widget.css', F_Review_PLUGIN_FILE),
                    ],
                ]
            ];

            $localize = apply_filters('flycart_review_pro_local_data', $localData);

            return Response::success($localize);
        } catch (\Exception|Error $exception) {

            return Response::error([
                'message' => 'Unable to Fetch the Local Data'
            ]);
        }
    }

}