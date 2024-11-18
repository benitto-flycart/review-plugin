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
            $discountSettings = (new DiscountSettings());
            $data = $discountSettings->getFromRequest($request);
            $discountSettings->save($data);

            Database::commit();

            return Response::success([
                'message' => __('Settings Saved Successfully', 'flycart-review'),
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
            $data = (new BrandSettings())->get();
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
            $brandSettings = (new BrandSettings());
            $data = $brandSettings->getFromRequest($request);
            $brandSettings->save($data);

            Database::commit();

            return Response::success([
                'message' => __('Settings Saved Successfully', 'flycart-review'),
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

            error_log('printing general settings data');
            error_log(print_r($data, true));

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
            $generalSettings = (new GeneralSettings());
            $data = $generalSettings->getFromRequest($request);
            error_log(print_r($data, true));
            $generalSettings->save($data);

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
