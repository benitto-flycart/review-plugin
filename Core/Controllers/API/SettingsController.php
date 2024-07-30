<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\ReviewSetting;
use Flycart\Review\Core\Resources\Settings\BrandSettingsResponse;
use Flycart\Review\Core\Resources\Settings\DiscountSettingResource;
use Flycart\Review\Core\Resources\Settings\GeneralSettingsResource;
use Flycart\Review\Core\Validation\Settings\BrandSettingRequest;
use Flycart\Review\Core\Validation\Settings\DiscountSettingRequest;
use Flycart\Review\Core\Validation\Settings\GeneralSettingRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class SettingsController
{
    public static function getDiscountSettings()
    {
        try {
            $discount_setting = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::DISCOUNT_SETTINGS])
                ->first();

            $data = Functions::jsonDecode($discount_setting->meta_value);

            return DiscountSettingResource::resource([$data]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveDiscountSettings(Request $request)
    {
        $request->validate(new DiscountSettingRequest());
        Database::beginTransaction();

        try {
            $data = [
                'enable_photo_discount' => $request->get('enable_photo_discount'),
                'photo_discount_type' => $request->get('photo_discount_type'),
                'photo_discount_value' => $request->get('photo_discount_value'),
                'enable_video_discount' => $request->get('enable_video_discount'),
                'video_discount_type' => $request->get('video_discount_type'),
                'video_discount_value' => $request->get('video_discount_value'),
            ];

            $data = wp_json_encode($data);

            $brand_setting = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::DISCOUNT_SETTINGS])
                ->first();

            if (empty($brand_setting)) {


                ReviewSetting::query()->create([
                    'meta_key' => ReviewSetting::DISCOUNT_SETTINGS,
                    'meta_value' => $data,
                    'created_at' => Functions::currentUTCTime(),
                    'updated_at' => Functions::currentUTCTime(),
                ]);
            } else {
                ReviewSetting::query()->update([
                    'meta_value' => $data,
                    'updated_at' => Functions::currentUTCTime(),
                ], [
                    'meta_key' => ReviewSetting::DISCOUNT_SETTINGS,
                ]);
            }

            Database::commit();

            return Response::success([
                'message' => 'Discount Settings Saved Successfully',
            ]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getBrandSettings()
    {
        try {
            $brand_setting = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::BRAND_SETTINGS])
                ->first();

            $data = Functions::jsonDecode($brand_setting->meta_value);

            return BrandSettingsResponse::resource([$data]);

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

            return Response::success([
                'message' => 'Brand Settings Saved Successfully',
            ]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getGeneralSettings()
    {
        try {
            $general_settings = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::GENERAL_SETTINGS])
                ->first();

            $data = Functions::jsonDecode($general_settings->meta_value);

            return GeneralSettingsResource::resource([$data]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveGeneralSettings(Request $request)
    {
        $request->validate(new GeneralSettingRequest());
        Database::beginTransaction();

        try {
            $data = [
                'send_replies_to' => $request->get('send_replies_to'),
                'enable_email_footer' => $request->get('enable_email_footer'),
                'footer_text' => $request->get('footer_text'),
                'reviewers_name_format' => $request->get('reviewers_name_format'),
                'auto_publish_new_reviews' => $request->get('auto_publish_new_reviews'),
                'enable_review_notification' => $request->get('enable_review_notification'),
                'review_notification_to' => $request->get('review_notification_to'),
                'review_request_timing' => $request->get('review_request_timing'),
                'order_status' => $request->get('order_status'),
            ];

            $data = wp_json_encode($data);

            $brand_setting = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::GENERAL_SETTINGS])
                ->first();

            if (empty($brand_setting)) {


                ReviewSetting::query()->create([
                    'meta_key' => ReviewSetting::GENERAL_SETTINGS,
                    'meta_value' => $data,
                    'created_at' => Functions::currentUTCTime(),
                    'updated_at' => Functions::currentUTCTime(),
                ]);
            } else {
                ReviewSetting::query()->update([
                    'meta_value' => $data,
                    'updated_at' => Functions::currentUTCTime(),
                ], [
                    'meta_key' => ReviewSetting::GENERAL_SETTINGS,
                ]);
            }

            Database::commit();

            return Response::success([
                'message' => 'General Settings Saved Successfully',
            ]);

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }
}