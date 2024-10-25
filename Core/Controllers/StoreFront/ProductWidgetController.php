<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Controllers\Api\Widget\WidgetController;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Models\Widget;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class ProductWidgetController
{
    public static function getProductWidgetTemplate(Request $request)
    {
        try {
            $path = F_Review_PLUGIN_PATH . 'resources/templates/product-widget/';

            $widgetFactory = new WidgetFactory(Widget::PRODUCT_WIDGET, get_locale(), null);
            $widget = $widgetFactory->widget;

            $header = $widget->getHeaderLayout();
            $main_content = $widget->getMainContentLayout();
            $styleVariables = $widget->getProductWidgetStylesVars();

            $filter = [
                'rating' => $request->get('rating', 0),
                'sorting' => $request->get('sorting', 'highest')
            ];

            $perPage = 20;

            $currentPage = $request->get('current_page', 1);

            $reviews = static::getReviews($filter);

            $overall_rating = round((35 * 5) / array_sum(array_column($reviews, 'rating')), 1);

            $data = [
                "total" => $totalCount = 35,
                "per_page" => $perPage,
                "total_pages" => ceil($totalCount / $perPage),
                "current_page" => $currentPage,
                'reviews' => Review::getReviews([
                    'type' => 'comment',
                    'current_page' => $currentPage,
                    'per_page' => $perPage,
                    'parent' => 0,
                    'status' => 'all',
                ]),
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


            error_log(print_r($data, true));

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

    public static function getCountOfRatings($rating, $reviews)
    {
        return count(array_filter($reviews, function ($review) use ($rating) {
            return $review['rating'] == $rating;
        }));
    }
}
