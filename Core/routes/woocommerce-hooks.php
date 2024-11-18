<?php

defined('ABSPATH') || exit;
//All routes actions will be performed in Route::handleAuthRequest method.

use Flycart\Review\Core\Controllers\EmailController;
use Flycart\Review\Core\Controllers\Hooks\ShortCodeHandler;
use Flycart\Review\Core\Controllers\StoreFront\OrderPlacedController;
use Flycart\Review\Core\Controllers\StoreFront\TemplateController;

$store_front_hooks = [
    'actions' => [
        'woocommerce_order_status_changed' => ['callable' => [OrderPlacedController::class, 'statusUpdated'], 'priority' => 10, 'accepted_args' => 1],
    ],

    'filters' => [
        'woocommerce_email_classes' => ['callable' => [EmailController::class, 'addEmails'], 'priority' => 10, 'accepted_args' => 1],
        'template_include' => ['callable' => [TemplateController::class, 'loadTemplate'], 'priority' => 10, 'accepted_args' => 1],
        'woocommerce_after_main_content' => ['callable' => [ShortCodeHandler::class, 'productWidget'], 'priority' => 10, 'accepted_args' => 1],
        'woocommerce_after_add_to_cart_form' =>
        function () {
            return [
                // ['callable' => [ShortCodeHandler::class, 'snippetWidget'], 'priority' => 10, 'accepted_args' => 1],
                ['callable' => [ShortCodeHandler::class, 'ratingWidget'], 'priority' => 10, 'accepted_args' => 1],
            ];
        },
        'woocommerce_after_shop_loop_item_title' => ['callable' => [ShortCodeHandler::class, 'ratingWidget'], 'priority' => 10, 'accepted_args' => 1],
        'woocommerce_product_tabs' => ['callable' => [TemplateController::class, 'removeDefaultCommentsTab'], 'priority' => 10, 'accepted_args' => 1],
    ],
];

$admin_hooks = [
    'actions' => [],
    'filters' => [],
];




return [
    'store_front_hooks' => $store_front_hooks,
    'admin_hooks' => $admin_hooks
];
