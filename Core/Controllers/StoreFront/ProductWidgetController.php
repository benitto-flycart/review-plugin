<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Models\SettingsModel;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class ProductWidgetController
{
    public static function getProductWidgetTemplate(Request $request)
    {
        try {
            $path = F_Review_PLUGIN_PATH . 'resources/templates/product-widget/';

            $widgetFactory = new WidgetFactory(SettingsModel::PRODUCT_WIDGET, get_locale(), null);
            $widget = $widgetFactory->widget;

            $header = $widget->getHeaderLayout();
            $main_content = $widget->getMainContentLayout();
            $styleVariables = $widget->getProductWidgetStylesVars();

            $apply_rating_filter = Functions::getBoolValue($request->get('apply_rating_filter', false));

            $rating = $request->get('rating', 0);


            $filter = [
                'sorting' => $request->get('sorting', 'highest'),
                'parent' => 0,
                'status' => 'approve',
                'type' => 'comment',
            ];

            if ($apply_rating_filter) {
                $filter['meta_query'] = [   // Meta query to filter by rating
                    [
                        'key'   => 'rating',
                        'value' => $rating,
                        'compare' => '='
                    ]
                ];
            }

            if (!empty($product_id =  $request->get('product_id', ''))) {
                $filter['product_id'] =  $product_id;
            }

            $perPage = $widget->getPerPage();

            $currentPage = $request->get('current_page', 1);

            $totalCount = Review::getReviewsCount($filter);

            $additional_filters = [
                'current_page' => $currentPage,
                'per_page' => $perPage,
            ];

            $reviews = Review::getReviews(array_merge($filter, $additional_filters));

            //5 means here 5 star rating
            $rating_sum = array_sum(array_column($reviews, 'rating'));
            $overall_rating = $rating_sum ? round(($totalCount * 5) / $rating_sum, 1) : 0;
            $rating_count = Review::getRatingCounts($product_id);
            $totalPages = $perPage ? ceil($totalCount / $perPage) : 0;
            $data = [
                "total" => $totalCount,
                "per_page" => $perPage,
                "total_pages" => $totalPages,
                "current_page" => $currentPage,
                "pagination" => $widget->getPagination($totalPages, $currentPage),
                'reviews' => $reviews,
                'ratings' => [
                    'rating_icon' => 'gem',
                    'rating_outline_icon' => 'gem-outline',
                    'overall_rating' => $overall_rating,
                    'details' => [
                        [
                            'count' => $count = static::getCountOfRatings(1, $rating_count),
                            'percentage' => PluginHelper::getPercentageValue($count, $totalCount),
                        ],
                        [
                            'count' => $count = static::getCountOfRatings(2, $rating_count),
                            'percentage' => PluginHelper::getPercentageValue($count, $totalCount),
                        ],
                        [
                            'count' => $count = static::getCountOfRatings(3, $rating_count),
                            'percentage' => PluginHelper::getPercentageValue($count, $totalCount),
                        ],
                        [
                            'count' => $count = static::getCountOfRatings(4, $rating_count),
                            'percentage' => PluginHelper::getPercentageValue($count, $totalCount),
                        ],
                        [
                            'count' => $count = static::getCountOfRatings(5, $rating_count),
                            'percentage' => PluginHelper::getPercentageValue($count, $totalCount),
                        ]
                    ],
                ],
            ];


            $template = [];

            if (Functions::getBoolValue($request->get('wrapper'))) {
                ob_start();
                include $path . 'index.php';
                $wrapper = ob_get_clean();

                $template['wrapper'] = $wrapper;
            }

            if (Functions::getBoolValue($request->get('main_content'))) {
                ob_start();
                include $path . 'main_content.php';
                $main_content = ob_get_clean();
                $template['main_content'] = $main_content;
            }

            if (Functions::getBoolValue($request->get('header'))) {
                ob_start();
                include $path . 'header.php';
                $header = ob_get_clean();
                $template['header'] = $header;
            }

            Response::success([
                'template' => $template,
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function getReviews($filter)
    {
        $reviews = require_once F_Review_PLUGIN_PATH . '/app/config/sample-reviews.php';

        $current_rating = $filter['rating'] ?? 0;
        $current_sorting = $filter['sorting'] ?? 0;

        usort($reviews, function ($review1, $review2) use ($current_sorting) {
            if ($current_sorting == 'highest')
                return $review1['rating'] < $review2['rating'];
            else
                return $review1['rating'] > $review2['rating'];
        });

        if (empty($current_rating)) return $reviews;

        return array_filter($reviews, function ($review) use ($current_rating) {
            return $review['rating'] == $current_rating;
        });
    }

    public static function getCountOfRatings($rating, $rating_count)
    {
        return $rating_count[$rating] ?? 0;
    }
}
