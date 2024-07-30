<?php

use Flycart\Review\Core\Models\CoreModel;

$store_front_hooks = [
    'actions' => [

    ],
    'filters' => [

    ]
];

$admin_hooks = [
    'actions' => [

    ],
    'filters' => [
        'flycart_review_get_models' => ['callable' => [CoreModel::class, 'getCoreModels'], 'priority' => 10, 'accepted_args' => 1],
    ]
];

return [
    'store_front_hooks' => $store_front_hooks,
    'admin_hooks' => $admin_hooks
];