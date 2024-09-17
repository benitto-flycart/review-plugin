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

    public function getSampleReviews()
    {
        $data = require_once F_Review_PLUGIN_PATH . '/app/config/sample-reviews.php';
        return $data;
    }
}