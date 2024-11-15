<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Controllers\Helpers\Widget\WidgetFactory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Models\Widget;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class ReviewDetailController
{
    public static function getReview(Request $request)
    {
        try {
            $comment_id = $request->get('comment_id');

            $review = (array)get_comment($comment_id);
            $review['comment_meta'] = get_comment_meta($comment_id);

            $review = Review::buildCommentArray($review);

            $path = F_Review_PLUGIN_PATH . 'resources/templates/review-detail/';

            $data = [
                'ratings' => [
                    'rating_icon' => 'star-sharp',
                    'rating_outline_icon' => 'star-lc-outline',
                ],
            ];

            $widgetFactory = new WidgetFactory(Widget::REVIEW_DETAIL_WIDGET, get_locale(), null);
            $widget = $widgetFactory->widget;

            $styles = $widget->getReviewDetailWidgetStylesVars();

            ob_start(); // Start output buffering
            include $path . 'review-content.php'; // Include the PHP file
            $review_content = ob_get_clean();

            Response::success([
                'content' => $review_content,
                'review' => $review
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}
