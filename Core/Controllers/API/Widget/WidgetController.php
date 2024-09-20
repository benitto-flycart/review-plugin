<?php

namespace Flycart\Review\Core\Controllers\Api\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Validation\Widgets\WidgetRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class WidgetController
{
    public static function getWidgetSettings(Request $request)
    {
        $request->validate(new WidgetRequest());
        try {
            $language = $request->get('language');
            $widget_type = $request->get('widget_type');

            $widget = new WidgetFactory($widget_type, $language, $request);

            return $widget->get();

        } catch (\Error|\Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function saveWidgetSettings(Request $request)
    {
        $request->validate(new WidgetRequest());

        Database::beginTransaction();
        try {
            $language = $request->get('language');

            $widget_type = $request->get('widget_type');

            $widgetFactory = new WidgetFactory($widget_type, $language, $request);

            $data = $widgetFactory->save();

            Database::commit();

            Response::success($data);
        } catch (\Error|\Exception $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function getSampleReviews()
    {
        $data = require_once F_Review_PLUGIN_PATH . '/app/config/sample-reviews.php';
        return $data;
    }

    public static function sampleReviewsforAdmin(Request $request)
    {
        $allReviews = static::getSampleReviews();

        $totalCount = count($allReviews);
        $perPage = $request->get('per_page');
        $currentPage = $request->get('current_page');
        $sorting = $request->get('sorting', 'highest');

        $overall_rating = round(($totalCount * 5) / array_sum(array_column($allReviews, 'rating')), 1);

        $filter = [
            'current_page' => $currentPage,
            'per_page' => $perPage,
            'sorting' => $sorting
        ];
        $reviews = static::sampleReviewsFilter($filter, $allReviews);

        $data = [
            "total" => $totalCount,
            "per_page" => $perPage,
            "total_pages" => ceil($totalCount / $perPage),
            "current_page" => $currentPage,
            'reviews' => $reviews,
            'ratings' => [
                'rating_icon' => 'gem',
                'rating_outline_icon' => 'gem-outline',
                'overall_rating' => $overall_rating,
                'details' => [
                    [
                        'count' => $count = static::getCountOfRatings(1, $reviews),
                        'percentage' => round(($count / $totalCount) * 100, 2),
                    ],
                    [
                        'count' => $count = static::getCountOfRatings(2, $reviews),
                        'percentage' => round(($count / $totalCount) * 100, 2),
                    ],
                    [
                        'count' => $count = static::getCountOfRatings(3, $reviews),
                        'percentage' => round(($count / $totalCount) * 100, 2),
                    ],
                    [
                        'count' => $count = static::getCountOfRatings(4, $reviews),
                        'percentage' => round(($count / $totalCount) * 100, 2),
                    ],
                    [
                        'count' => $count = static::getCountOfRatings(5, $reviews),
                        'percentage' => round(($count / $totalCount) * 100, 2),
                    ]
                ],
            ],
        ];

        return $data;
    }

    public static function getCountOfRatings($rating, $reviews)
    {
        return count(array_filter($reviews, function ($review) use ($rating) {
            return $review['rating'] == $rating;
        }));
    }

    public static function sampleReviewsFilter($filter, $reviews)
    {
        return static::getRandomElements($reviews, $filter['per_page']) ?? [];
    }

    public static function getRandomElements($array, $num)
    {
        // Ensure $num doesn't exceed the array size
        if ($num > count($array)) {
            $num = count($array);
        }

        // Get random keys from the array
        $randomKeys = array_rand($array, $num);

        // If only one element is requested, return it directly
        if ($num === 1) {
            return [$array[$randomKeys]];
        }

        // Return the corresponding elements from the array
        return array_map(function ($key) use ($array) {
            return $array[$key];
        }, $randomKeys);
    }
}