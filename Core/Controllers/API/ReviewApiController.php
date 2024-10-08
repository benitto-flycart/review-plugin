<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Resources\ReviewListCollection;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;


class ReviewApiController
{
    public static function getAllReviews(Request $request)
    {
        try {
            $commentsTable = Database::getCommentsTable();
            $commentsMetaTable = Database::getCommentsMetaTable();

            $results = Database::table("{$commentsTable} as c")
                ->select("SUM(CAST(cm.meta_value AS UNSIGNED)) as total_rating_sum, 
                    cm.meta_value as rating,  
                    COUNT(c.comment_ID) as rating_count")
                ->join("{$commentsMetaTable} as cm", "c.comment_ID = cm.comment_id")
                ->where("cm.meta_key = %s", ['rating'])
                ->where("c.comment_type = %s", ['comment'])
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
            }


            $filters = [
                'current_page' => $current_page,
                'per_page' => $per_page
            ];

            if (!empty($product_ids)) {
                $filters['post_in'] = $product_ids;
            }

            if (!empty($user_ids)) {
                $filters['author_in'] = $user_ids;
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

            $totalCount = get_comments(array_merge($filters, ['count' => true]));

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
                    'message' => "Review Id is required",
                ], 422);
            }

            if (empty($type)) {
                return Response::error([
                    'message' => "type required",
                ], 422);
            }

            if ($type == 'delete_review') {
                Review::deleteReview($review_id);

                return Response::success([
                    'message' => 'Review Deleted Successfully'
                ]);
            } else if ($type == 'approve') {
                Review::updateApproveStatus($review_id, $value);

                return Response::success([
                    'message' => 'Review Updated Successfully'
                ]);
            } else if ($type == 'verified_badge') {
                Review::updateVerifiedStatus($review_id, $value);

                return Response::success([
                    'message' => 'Review Updated Successfully'
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
}
