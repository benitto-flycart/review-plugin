<?php

defined('ABSPATH') || exit;
//All routes actions will be performed in Route::handleAuthRequest method.

$store_front_hooks = [
    'actions' => [],
    'filters' => [],
];

$admin_hooks = [
    'actions' => [],
    'filters' => [],
];

return [
    'store_front_hooks' => $store_front_hooks,
    'admin_hooks' => $admin_hooks
];

