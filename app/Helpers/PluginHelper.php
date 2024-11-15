<?php

namespace Flycart\Review\App\Helpers;

defined('ABSPATH') || exit;

use DateTime;
use Exception;
use Flycart\Review\App\Services\Encrypt;
use Flycart\Review\Core\Emails\Settings\Emails;

class PluginHelper
{
    public static function isPRO()
    {
        $is_pro = flycart_review_app()->get('is_pro_plugin');

        if (empty($is_pro)) return false;

        return true;
    }

    public static function getAuthRoutes()
    {
        $is_pro = static::isPRO();

        $routes = [];
        if ($is_pro) {
            $routes = require(F_Review_PLUGIN_PATH . '../flycart-reviews/Pro/routes/auth-api.php');
        }

        $core_routes = require(F_Review_PLUGIN_PATH . 'Core/routes/auth-api.php');

        $routes = array_merge($routes, $core_routes);

        return $routes;
    }

    public static function pluginRoutePath($pro = false)
    {
        if ($pro) {
            return F_Review_PLUGIN_PATH . '../flycart-reviews/Pro/routes';
        }

        return F_Review_PLUGIN_PATH . 'Core/routes';
    }

    public static function logError($message, $location = [], $exception = null)
    {
        if (empty($location)) {
            $log_message = $message;
        } else {
            $log_message = "Error At: {$location[0]}@{$location[1]} => `{$message}` ";
        }
        // Create a log message

        // If an exception object is provided, append its details to the log message
        if (($exception instanceof Exception) || ($exception instanceof \Error)) {
            $log_message .= "\nAcutal Error Message: " . $exception->getMessage();
            $log_message .= "\nTrace Details: " . $exception->getTraceAsString();
        }
        error_log($log_message);
    }

    public static function isActive(string $plugin_path): bool
    {
        $active_plugins = apply_filters('active_plugins', get_option('active_plugins', array()));
        if (is_multisite()) {
            $active_plugins = array_merge($active_plugins, get_site_option('active_sitewide_plugins', array()));
        }
        return in_array($plugin_path, $active_plugins) || array_key_exists($plugin_path, $active_plugins);
    }

    public static function getPluginName()
    {
        return apply_filters('wprelay_get_plugin_name', F_Review_PLUGIN_NAME);
    }

    public static function getReviewLink($order, $product_id)
    {
        if (Emails::isTemplatePreviewRequest()) return '#';
        $url = static::getReviewFormPage();

        $url = add_query_arg(array(
            '_review_order_id' => Encrypt::encrypt($order->get_id(), true),
            '_review_product_id' => Encrypt::encrypt($product_id, true)
        ), $url);

        return $url;
    }

    public static function getReviewFormPage()
    {
        $page_meta_key = 'flycart-review-form-page-id';
        $id = get_option($page_meta_key);
        return get_permalink($id);
    }

    public static function reviewIcons()
    {
        return [
            'gem' => [
                'filled' => 'gem',
                'outlined' => 'gem-outline',
            ],
            'heart' => [
                'filled' => 'heart',
                'outlined' => 'heart-outline'
            ],
            'leaf' => [
                'filled' => 'leaf',
                'outlined' => 'leaf-outline',
            ],
            'rocket' => [
                'filled' => 'rocket',
                'outlined' => 'rocket-outline',
            ],
            'round-star' => [
                'filled' => 'round-star',
                'outlined' => 'round-star-outline',
            ],
            'star-sharp' => [
                'filled' => 'star-sharp',
                'outlined' => 'star-sharp-outline',
            ]
        ];
    }


    public static function getCurrentReviewIcon($name)
    {
        $icons = static::reviewIcons();

        if (isset($icons[$name])) {
            return $icons[$name];
        }

        //fallback to gem icons
        return $icons['heart'];
    }

    public static function getStrTimeString($value, $period = 'minutes')
    {
        $period = 'minutes';
        return "{$value} {$period}";
    }

    public static function dayToSeconds($days)
    {
        return (int)$days;
        // return (int)$days * 24 * 24 * 60;
    }

    public static function getPercentageValue($value, $total)
    {
        return $total ? round(($value / $total) * 100, 2) : 0;
    }
}
