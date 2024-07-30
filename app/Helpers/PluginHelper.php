<?php

namespace Flycart\Review\App\Helpers;

use DateTime;
use Exception;

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
            $routes = require(F_Review_PLUGIN_PATH . '../wprelay-pro/Pro/routes/auth-api.php');
        }

        $core_routes = require(F_Review_PLUGIN_PATH . 'Core/routes/auth-api.php');

        $routes = array_merge($routes, $core_routes);

        return $routes;
    }

    public static function pluginRoutePath($pro = false)
    {
        if ($pro) {
            return F_Review_PLUGIN_PATH . '../wprelay-pro/Pro/routes';
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
}