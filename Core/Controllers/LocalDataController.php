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
                        'widget_js' => plugins_url('resources/admin/js/product_widget.js', F_Review_PLUGIN_FILE) . "?t=" . time(),
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
                        'widget_css' => plugins_url('resources/widgets/sidebar_widget.css', F_Review_PLUGIN_FILE) . "?t=" . time(),
                    ],
                    'snippet_widget' => [
                        'widget_css' => plugins_url('resources/widgets/snippet_widget.css', F_Review_PLUGIN_FILE),
                    ],
                    'floating_product_reviews_widget' => [
                        'widget_css' => plugins_url('resources/widgets/floating_product_widget.css', F_Review_PLUGIN_FILE),
                        // 'masonry_js' => plugins_url('resources/widgets/js/masonry.min.js', F_Review_PLUGIN_FILE),
                    ],
                    'review_detail_widget' => [
                        'widget_css' => plugins_url('resources/widgets/review_detail_widget.css?time=' . time(), F_Review_PLUGIN_FILE),
                    ],
                ]
            ];

            $localize = apply_filters('flycart_review_pro_local_data', $localData);

            return Response::success($localize);
        } catch (\Exception | Error $exception) {

            error_log($exception->getMessage());
            return Response::error([
                'message' => 'Unable to Fetch the Local Data'
            ]);
        }
    }


    public function getLabel()
    {
        $localData=[
            'nav_bar'=>[
                'emails'=>__('Emails','reviewPlugin'),
                'widgets'=>__('Widgets','reviewPlugin'),
                'settings'=>__('Settings','reviewPlugin'),
                'orders'=>__('Orders','reviewPlugin'),
                'reviews'=>__('Reviews','reviewPlugin'),
            ],
            'email_branding'=>[
                'types'=>[
                    'review_request'=>[
                        'title'=>__('Review Request','reviewPlugin'),
                        'description'=>__('Review Request Settings','reviewPlugin'),
                        'detailed_description'=>__('This email prompts the customer to share their feedback by submitting a review of their recent purchase or experience','reviewPlugin'),
                        'content'=>[
                            'subject'=>__('Subject','reviewPlugin'),
                            'sub_notes'=>[
                                'notes_1'=>__("Use [order_number] for the customer's order number","reviewPlugin")
                            ],
                            'body'=>__("Body","reviewPlugin"),
                            'body_notes'=>__("Use [full_name], [first_name], [last_name] as a placeholder for the user's name, first_name, last_name","reviewPlugin"),
                            'button'=>__('Button Text','reviewPlugin'),
                        ]
                    ],
                    'review_reminder'=>[
                        'title'=>__('Review Reminder','reviewPlugin'),
                        'description'=>__('Review Reminder Settings','reviewPlugin'),
                        'detailed_description'=>__("This follow-up email serves as a gentle reminder for the customer to leave a review if they haven't done so yet",'reviewPlugin'),
                        'content'=>[
                            'subject'=>__('Subject','reviewPlugin'),
                            'sub_notes'=>[
                                'notes_1'=>__("Use [order_number] for the customer's order number","reviewPlugin"),
                                'notes_2'=>__("Use [order_number] for the customer's order number","reviewPlugin"),
                                'notes_3'=>__("Use [name] or [last_name] as a placeholder for the user's first or last name","reviewPlugin"),
                            ],
                            'body'=>__("Body","reviewPlugin"),
                            'button'=>__('Button Text','reviewPlugin'),
                        ]
                    ],
                    'photo_request'=>[
                        'title'=>__('Photo Request','reviewPlugin'),
                        'description'=>__('Photo Request Settings','reviewPlugin'),
                        'detailed_description'=>__("After the customer has submitted a review, this email encourages them to add a photo to enhance their review",'reviewPlugin'),
                        'content'=>[
                            'photo_reminder'=>__("Send Photo Reminder","reviewPlugin"),
                            'subject'=>__("Subject","reviewPlugin"),
                            'sub_notes'=>[
                                'notes_1'=>__("Use [order_number] for the customer's order number","reviewPlugin"),
                                'notes_2'=>__("Use [name] or [last_name] as a placeholder for the user's first or last name","reviewPlugin"),
                            ],
                            'body'=>__("Body","reviewPlugin"),
                            'discount_text'=>__("Discount Text","reviewPlugin"),
                            'button'=>__('Button Text','reviewPlugin'),
                            'discount_notes'=>[
                                'notes_1'=>__("Added when a text review is eligible for a photo review discount","reviewPlugin"),
                            ]
                        ]
                    ],
                    'discount_notify'=>[
                        'title'=>__('Discount Notify','reviewPlugin'),
                        'description'=>__('Discount Notify Settings','reviewPlugin'),
                        'detailed_description'=>__("This email notify the customer of the discount they received for leaving a review",'reviewPlugin'),
                        'content'=>[
                            'subject'=>__("Subject","reviewPlugin"),
                            'sub_notes'=>[
                                'notes_1'=>__("Use {order_number} for the customer's order numberUse {name} or {last_name} as a placeholder for the user's first or last name","reviewPlugin"),
                            ],
                            'body'=>__("Body","reviewPlugin"),
                            'body_notes'=>[
                              "notes_1"=>__("Use {client} for your store nameUse {discount} for the discount amount","reviewPlugin"),
                            ],
                            'button'=>__('Button Text','reviewPlugin'),
                        ]
                    ],
                    'discount_reminder'=>[
                        'title'=>__('Discount Reminder','reviewPlugin'),
                        'description'=>__('Discount Reminder Settings','reviewPlugin'),
                        'detailed_description'=>__('This email reminds the customer of the discount they received for leaving a review, ensuring they make use of the offer','reviewPlugin'),
                        'content'=>[
                            'subject'=>__("Subject","reviewPlugin"),
                            'sub_notes'=>[
                                'notes_1'=>__("Use {order_number} for the customer's order numberUse {name} or {last_name} as a placeholder for the user's first or last name","reviewPlugin"),
                            ],
                            'body'=>__("Body","reviewPlugin"),
                            'body_notes'=>[
                                'notes_1'=>__("Use {client} for your store nameUse {discount} for the discount amount","reviewPlugin"),
                            ],
                            'button'=>__('Button Text','reviewPlugin')
                        ]
                    ],
                    'review_reply'=>[
                        'title'=>__('Reply to Review','reviewPlugin'),
                        'description'=>__('Reply to Review Settings','reviewPlugin'),
                        'detailed_description'=>__("This email notifies the customer when a reply has been posted to their review, keeping them engaged in the conversation",'reviewPlugin'),
                        'content'=>[
                            'subject'=>__("Subject","reviewPlugin"),
                            'sub_notes'=>[
                                'notes_1'=>__("Use {product_name} for the product name","reviewPlugin"),
                            ],
                            'body'=>__("Body","reviewPlugin"),
                            'body_notes'=>[
                                'notes_1'=>__("Use {reply_content} for your reply text","reviewPlugin"),
                            ]
                        ]
                    ]
                ],
                'common'=>[
                    'update'=>__('Update','reviewPlugin'),
                    'save_changes'=>__('Save Changes','reviewPlugin'),
                    'preview'=>__('Preview','reviewPlugin'),
                    'notes'=>__('Notes','reviewPlugin')
                ]
            ],
            'email_setting'=>[
                'types'=>[

                ]
            ]
        ];

    }
}

