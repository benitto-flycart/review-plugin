<?php

use Flycart\Review\Core\Controllers\EmailController;
use Flycart\Review\Core\Controllers\StoreFront\EmailHandler;
use Flycart\Review\Core\Models\CoreModel;

$store_front_hooks = [
    'actions' => [
//        F_Review_PREFIX . 'send_emails' => ['callable' => [EmailHandler::class, 'sendEmail'], 'priority' => 10, 'accepted_args' => 1],
    ],
    'filters' => [

    ]
];

$admin_hooks = [
    'actions' => [
        F_Review_PREFIX . 'send_review_request_email' => ['callable' => [EmailController::class, 'sendReviewRequestWCEmail'], 'priority' => 10, 'accepted_args' => 1],
    ],
    'filters' => [
        'flycart_review_get_models' => ['callable' => [CoreModel::class, 'getCoreModels'], 'priority' => 10, 'accepted_args' => 1],
    ]
];

return [
    'store_front_hooks' => $store_front_hooks,
    'admin_hooks' => $admin_hooks
];