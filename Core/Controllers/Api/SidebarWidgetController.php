<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\App\Services\Settings;
use Flycart\Review\Core\Models\ReviewSetting;
use Flycart\Review\Core\Resources\Widgets\FloatingProductWidgetResource;
use Flycart\Review\Core\Resources\Widgets\SidebarProductWidgetResource;
use Flycart\Review\Core\Validation\Widgets\FloatingProductWidgetRequest;
use Flycart\Review\Core\Validation\Widgets\SidebarProductWidgetRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class SidebarWidgetController
{

    public static function getSidebarWidgetSettings(Request $request)
    {
        try {
            $widgetSettings = ReviewSetting::query()
                ->where("meta_key = %s", [ReviewSetting::SIDEBAR_WIDGET])
                ->first();

            if (empty($widgetSettings)) {
                $widgetSettings = Settings::get(ReviewSetting::SIDEBAR_WIDGET, []);
            } else {
                $widgetSettings = Functions::jsonDecode($widgetSettings->meta_value);
            }


            $widgetSettings = [
                'is_active' => $widgetSettings['is_active'] ?? true,
                'position' => $widgetSettings['position'] ?? 'left',
                'orientation' => $widgetSettings['orientation'] ?? 'top_to_bottom',
                'button_text' => $widgetSettings['button_text'] ?? 'Reviews',
                'button_bg_color' => $widgetSettings['button_bg_color'] ?? '#adb4ba',
                'button_text_color' => $widgetSettings['button_text_color'] ?? '#adb4ba',
                'hide_on_mobile' => $widgetSettings['hide_on_mobile'] ?? false,
                'show_in_home_page' => $widgetSettings['show_in_home_page'] ?? true,
                'show_in_product_page' => $widgetSettings['show_in_product_page'] ?? false,
                'show_in_cart_page' => $widgetSettings['show_in_cart_page'] ?? false,
            ];

            return SidebarProductWidgetResource::resource([$widgetSettings]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function saveSidebarWidgetSettings(Request $request)
    {
        $request->validate(new SidebarProductWidgetRequest());
        Database::beginTransaction();
        try {
            $data = [
                'is_active' => Functions::getBoolValue($request->get('is_active')),
                'position' => $request->get('position'),
                'orientation' => $request->get('orientation'),
                'button_text' => $request->get("button_text"),
                'button_bg_color' => $request->get('button_bg_color'),
                'button_text_color' => $request->get('button_text_color'),
                'hide_on_mobile' => Functions::getBoolValue($request->get('hide_on_mobile')),
                'show_in_home_page' => Functions::getBoolValue($request->get('show_in_home_page')),
                'show_in_product_page' => Functions::getBoolValue($request->get('show_in_product_page')),
                'show_in_cart_page' => Functions::getBoolValue($request->get('show_in_cart_page')),
            ];


            $encoded_data = Functions::jsonEncode($data);
            $widgetSettings = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::SIDEBAR_WIDGET])
                ->first();

            if (empty($widgetSettings)) {
                ReviewSetting::query()
                    ->create([
                        'meta_key' => ReviewSetting::SIDEBAR_WIDGET,
                        'meta_value' => $encoded_data
                    ]);
            } else {
                ReviewSetting::query()
                    ->update([
                        'meta_key' => ReviewSetting::SIDEBAR_WIDGET,
                        'meta_value' => $encoded_data
                    ], ['meta_key' => ReviewSetting::SIDEBAR_WIDGET]);
            }

            Database::commit();

            return Response::success([
                'message' => __('Sidebar Product Widget Settings Saved Successfully', 'flycart-review'),
            ]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}

