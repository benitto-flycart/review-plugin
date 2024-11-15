<?php

namespace Flycart\Review\Core\Controllers\Api;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\DiscountSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
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
            $data = (new DiscountSettings())->get();

            return DiscountSettingResource::resource([$data]);
        } catch (\Exception | \Error $exception) {
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
            $data = (new DiscountSettings())->getFromRequest($request);

            $data = Functions::jsonEncode($data);

            $discount_settings = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::DISCOUNT_SETTINGS])
                ->first();

            if (empty($discount_settings)) {
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
                'message' => __('Discount Settings Saved Successfully', 'flycart-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getBrandSettings()
    {
        try {
            $data = ReviewSetting::getBrandSetting();

            return BrandSettingsResponse::resource([$data]);
        } catch (\Exception | \Error $exception) {
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
            $data = (new BrandSettings())->getFromRequest($request);

            $data = Functions::jsonEncode($data);

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
                'message' => __('Brand Settings Saved Successfully', 'flycart-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getGeneralSettings(Request $request)
    {
        try {

            $type = $request->get('settings_type', 'general');

            $data = (new GeneralSettings())->get();

            return GeneralSettingsResource::resource([$data, $type == 'email']);
        } catch (\Exception | \Error $exception) {
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
            $data = (new GeneralSettings())->getFromRequest($request);

            $data = Functions::jsonEncode($data);

            $general_settings = ReviewSetting::query()->where("meta_key = %s", [ReviewSetting::GENERAL_SETTINGS])
                ->first();

            if (empty($general_settings)) {
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
                'message' => __('General Settings Saved Successfully', 'flycart-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }
}
