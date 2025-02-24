<?php

namespace Flycart\Review\App\Helpers;

defined('ABSPATH') || exit;

use DateTime;
use DateTimeZone;
use Exception;

defined('ABSPATH') or exit;

class Functions
{

    public static function snakeCaseToCamelCase($string)
    {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $string))));
    }

    public static function arrayToJson($array)
    {
        if (empty($array)) return null;

        return wp_json_encode($array);
    }

    public static function currentTimestamp()
    {
        // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date
        return date('Y-m-d H:i:s');
    }

    public static function formatAmount($amount, $currencyCode = 'USD')
    {
        if ($amount == 0 || empty($amount)) $amount = 0;

        $price = wc_price($amount, [
            'currency' => $currencyCode
        ]);

        return html_entity_decode(wp_strip_all_tags($price));
    }

    public static function utcToWPTime($datetime, $format = 'Y-m-d H:i:s')
    {
        if (empty($datetime)) return null;

        $date = new DateTime($datetime, new DateTimeZone('UTC'));

        $timestamp = $date->format('U');

        return wp_date($format, $timestamp);
    }

    public static function wpToUTCTime($datetime, $format = 'Y-m-d H:i:s')
    {
        if (empty($datetime)) return null;

        $date = new DateTime($datetime, wp_timezone());

        // Convert the DateTime object to UTC
        $date->setTimezone(new DateTimeZone('UTC'));

        // Format the date and time in UTC using wp_date
        return wp_date($format, $date->getTimestamp(), new DateTimeZone('UTC'));
    }

    public static function getWcTime($datetime, $format = 'Y-m-d H:i:s')
    {
        return Functions::utcToWPTime($datetime, $format);
    }

    public static function currentUTCTime($format = 'Y-m-d H:i:s')
    {
        return current_datetime()->setTimezone(new DateTimeZone('UTC'))->format($format);
    }

    public static function dataGet(array $array, string $key, $default = null)
    {
        $keys = explode('.', $key);

        foreach ($keys as $segment) {
            if (!is_array($array) || !array_key_exists($segment, $array)) {
                return $default;
            }

            $array = $array[$segment];
        }

        return $array;
    }

    public static function isAffiliateCookieSet()
    {
        $urlVariable = Settings::getAffiliateReferralURLVariable();

        if (!isset($_COOKIE[$urlVariable])) {
            return false;
        }

        return $_COOKIE[$urlVariable];
    }

    public static function getSelectedCurrency()
    {
        // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.NonceVerification.Recommended
        if (isset($_POST['rwp_currency']) || isset($_GET['rwp_currency'])) {

            // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.NonceVerification.Recommended
            $currency = $_POST['rwp_currency'] ?? $_GET['rwp_currency'];
        }

        if (empty($currency)) {
            $currency = get_woocommerce_currency();
        }

        return $currency;
    }

    public static function isContentTypeJson()
    {
        // Check if the Content-Type header is set
        if (isset($_SERVER['CONTENT_TYPE'])) {
            // Get the Content-Type header value
            $contentType = $_SERVER['CONTENT_TYPE'];

            // Return true if the content type is application/json
            return strtolower($contentType) === 'application/json';
        }

        // Alternatively, you can check HTTP_CONTENT_TYPE for some server configurations
        if (isset($_SERVER['HTTP_CONTENT_TYPE'])) {
            // Get the Content-Type header value
            $contentType = $_SERVER['HTTP_CONTENT_TYPE'];

            // Return true if the content type is application/json
            return strtolower($contentType) === 'application/json';
        }

        // Default to false if Content-Type header is not set
        return false;
    }

    public static function getBoolValue($value)
    {

        if ($value === '0') return false;
        if ($value === '1') return true;
        if ($value === 'false') return false;
        if ($value === 'true') return true;
        if ($value === 0) return false;
        if ($value === 1) return true;
        return !empty($value);
    }

    public static function getUniqueKey($id = null)
    {
        if (empty($id)) {
            $id = random_int(1, 1000);
        }
        return substr(md5(uniqid(wp_rand(), true) . $id), 0, 12);
    }

    public static function toSnakeCase($text)
    {
        // Step 1: Convert CamelCase or PascalCase to snake_case
        $pattern = '/([a-z])([A-Z])/';
        $replacement = '$1_$2';
        $snake = preg_replace($pattern, $replacement, $text);

        // Step 2: Replace non-alphanumeric characters with underscores
        $snake = preg_replace('/[^a-zA-Z0-9]+/', '_', $snake);

        // Step 3: Convert the string to lowercase
        $snake = strtolower($snake);

        // Step 4: Trim any leading or trailing underscores
        return trim($snake, '_');
    }

    /**
     * @param $date
     * @param string $format
     */
    public static function formatDate(?string $date, string $format = 'Y-m-d H:i')
    {
        if (empty($date)) return null;

        try {
            $dateTime = new DateTime($date);
            $formatted_date = $dateTime->format($format);
        } catch (Exception $exception) {
            $formatted_date = null;
        }

        return $formatted_date;
    }

    public static function jsonDecode($data)
    {
        if (is_null($data)) {
            return json_decode('{}', true);
        }

        return json_decode($data, true);
    }

    public static function jsonEncode($data)
    {
        if (is_null($data)) {
            return null;
        }

        if (is_string($data)) {
            return $data;
        }

        return wp_json_encode($data, true);
    }

    public static function removeScripts($html_text)
    {
        return preg_replace('#<script(.*?)>(.*?)</script>#is', '', $html_text);
    }

    public static function getServerErrorMessage()
    {
        return [
            'message' => __('Server Error Occurred', 'f-review'),
        ];
    }

    public static function isMobile()
    {
        return preg_match('/(android|iphone|ipad|ipod|blackberry|windows phone|opera mini|iemobile|mobile)/i', $_SERVER['HTTP_USER_AGENT'] ?? '');
    }

    public static function convertMBToKB($mb)
    {
        if (is_int($mb)) {
            return $mb * 1024 * 1024;
        }

        throw new \Exception('Argument must be an integer');
    }

    public static function getWcTimeFromGMT($gmt_time)
    {
        return !empty($gmt_time) ? self::formatDate($gmt_time, 'Y-m-d') : null;
    }

    public static function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
