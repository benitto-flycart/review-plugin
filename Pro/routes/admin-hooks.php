<?php


//All routes actions will be performed in Route::handleAuthRequest method.

$admin_hooks = [
    'actions' => [

    ],
    'filters' => [

    ],
];

$store_front_hooks = [
    'actions' => [],
    'filters' => [],
];

return [
    'admin_hooks' => $admin_hooks,
    'store_front_hooks' => $store_front_hooks
];