<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\ReviewSetting;
use Flycart\Review\Core\Resources\Settings\BrandSettingsResponse;
use Flycart\Review\Core\Validation\Settings\BrandSettingRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class SettingsController
{
    public static function getBrandSettings()
    {
        try {
            $brand_setting = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::BRAND_SETTINGS])
                ->first();

            $data = Functions::jsonDecode($brand_setting);

            BrandSettingsResponse::resource([$data]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveBrandSettings(Request $request)
    {
        $request->validate(new BrandSettingRequest());
        Database::beginTransaction();

        error_log('incoming');
        try {
            $data = [
                'corner_radius' => $request->get('corner_radius'),
                'enable_logo' => $request->get('enable_logo'),
                'logo' => '',
                'rating_icon_style' => $request->get('rating_icon_style'),
                'enable_review_branding' => $request->get('enable_review_branding'),
                'enable_email_banners' => $request->get('enable_email_banners'),
                'rating_rgb_color' => $request->get('rating_rgb_color'),
                'appearance' => $request->get('appearance'),
                'appearance_options' => [
                    'email_background_color' => $request->get('appearance_options.email_background_color'),
                    'content_background_color' => $request->get('appearance_options.content_background_color'),
                    'email_text_color' => $request->get('appearance_options.email_text_color'),
                    'button_bg_color' => $request->get('appearance_options.button_bg_color'),
                    'button_border_color' => $request->get('appearance_options.button_border_color'),
                    'button_title_color' => $request->get('appearance_options.button_title_color'),
                    'font_type' => $request->get('appearance_options.font_type'),
                    'font_size' => $request->get('appearance_options.font_size'),
                ],
            ];

            $data = wp_json_encode($data);

            $brand_setting = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::BRAND_SETTINGS])
                ->first();

            if (empty($brand_setting)) {


                ReviewSetting::query()->create([
                    'meta_key' => ReviewSetting::BRAND_SETTINGS,
                    'meta_value' => $data,
                    'created_at' => Functions::currentUTCTime(),
                    'updated_at' => Functions::currentUTCTime(),
                ]);
            } else {
                ReviewSetting::query()->update([
                    'meta_value' => $data,
                    'updated_at' => Functions::currentUTCTime(),
                ], [
                    'meta_key' => ReviewSetting::BRAND_SETTINGS,
                ]);
            }

            Database::commit();


        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }
}