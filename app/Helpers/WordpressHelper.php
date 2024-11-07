<?php

namespace Flycart\Review\App\Helpers;

defined('ABSPATH') or exit;

class WordpressHelper
{

    /**
     * Verify nonce
     *
     * @param string $nonce
     * @param string $action
     * @return false
     */
    public static function verifyNonce($key, $nonce)
    {
        return (bool)wp_verify_nonce($nonce, $key);
    }

    /**
     * Verify nonce
     *
     * @param string $nonce
     * @param string $action
     * @return false
     */
    public static function createNonce($action)
    {
        return wp_create_nonce($action);
    }

    public static function getCurrentURL()
    {
        if (isset($_SERVER['HTTP_HOST'])) {
            $host = wp_unslash($_SERVER['HTTP_HOST']); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        } else {
            $host = wp_parse_url(home_url(), PHP_URL_HOST);
        }
        if (isset($_SERVER['REQUEST_URI'])) {
            $path = wp_unslash($_SERVER['REQUEST_URI']); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        } else {
            $path = '/';
        }
        return esc_url_raw((is_ssl() ? 'https' : 'http') . '://' . $host . $path);
    }

    public static function generateRandomPassword($length = 10)
    {
        // Define characters to use in the password
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_';

        // Get the total length of available characters
        $char_length = strlen($chars);

        // Initialize the password variable
        $password = '';

        // Generate random password
        for ($i = 0; $i < $length; $i++) {
            $password .= $chars[wp_rand(0, $char_length - 1)];
        }

        return $password;
    }

    public static function generateRandomString($length = 10)
    {

        return substr(md5(time()), 0, $length);
    }

    public static function getAvailableLanguages()
    {
        if (! function_exists('get_available_languages')) {
            return [];
        }

        $return_languages = get_available_languages();

        if (! in_array('en_US', $return_languages)) {
            array_unshift($return_languages, 'en_US');
        }

        $available_languages = [];

        foreach ($return_languages as $language) {
            $available_languages[] = ['label' =>  self::getLanguageLabel($language), 'value' => $language];
        }

        $wpml_available_languages = apply_filters('wpml_active_languages', null, []);
        if (! empty($wpml_available_languages) && is_array($wpml_available_languages)) {
            foreach ($wpml_available_languages as $lang_code => $language) {
                $key_exists = false;
                foreach ($available_languages as $check_language) {
                    // Check if the key exists in the current sub-array
                    if (isset($check_language['value']) && $check_language['value'] === $language['default_locale']) {
                        $key_exists = true;
                        break; // Exit the loop since the key is found
                    }
                }
                if (! $key_exists) {
                    $available_languages[] = [
                        'label' => (! empty($language['native_name'])) ? $language['native_name'] : $lang_code,
                        'value' => (! empty($language['default_locale'])) ? $language['default_locale'] : $lang_code
                    ];
                }
            }
        }
        return apply_filters('flycart_review_get_available_languages', $available_languages);
    }

    public static function getLanguageLabel($language_code)
    {
        $label        = '';
        $translations = self::getWpAvailableTranslations();
        if (isset($translations[$language_code]['native_name'])) {
            $label = $translations[$language_code]['native_name'];
        } else {
            foreach ($translations as $lang_code => $lang_details) {
                if (isset($lang_details['iso']) && is_array($lang_details['iso']) && in_array($language_code, $lang_details['iso'])) {
                    $label = $lang_details['native_name'];
                    break;
                }
            }
            if (empty($label) && ($language_code == 'en_US' || $language_code == 'en' || $language_code == 'en_GB')) {
                $label = "English";
            } elseif (empty($label)) {
                $label = $language_code . "(Name unknown)";
            }
        }
        return apply_filters("eca_get_language_label", $label, $language_code);
    }

    public static function getWpAvailableTranslations()
    {
        try {
            require_once(ABSPATH . 'wp-admin/includes/translation-install.php');

            if (function_exists('wp_get_available_translations')) {
                return wp_get_available_translations();
            }
        } catch (\Error $error) {
            return [];
        }

        return [];
    }
}
