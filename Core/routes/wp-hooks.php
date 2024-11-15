<?php

defined('ABSPATH') || exit;

use Flycart\Review\Core\Controllers\Hooks\ShortCodeHandler;


//All routes actions will be performed in Route::handleAuthRequest method.

$store_front_hooks = [
    'actions' => [],
    'filters' => [
        'wp_footer' => function () {
            return [
                ['callable' => [ShortCodeHandler::class, 'popupWidget'], 'priority' => 10, 'accepted_args' => 1],
                ['callable' => [ShortCodeHandler::class, 'sidebarWidget'], 'priority' => 10, 'accepted_args' => 1],
                ['callable' => [ShortCodeHandler::class, 'floatingProductWidget'], 'priority' => 10, 'accepted_args' => 1],
                ['callable' => [ShortCodeHandler::class, 'reviewDetailWidget'], 'priority' => 10, 'accepted_args' => 1],
                ['callable' => [ShortCodeHandler::class, 'reviewFormWidget'], 'priority' => 10, 'accepted_args' => 1],
            ];
        },
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
