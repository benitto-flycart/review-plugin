<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\DiscountSettings;
use Flycart\Review\Core\Controllers\Helpers\Review\Comment;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Widget;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class ReviewFormController
{
    public function getReviewFormTemplate(Request $request)
    {
        try {
            $order_id = $request->get('order_id') ?? null;

            $product_id = $request->get('product_id') ?? 0;

            $is_comment_open = comments_open();

            $path = F_Review_PLUGIN_PATH . 'resources/templates/';

            // Only validate if option is enabled.
            if ('yes' == get_option('woocommerce_review_rating_verification_required') && !isset($order_id)) {
                if (!wc_customer_bought_product('', get_current_user_id(), $product_id)) {
                    ob_start(); // Start output buffering
                    include $path . 'review-form/authorization-error.php'; // Include the PHP file
                    $template_content = ob_get_clean();

                    Response::error([
                        'template' => $template_content
                    ], 401);
                }
            }

            // Skip if is a verified owner.

            $order = wc_get_order($order_id);

            $product = wc_get_product($product_id);

            $comment = new Comment($product_id, $order_id);

            $review_added = $comment->isCommentAlreadyAddedForProductOrder();

            $photo_enabled = $comment->isEnableAddPhotos();
            $next_review_items = $comment->getNextReviewItems();
            $enabled = [];

            $brandSettings = (new BrandSettings());
            $discountSettings = (new DiscountSettings());

            $icon = PluginHelper::getCurrentReviewIcon($brandSettings->getIcon());

            $slides = [
                [
                    'enabled' => $enabled['rating'] = !$review_added,
                    'name' => 'rating',
                    'may_have_done_btn' => false,
                ],
                [
                    'enabled' => $enabled['photo'] = $photo_enabled,
                    'name' => 'photo',
                    'may_have_done_btn' => true,
                ],
                [
                    'enabled' => $enabled['review'] = !$review_added,
                    'name' => 'review',
                    'may_have_done_btn' => true,
                ],
                [
                    'enabled' => $enabled['reviewer'] = empty($order),
                    'name' => 'reviewer',
                    'may_have_done_btn' => true,
                ],
                [
                    'enabled' => $enabled['thank_you'] = true,
                    'name' => 'thank_you',
                    'may_have_done_btn' => false,
                ],
                [
                    'enabled' => $enabled['next_products'] = count($next_review_items) > 0,
                    'name' => 'next_products',
                    'may_have_done_btn' => false,
                ]
            ];

            $slides = array_values(array_filter($slides, function ($item) {
                return $item['enabled'];
            }));

            $submit_button_on = '';
            $last_slide = '';
            foreach ($slides as $slide) {
                if ($slide['may_have_done_btn']) {
                    $submit_button_on = $slide['name'];
                }

                $last_slide = $slide['name'];
            }

            $widget = flycart_review_app()->get('review_form_widget_object');

            if (empty($widget)) {
                $widgetFactory = new WidgetFactory(Widget::REVIEW_FORM_WIDGET, get_locale(), null);
                $widget = $widgetFactory->widget;
                flycart_review_app()->set('review_form_widget_object', $widget);
            }

            ob_start(); // Start output buffering
            include $path . 'review-form-dialog.php'; // Include the PHP file
            $template_content = ob_get_clean();

            Response::success([
                'template' => $template_content,
                'slides' => $slides,
                'submit_button_slide' => $submit_button_on,
                'last_slide' => $last_slide
            ]);
        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function uploadImage(Request $request)
    {
        try {
            if (isset($_FILES['upload_image'])) {

                $uploaded_file = $_FILES['upload_image'];

                // Use WordPress media handling functions to upload and save the image
                $attachment_id = media_handle_upload('upload_image', 0);

                if (!is_wp_error($attachment_id)) {
                    // Return the attachment ID or other relevant data as needed
                    $attachment_url = wp_get_attachment_url($attachment_id);

                    Response::success([
                        'attachment_id' => $attachment_id,
                        'attachment_url' => $attachment_url
                    ]);

                } else {

                    Response::error([
                        'message' => 'Unable to upload file at this moment',
                        'errors' => $attachment_id,
                    ], 400);
                }
            }

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function saveReview(Request $request)
    {
        try {
            $order_id = $request->get('order_id');
            $product_id = $request->get('product_id');

            if (!empty($order_id)) {
                $order = wc_get_order($order_id);
            }

            $product = wc_get_product($product_id);

            $comment = new Comment($product_id, $order_id);

            $review_added = $comment->isCommentAlreadyAddedForProductOrder();

            $submit_slide = $request->get('submit_slide');

            if (!$review_added) {
                $comment_data = static::getReviewData($product_id, $request, $order);

                $comment_meta_data = [
                    'verified' => !empty($order) ? 1 : 0,
                    'rating' => $request->get('rating'),
                    '_review_order_id' => $order_id,
                    '_review_attachments' => Functions::jsonEncode([
                        'photos' => array_map(function ($attachment) {
                            return [
                                'attachment_id' => $attachment['id']
                            ];
                        }, $request->get('photos') ?? [])
                    ])
                ];

                $comment->updateComment($comment_data, $comment_meta_data);

            } else {
                if ($submit_slide == 'photo') {

                    $attachments = get_comment_meta($comment->comment['comment_ID'], '_review_attachments', true);

                    $attachments = Functions::jsonDecode($attachments);

                    $attachments['photos'] = array_merge($attachments['photos'], array_map(function ($attachment) {
                        return [
                            'attachment_id' => $attachment['id']
                        ];
                    }, $request->get('photos') ?? []));

                    $comment->updateComment([], [
                        '_review_attachments' => Functions::jsonEncode($attachments),
                    ]);
                }
            }

            return Response::success([
                'message' => 'Comment Stored Successfully',
            ]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function getReviewData($product_id, $request, $order = null)
    {
        if ($order) {
            $comment_author = $order->get_formatted_billing_full_name();
            $comment_author_email = $order->get_billing_email();
            $user_id = $order->get_customer_id();
        } else if (is_user_logged_in()) {
            $user = wp_get_current_user();

            $comment_author = $user->first_name . ' ' . $user->last_name;
            $comment_author_email = $user->user_email;
            $user_id = $user->ID;
        } else {
            $comment_author = $request->get('first_name') . ' ' . $request->get('last_name');
            $comment_author_email = $request->email;
            $user_id = 0;
        }

        return [
            'comment_author' => $comment_author,
            'comment_author_email' => $comment_author_email,
            'comment_author_ip' => $_SERVER['REMOTE_ADDR'],
            'comment_post_ID' => $product_id,
            'comment_content' => $request->get('review_text'),
            'comment_approved' => 0,
            'comment_agent' => wc_get_user_agent(),
            'comment_type' => 'review',
            'user_id' => $user_id,
        ];
    }
}