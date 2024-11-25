<?php

defined('ABSPATH') || exit;

use Flycart\Review\Core\Controllers\EmailController;
use Flycart\Review\Core\Controllers\Hooks\ShortCodeHandler;
use Flycart\Review\Core\Emails\Hooks\EmailStatusUpdateHook;
use Flycart\Review\Core\Models\CoreModel;

$store_front_hooks = [
    'actions' => [
        //        F_Review_PREFIX . 'send_emails' => ['callable' => [EmailHandler::class, 'sendEmail'], 'priority' => 10, 'accepted_args' => 1],
    ],
    'filters' => [
        'frap_before_register_sidebar_widget_shortcode' => ['callable' => [ShortCodeHandler::class, 'allowRegisterShortcode'], 'priority' => 10, 'accepted_args' => 2],
    ]
];

$admin_hooks = [
    'actions' => [
        F_Review_PREFIX . 'send_review_request_email' => ['callable' => [EmailController::class, 'sendReviewRequestWCEmail'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'send_review_reminder_email' => ['callable' => [EmailController::class, 'sendReviewReminderWCEmail'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'send_review_photo_request_email' => ['callable' => [EmailController::class, 'sendPhotoRequestReminder'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'send_review_reply_email' => ['callable' => [EmailController::class, 'sendReplyToEmail'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'send_discount_notify_email' => ['callable' => [EmailController::class, 'sendDiscountNotifyEmail'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'send_discount_reminder_email' => ['callable' => [EmailController::class, 'sendDiscountReminder'], 'priority' => 10, 'accepted_args' => 1],

        //Status Updates
        F_Review_PREFIX . 'mark_review_request_email_as_success' => ['callable' => [EmailStatusUpdateHook::class, 'success'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'mark_review_request_email_as_processing' => ['callable' => [EmailStatusUpdateHook::class, 'processing'], 'priority' => 10, 'accepted_args' => 1],
        F_Review_PREFIX . 'mark_review_request_email_as_cancelled' => ['callable' => [EmailStatusUpdateHook::class, 'cancelled'], 'priority' => 10, 'accepted_args' => 1],
    ],
    'filters' => [
        'flycart_review_get_models' => ['callable' => [CoreModel::class, 'getCoreModels'], 'priority' => 10, 'accepted_args' => 1],
    ]
];

return [
    'store_front_hooks' => $store_front_hooks,
    'admin_hooks' => $admin_hooks
];
