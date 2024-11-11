<?php

namespace Flycart\Review\Core\Controllers\Api;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Resources\ReviewListCollection;
use Flycart\Review\Core\Validation\ReviewAction\PhotoActionRequest;
use Flycart\Review\Core\Validation\ReviewAction\ReviewBulkActionRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;


class ReviewApiController
{
    public static function getAllReviews(Request $request)
    {
        try {
            $commentsTable = Database::getCommentsTable();
            $commentsMetaTable = Database::getCommentsMetaTable();

            $commentType = Review::getCommentType();
            $results = Database::table("{$commentsTable} as c")
                ->select("SUM(CAST(cm.meta_value AS UNSIGNED)) as total_rating_sum, 
                    cm.meta_value as rating,  
                    COUNT(c.comment_ID) as rating_count")
                ->join("{$commentsMetaTable} as cm", "c.comment_ID = cm.comment_id")
                ->where("cm.meta_key = %s", ['rating'])
                ->where("c.comment_type = %s", [$commentType])
                ->groupBy('cm.meta_value')
                ->get();


            $ratings = array(
                'single_star' => 0,
                'two_star' => 0,
                'three_star' => 0,
                'four_star' => 0,
                'five_star' => 0,
                'others' => 0,
            );

            $total_count = 0;
            $total_sum = 0;

            foreach ($results as $result) {
                if ($result->rating == 1) {
                    $ratings['single_star'] = (int)$result->rating_count;
                } else if ($result->rating == 2) {
                    $ratings['two_star'] = (int)$result->rating_count;
                } else if ($result->rating == 3) {
                    $ratings['three_star'] = (int)$result->rating_count;
                } else if ($result->rating == 4) {
                    $ratings['four_star'] = (int)$result->rating_count;
                } else if ($result->rating == 5) {
                    $ratings['five_star'] = (int)$result->rating_count;
                } else {
                    $ratings['others'] += (int)$result->rating_count;
                }

                $total_count += $result->rating_count;
                $total_sum += $result->total_rating_sum;
            }

            $total_average = round($total_sum / $total_count, 0);

            $current_page = $request->get('current_page') ?? 1;
            $per_page = $request->get('per_page') ?? 10;
            $search = $request->get('search', '');
            $status = $request->get('status', '');
            $rating = $request->get('rating', '');

            $user_ids = [];
            $product_ids = [];

            if (!empty($search)) {
                global $wpdb;
                $userTable = $wpdb->users;
                $postTable = $wpdb->posts;

                $users = Database::table($userTable)
                    ->select("ID as user_id, user_email as user_email")
                    ->where("user_login LIKE %s OR user_email LIKE %s OR display_name LIKE %s OR user_nicename like %s", array(
                        "%{$search}%",
                        "%{$search}%",
                        "%{$search}%",
                        "%{$search}%"
                    ))
                    ->get();

                $user_ids = array_map(function ($user) {
                    return $user->user_id;
                }, $users);


                $products = Database::table($postTable)
                    ->select("ID as post_id, post_title as post_title")
                    ->where("post_type = %s", ['product'])
                    ->where("post_title like %s", ["{$search}"])
                    ->get();

                $product_ids = array_map(function ($product) {
                    return $product->post_id;
                }, $products);

                if (empty($product_ids) && empty($user_ids)) {
                    $product_ids = [-1];
                }
            }

            $filters = [
                'current_page' => $current_page,
                'per_page' => $per_page
            ];

            $status = Review::getStatusValue($status);
            if (!empty($status)) {
                $filters['status'] =  $status;
            }

            if (!empty($product_ids)) {
                $filters['post__in'] = $product_ids;
            }

            if (!empty($user_ids)) {
                $filters['author__in'] = $user_ids;
            }

            if ($rating > 0) {
                $filters['meta_query'] = [
                    [
                        'key'     => 'rating', // Assuming the meta key for rating is 'rating'
                        'value'   => $rating,
                        'compare' => '=',
                        'type'    => 'NUMERIC', // Rating is stored as a number
                    ]
                ];
            }

            $totalCount = Review::getReviewsCount($filters);

            $reviews = Review::getReviews($filters);

            $review_overview = [
                'total_count' => $total_count,
                'total_average' => $total_average,
                'ratings' => $ratings,
            ];

            return ReviewListCollection::collection([$review_overview, $reviews, $totalCount, $per_page, $current_page]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function updateReview(Request $request)
    {
        try {
            $type = $request->get('type');
            $value = Functions::getBoolValue($request->get('value'));
            $review_id = $request->get('id');

            if (empty($review_id)) {
                return Response::error([
                    'message' => esc_attr("Review id required", 'f-review'),
                ], 422);
            }

            if (empty($type)) {
                return Response::error([
                    'message' => "type required",
                ], 422);
            }

            if ($type == 'approved') {
                Review::updateApproveStatus($review_id, true);

                return Response::success([
                    'message' => esc_attr('Review Updated Successfully', 'f-review')
                ]);
            } else if ($type == 'hold') {
                Review::updateApproveStatus($review_id, 0);

                return Response::success([
                    'message' => esc_attr('Review Updated Successfully', 'f-review')
                ]);
            } else if ($type == 'spam') {
                wp_update_comment([
                    'comment_ID' => $review_id,
                    'comment_approved' => 'spam',
                ]);

                return Response::success([
                    'message' => esc_attr('Review Updated Successfully', 'f-review')
                ]);
            } else if ($type == 'trash') {
                wp_update_comment([
                    'comment_ID' => $review_id,
                    'comment_approved' => 'trash',
                ]);

                return Response::success([
                    'message' => esc_attr('Review Updated Successfully', 'f-review')
                ]);
            } else if ($type == 'verified_badge') {
                Review::updateVerifiedStatus($review_id, 1);

                return Response::success([
                    'message' => esc_attr('Review Updated Successfully', 'f-review')
                ]);
            }


            return Response::success([
                'message' => 'Unable to Update right now, please try again later'
            ], 500);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public function saveReply(Request $request)
    {
        try {
            $content = $request->get('content');
            $review_id = $request->get('id');
            $reply_id = $request->get('reply_id');
            $type = $request->get('type');

            $comment = get_comment($review_id);

            $user = wp_get_current_user();

            $commentType = Review::getCommentType();

            if (!empty($comment)) {
                $reply_data = [
                    'comment_post_ID'      => $comment->comment_post_ID,  // The product ID
                    'comment_author'       =>  $user->display_name,  // Replace with the author name or dynamic name
                    'comment_author_email' => $user->user_email,  // Replace with the author's email
                    'comment_content'      => $content,  // The reply content
                    'comment_parent'       => $review_id,  // The parent review ID
                    'user_id'              => $user->ID,  // ID of the user submitting the reply
                    'comment_approved'     => 1,  // Set to 1 to automatically approve the reply
                    'comment_type'         => $commentType,
                ];


                if ($type == 'edit') {
                    $reply_data['comment_ID'] = $reply_id;
                    wp_update_comment($reply_data);
                    return Response::success([
                        'message' => __("Reply Updated Successfully", 'f-review'),
                    ]);
                } else {
                    $reply_comment_id = wp_insert_comment($reply_data);
                }

                if ($type == 'add' && \ActionScheduler::is_initialized()) {
                    NotificationHistory::query()->create([
                        'model_id' => $product_id = $comment->comment_post_ID,
                        'model_type' => 'product',
                        'status' =>  'pending',
                        'order_id' =>  NULL,
                        'notify_type' => EmailSetting::REPLY_REQUEST_TYPE,
                        'medium' => NotificationHistory::MEDIUM_EMAIL,
                        'created_at' => Functions::currentUTCTime(),
                        'updated_at' => Functions::currentUTCTime(),
                    ]);

                    $notificationHistoryId = NotificationHistory::query()->lastInsertedId();

                    //Add Option in Settings Page when to send review
                    $hook_name = F_Review_PREFIX . 'send_review_reply_email';

                    as_schedule_single_action(strtotime("+0 seconds"), $hook_name, [
                        [
                            'notification_id' => $notificationHistoryId,
                            'reply_comment_id' => $reply_comment_id
                        ]
                    ]);
                }

                Response::success([
                    'message' => __("Reply captured"),
                ]);
            }
            Response::success([
                'message' => __("Parent Comment not found"),
            ], 404);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function updateReplyContent(Request $request)
    {
        try {
            $content = $request->get('content');
            $review_id = $request->get('id');

            $comment = get_comment($review_id);

            if (!empty($comment)) {
                $reply_data = [
                    'comment_ID' => $review_id,
                    'comment_content' => $content,
                ];

                wp_update_comment($reply_data);

                return Response::success([
                    'message' => __("Reply Updated Successfully", 'f-review'),
                ]);
            }

            return Response::success([
                'message' => __("Comment not found",  'f-review'),
            ], 404);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public function updatePhotoAction(Request $request)
    {
        $request->validate(new PhotoActionRequest());

        try {
            $type = $request->get('type');
            $review_id = $request->get('review_id');

            $attachment_id = $request->get('image_id');

            $attachment = get_post($attachment_id);


            if (empty($attachment)) {
                return Response::error([
                    'message' => __('Attachment not found', 'f-review')
                ], 404);
            }

            if ($type ==  'hide_photo') {
                update_post_meta($attachment_id, '_review_hide_photo', 1);
            } else if ($type ==  'show_photo') {
                update_post_meta($attachment_id, '_review_hide_photo', 0);
            } else if ($type ==  'set_as_cover') {
                $attachments = get_posts([
                    'post_type' => 'attachment',
                    'meta_key' => '_review_id',
                    'meta_value' => $review_id,
                    'exclude' => [$attachment_id],
                ]);

                update_post_meta($attachment_id, '_review_cover_photo', 1);
                update_post_meta($attachment_id, '_review_hide_photo', 0);

                foreach ($attachments as $attachment) {
                    update_post_meta($attachment->ID, '_review_cover_photo', 0);
                }
            } else if ($type ==  'remove_cover') {
                update_post_meta($attachment_id, '_review_cover_photo', 0);
            } else {
                Response::error([
                    'message' => __('Invalid Type', 'f-review')
                ]);
            }

            Response::success([
                'message' => __("Updated Successfully", 'f-review'),
            ]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public function reviewBulkUpdate(Request $request)
    {
        $request->validate(new ReviewBulkActionRequest());

        try {
            $comment_ids = $request->get('ids', [], 'array');

            $bulk_action = $request->get('bulk_action');

            if ($bulk_action == 'approve_all_reviews') {
                $status = 1;
            } else if ($bulk_action == 'delete_all_reviews') {
                $status = 'trash';
            } else if ($bulk_action == 'un_approve_all_reviews') {
                $status = 0;
            } else if ($bulk_action == 'spam_all_reviews') {
                $status = 'spam';
            }

            foreach ($comment_ids as $comment_id) {
                wp_update_comment([
                    'comment_ID' => $comment_id,
                    'comment_approved' => $status,
                ]);
            }

            return Response::success([
                'message' => esc_attr('Review Updated Successfully', 'f-review')
            ]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}
