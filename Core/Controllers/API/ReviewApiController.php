<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Resources\OrderListCollection;
use Flycart\Review\Core\Resources\ReviewListCollection;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;


class ReviewApiController
{
    public static function getAllReviews(Request $request)
    {
        try {

            $comment_count = get_comments([
                'count' => true
            ]);

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


            $ratings = [
                'single_star' => 0,
                'two_star' => 0,
                'three_star' => 0,
                'four_star' => 0,
                'five_star' => 0,
                'others' => 0,
            ];


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
                    ->where("user_login LIKE %s OR user_email LIKE %s OR display_name LIKE %s OR user_nicename like %s", [
                        "%{$search}%",
                        "%{$search}%",
                        "%{$search}%",
                        "%{$search}%"
                    ])
                    ->get();

                $user_ids = array_map(function ($user) {
                    return $user->user_id;
                }, $users);

                $products = Database::table($postTable)
                    ->select("ID as user_id, user_email as user_email")
                    ->where("post_type = %s", ['product'])
                    ->where("post_title like %s", ["{$search}"])
                    ->get();

                $product_ids = array_map(function ($product) {
                    return $product->user_id;
                }, $users);
            }


            $filters = [
                'current_page' => $current_page,
                'per_page' => 100 ?? $per_page
            ];

            if (!empty($product_ids)) {
                $filters['post_in'] = $product_ids;
            }

            if (!empty($user_ids)) {
                $filters['author_in'] = $user_ids;
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
}
