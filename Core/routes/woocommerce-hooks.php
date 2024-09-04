<?php

//All routes actions will be performed in Route::handleAuthRequest method.

use Flycart\Review\Core\Controllers\EmailController;
use Flycart\Review\Core\Controllers\StoreFront\OrderPlacedController;

$store_front_hooks = [
    'actions' => [
        'woocommerce_order_status_changed' => ['callable' => [OrderPlacedController::class, 'statusUpdated'], 'priority' => 10, 'accepted_args' => 1],
    ],


    'filters' => [

    ],
];

$admin_hooks = [
    'actions' => [
    ],

    'filters' => [
        'woocommerce_email_classes' => ['callable' => [EmailController::class, 'addEmails'], 'priority' => 10, 'accepted_args' => 1],
    ],
];


return [
    'store_front_hooks' => $store_front_hooks,
    'admin_hooks' => $admin_hooks
];
