<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Controllers\Helpers\Review\Comment;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class ReviewFormController
{
    public function getReviewFormTemplate(Request $request)
    {
        try {

            $order_id = $request->get('order_id') ?? 0;
            $product_id = $request->get('product_id') ?? 0;

            $path = F_Review_PLUGIN_PATH . 'resources/templates/';
            $order = wc_get_order($order_id);
            $product = wc_get_product($product_id);

            $comment = new Comment($order_id, $product_id);
//        $comment = new OrderComment($order_id, $product_id);

            $review_added = $comment->isCommentAlreadyAddedForProductOrder();

            $photo_enabled = $comment->isEnableAddPhotos();
            $next_review_items = $comment->getNextReviewItems();

            $enabled = [];
            $slides = [
                [
                    'enabled' => $enabled['rating'] = !empty($review_added),
                    'name' => 'rating',
                    'may_have_done_btn' => false,
                ],
                [
                    'enabled' => $enabled['photo'] = $photo_enabled,
                    'name' => 'photo',
                    'may_have_done_btn' => true,
                ],
                [
                    'enabled' => $enabled['review'] = !empty($review_added),
                    'name' => 'review',
                    'may_have_done_btn' => true,
                ],
                [
                    'enabled' => $enabled['reviewer'] = !isset($order),
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

            $order = wc_get_order($order_id);
            $product = wc_get_product($product_id);

            $id = wp_insert_comment([
                'comment_author' => $order->get_formatted_billing_full_name(),
                'comment_author_email' => $order->get_billing_email(),
                'comment_author_ip' => $_SERVER['REMOTE_ADDR'],
                'comment_post_ID' => $product->get_id(),
                'comment_content' => $request->get('review_text'),
                'comment_approved' => 1,
                'comment_agent' => wc_get_user_agent(),
                'comment_type' => 'review',
                'comment_meta' => [
                    'verified' => 1,
                    'rating' => $request->get('rating'),
                    '_review_order_id' => $order_id,
                    'review_attachments' => Functions::jsonEncode([
                        'photos' => array_map(function ($attachment) {
                            return [
                                'attachment_id' => $attachment['id']
                            ];
                        }, $request->get('photos') ?? [])
                    ])
                ]
            ]);

            error_log('Stored Comment Id');

            return Response::success([
                'message' => 'method exists processing',
                'comment_id' => $id,
            ]);
        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}