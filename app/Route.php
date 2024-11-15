<?php

namespace Flycart\Review\App;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Hooks\AdminHooks;
use Flycart\Review\App\Hooks\AssetsActions;
use Flycart\Review\App\Hooks\ConditionalHooks;
use Flycart\Review\App\Hooks\CustomHooks;
use Flycart\Review\App\Hooks\WooCommerceHooks;
use Flycart\Review\App\Hooks\WPHooks;
use Flycart\Review\App\Services\CustomRules;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class Route
{
    //declare the below constants with unique reference for your plugin
    const AJAX_NAME = 'flycart_review';
    const AJAX_NO_PRIV_NAME = 'guest_apis_flycart_review';

    public static function register()
    {
        add_action('wp_ajax_nopriv_' . static::AJAX_NO_PRIV_NAME, [__CLASS__, 'handleGuestRequests']);
        add_action('wp_ajax_' . static::AJAX_NAME, [__CLASS__, 'handleAuthRequests']);

        AdminHooks::register();
        AssetsActions::register();
        WooCommerceHooks::register();
        CustomHooks::register();
        WPHooks::register();
        ConditionalHooks::register();
    }

    public static function getRequestObject()
    {
        $data = [];

        if (Functions::isContentTypeJson()) {
            $jsonInput = file_get_contents('php://input');
            $data = json_decode($jsonInput, true);
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $data = array_merge($_REQUEST, $data);

        return Request::make($data)->setCustomRuleInstance(new CustomRules());
    }

    public static function handleAuthRequests()
    {
        $request = static::getRequestObject();
        $method = $request->get('method');

        $isAuthRoute = false;
        $handlers = require(PluginHelper::pluginRoutePath() . '/guest-api.php');

        if (!isset($handlers[$method])) {
            //loading auth routes
            $handlers = PluginHelper::getAuthRoutes();
            $isAuthRoute = true;
        }

        if ($isAuthRoute) {
            $nonce_key = $request->get('_wp_nonce_key');
            $nonce = $request->get('_wp_nonce');

            if ($method != 'get_local_data' && $method != 'playground') {
                static::verifyNonce($nonce_key, $nonce); // to verify nonce
            }
        }


        if (!isset($handlers[$method])) {
            Response::error(['message' => __('Method not exists', 'relaywp')]);
        }

        $targetAction = $handlers[$method];

        return static::handleRequest($targetAction, $request);
    }

    public static function handleGuestRequests()
    {
        $request = static::getRequestObject();

        $method = $request->get('method');

        //loading guest routes
        $handlers = require(PluginHelper::pluginRoutePath() . '/guest-api.php');

        if (!isset($handlers[$method])) {
            wp_send_json_error(['message' => 'Method not exists'], 404);
        }

        $targetAction = $handlers[$method];

        return static::handleRequest($targetAction, $request);
    }

    private static function verifyNonce($nonceKey, $nonce)
    {
        if (empty($nonce) || !WordpressHelper::verifyNonce($nonceKey, $nonce)) {
            Response::error(['message' => 'Security Check Failed']);
        }
    }


    public static function handleRequest($targetAction, $request)
    {

        $target = $targetAction['callable'];

        $class = $target[0];

        $targetMethod = $target[1];

        $controller = new $class();

        $response = $controller->{$targetMethod}($request);

        return wp_send_json_success($response);
    }
}
