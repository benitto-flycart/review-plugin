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
        $data = require RWP_PLUGIN_PATH . "app/config/settings.php";

        if (isset($data[$key])) {
            return $data[$key];
        }

        return $data;
    }

    public static function fetchSettings()
    {

        $settings = [];

        $rwp_settings = get_option('rwp_plugin_settings', '[]');

        $rwp_settings = Functions::jsonDecode($rwp_settings);

        $default_settings = static::getDefaultSettingsData();

        $settings['general_settings'] = isset($rwp_settings['general_settings']) ? $rwp_settings['general_settings'] : $default_settings['general_settings'];
        $settings['affiliate_settings'] = isset($rwp_settings['affiliate_settings']) ? $rwp_settings['affiliate_settings'] : $default_settings['affiliate_settings'];
        $settings['email_settings'] = isset($rwp_settings['email_settings']) ? $rwp_settings['email_settings'] : $default_settings['email_settings'];
        $settings['payment_settings'] = isset($rwp_settings['payment_settings']) ? $rwp_settings['payment_settings'] : $default_settings['payment_settings'];

        $settings = apply_filters('rwp_get_settings', $settings);

        return $settings;
    }

    public static function getAffiliateReferralURLVariable()
    {
        return static::get('affiliate_settings.url_options.url_variable');
    }
}
