<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\App\Services\Settings;
use Flycart\Review\Core\Models\ReviewSetting;
use Flycart\Review\Core\Resources\Widgets\FloatingProductWidgetResource;
use Flycart\Review\Core\Validation\Widgets\FloatingProductWidgetRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class FloatingProductReviewWidgetController
{

    public static function getFloatingProductWidget(Request $request)
    {
        try {
            $widgetSettings = ReviewSetting::query()
                ->where("meta_key = %s", ['floating_product_review_widget'])
                ->first();

            if (empty($widgetSettings)) {
                $widgetSettings = Settings::get('floating_review_widget_settings', []);
                error_log(print_r($widgetSettings, true));
            } else {
                $widgetSettings = Functions::jsonDecode($widgetSettings);
            }


            $widgetSettings = [
                'is_active' => $widgetSettings['is_active'] ?? true,
                'title' => $widgetSettings['title'] ?? __('Reviews', 'flycart-review'),
                'title_bg_color' => $widgetSettings['title_bg_color'] ?? '#fff',
                'title_text_color' => $widgetSettings['title_text_color'] ?? '#fff',
                'product_thumbnail_enabled' => $widgetSettings['product_thumbnail_enabled'] ?? false,
                'link_to_product_page_enabled' => $widgetSettings['link_to_product_page_enabled'] ?? false
            ];

            return FloatingProductWidgetResource::resource([$widgetSettings]);

        } catch (\Error|\Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function saveFloatingProductWidget(Request $request)
    {
        $request->validate(new FloatingProductWidgetRequest());
        Database::beginTransaction();
        try {
            $data = [
                'is_active' => Functions::getBoolValue($request->get('is_active')),
                'title' => $request->get('title'),
                'title_bg_color' => $request->get('title_bg_color'),
                'title_text_color' => $request->get('title_text_color'),
                'product_thumbnail_enabled' => Functions::getBoolValue($request->get('product_thumbnail_enabled')),
                'link_to_product_page_enabled' => Functions::getBoolValue($request->get('link_to_product_page_enabled'))
            ];

            $encoded_data = Functions::jsonEncode($data);
            $widgetSettings = ReviewSetting::query()->where("meta_key = %s", ['floating_product_widget_settings'])
                ->first();

            if (empty($widgetSettings)) {
                ReviewSetting::query()
                    ->create([
                        'meta_key' => 'floating_product_widget_settings',
                        'meta_value' => $encoded_data
                    ]);
            } else {
                ReviewSetting::query()
                    ->update([
                        'meta_key' => 'floating_product_widget_settings',
                        'meta_value' => $encoded_data
                    ], ['meta_key' => 'floating_product_widget_settings']);
            }

            Database::commit();

            return Response::success([
                'message' => __('Floating Product Widget Settings Saved Successfully', 'flycart-review'),
            ]);

        } catch (\Error|\Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}