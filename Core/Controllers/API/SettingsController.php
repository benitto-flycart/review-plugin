<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Package\Request\Response;

class SettingsController
{
    public static function getBrandSettings()
    {
        try {

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveBrandSettings()
    {
        try {

        } catch (\Exception|\Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }
}