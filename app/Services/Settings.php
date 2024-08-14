<?php

namespace Flycart\Review\App\Services;


use Flycart\Review\App\Helpers\Functions;

class Settings
{
    private static $settings = [];

    public static function get($key, $default = null)
    {
        if (empty(static::$settings)) {
            static::$settings = static::fetchSettings();
        }

        return Functions::dataGet(static::$settings, $key, $default);
    }

    public static function getDefaultSettingsData($key = null)
    {
        $data = require F_Review_PLUGIN_PATH . "app/config/settings.php";

        if (isset($data[$key])) {
            return $data[$key];
        }

        return $data;
    }

    public static function fetchSettings()
    {
        $settings = [];

        $default_settings = static::getDefaultSettingsData();

        $settings = apply_filters('flycart_review_get_settings', $default_settings);

        return $settings;
    }

    public static function getAffiliateReferralURLVariable()
    {
        return static::get('affiliate_settings.url_options.url_variable');
    }
}
