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
            'emails'=>[
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
                'email_settings'=>[
                    'types'=>[
                        'send_email_replies_to'=>[
                            'label'=>__('Send Email Replies To','reviewPlugin'),
                            'description'=>__('Leave Empty to have email replies to default admin email','reviewPlugin'),
                        ],
                        'enable_email_footer'=>[
                            'label'=>__('Enable Email Footer','reviewPlugin'),
                            'description'=>__('Display text in the footer of review emails','reviewPlugin'),
                            'is_enabled'=>[
                                'label'=>__('Footer Text','reviewPlugin'),
                                'description'=>__('Your Footer Text','reviewPlugin'),
                            ]
                        ],
                        'enable_review_notifications'=>[
                            'label'=>__('Enable Email Notifications','reviewPlugin'),
                            'description'=>__('Enable Review Notification to remind the admin after a customer has submitted a review.','reviewPlugin'),
                            'is_enabled'=>[
                                'label'=>__('Review Notification to','reviewPlugin'),
                                'description'=>__('Leave empty to have notifications sent to admin email','reviewPlugin'),
                            ]
                        ],
                        'email_font'=>[
                            'label'=>__('Email Font','reviewPlugin'),
                            'description'=>__('Select Email fonts for emails','reviewPlugin'),
                        ],
                        'review_request_timing'=>[
                            'label'=>__('Review Request Timing','reviewPlugin'),
                            'description'=>__('Select the Option in which day you want to send review request email','reviewPlugin'),
                        ],
                        'review_reminder_timing'=>[
                            'label'=>__('Review Reminder Timing','reviewPlugin'),
                            'description'=>__("Select the Option in which day you want to send review reminder email. it will only count from after the review request email sent","reviewPlugin"),
                        ],
                        'review_photo_request_timing'=>[
                            'label'=>__('Review Photo Request Timing','reviewPlugin'),
                            'description'=>__("Select the Option in which day you want to send review photo request. it will only count from after the review has been added","reviewPlugin"),
                        ],
                        'review_discount_notify_timing'=>[
                            'label'=>__('Review Discount Notify Timing','reviewPlugin'),
                            'description'=>__('Select the Option in which day you want to send discount notify, this will count after the discount is created',"reviewPlugin"),
                        ],
                        'review_discount_reminder_timing'=>[
                            'label'=>__('Review Discount Reminder Timing','reviewPlugin'),
                            'description'=>__('Select the Option in which day you want to send review discount reminder. it will only count from after the review has been added','reviewPlugin'),
                        ]
                    ],
                    'review_options'=>[
                        'immediate'=>__('Immediate','reviewPlugin'),
                        '1_day'=>__('1 Day','reviewPlugin'),
                        '3_day'=>__('3 Day','reviewPlugin'),
                        '5_day'=>__('5 Day','reviewPlugin'),
                        '7_day'=>__('7 Day','reviewPlugin'),
                    ],
                    'common'=>[
                        'save_changes'=>__('Save Changes','reviewPlugin'),
                    ]
                ]
            ],
            'widgets'=>[
                'product_reviews_widget'=>[
                    'title'=>__('Product Reviews Widget','reviewPlugin'),
                    'description'=>__('Convert visitors into buyers','reviewPlugin'),
                    'detailed_description'=>__('Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from multiple layouts','reviewPlugin'),
                ],
                'popup_widgets'=>[
                    'title'=>__('Popup Widgets','reviewPlugin'),
                    'description'=>__('Spotlight relevant reviews','reviewPlugin'),
                    'detailed_description'=>__('Spotlight relevant reviews and drive visitors to your product pages with a subtle social proof pop-up','reviewPlugin'),
                ],
                'review_sidebar_widgets'=>[
                    'title'=>__('Review Sidebar Widgets','reviewPlugin'),
                    'description'=>__("Give your visitors easy access to all of your store's reviews",'reviewPlugin'),
                    'detailed_description'=>__("Give your visitors easy access to all of your store's reviews by clicking a tab on the side of their screen","reviewPlugin"),
                ],
                'floating_product_reviews_widget'=>[
                    'title'=>__('Floating Product Reviews Widget','reviewPlugin'),
                    'description'=>__("Present your reviews on a floating display","reviewPlugin"),
                    'detailed_description'=>__("Present your reviews on a floating display so users can browse through reviews without leaving the page they are currently on","reviewPlugin"),
                ],
                'snippet_widgets'=>[
                    'title'=>__('Snippet Widgets','reviewPlugin'),
                    'description'=>__("Build instant trust by showing a glimpse of your best reviews","reviewPlugin"),
                    'detailed_description'=>__("Build instant trust by showing a glimpse of your best reviews at the top of your product pages, where purchase decisions are made","reviewPlugin"),
                ],
                'rating_review_widget'=>[
                    'title'=>__('Rating Review Widget','reviewPlugin'),
                    'description'=>__("Display your rating icons at the top of your product","reviewPlugin"),
                    'detailed_description'=>__("Display your rating icons at the top of your product pages and across your store to enhance your product’s credibility","reviewPlugin"),
                ],
                'review_form_widget'=>[
                    'title'=>__('Review Form Widget','reviewPlugin'),
                    'description'=>__("Customize the Review Form","reviewPlugin"),
                    'detailed_description'=>__("Add a stylish review form to your store, enabling customers to easily share feedback and enhance trust. Fully customizable, this widget lets you adjust colors, themes, and styles to match your brand's look. Encourage reviews that build credibility and connect with potential buyers","reviewPlugin"),
                ],
                'review_details_widget'=>[
                    'title'=>__('Review Details Widget','reviewPlugin'),
                    'description'=>__("Customize the Review Detail Widget","reviewPlugin"),
                    'detailed_description'=>__("Showcase customer feedback directly on your product pages with the Review Details widget to build trust and credibility. Customize colors, themes, and layout to align seamlessly with your brand's look and feel","reviewPlugin"),
                ],
                'common'=>[
                    'customize'=>__('Customize','reviewPlugin'),
                ]
            ]
        ];

    }
}

