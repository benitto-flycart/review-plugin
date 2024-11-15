<?php

defined('ABSPATH') || exit;
//All routes actions will be performed in Route::handleAuthRequest method.

use Flycart\Review\Core\Controllers\Api\EmailSettingsController;
use Flycart\Review\Core\Controllers\Api\FloatingProductReviewWidgetController;
use Flycart\Review\Core\Controllers\Api\OrderApiController;
use Flycart\Review\Core\Controllers\Api\ReviewApiController;
use Flycart\Review\Core\Controllers\Api\SettingsController;
use Flycart\Review\Core\Controllers\Api\SidebarWidgetController;
use Flycart\Review\Core\Controllers\Api\Widget\WidgetController;
use Flycart\Review\Core\Controllers\LocalDataController;

return [
    'get_local_data' => ['callable' => [LocalDataController::class, 'getLocalData']],
    'get_wc_orders' => ['callable' => [OrderApiController::class, 'getAllOrders']],
    'update_order_meta' => ['callable' => [OrderApiController::class, 'updateOrder']],

    'get_all_reviews' => ['callable' => [ReviewApiController::class, 'getAllReviews']],
    'review_bulk_action' => ['callable' => [ReviewApiController::class, 'reviewBulkUpdate']],

    'handle_save_reply' => ['callable' => [ReviewApiController::class, 'saveReply']],
    'review_action' => ['callable' => [ReviewApiController::class, 'updateReview']],
    'photo_action' => ['callable' => [ReviewApiController::class, 'updatePhotoAction']],

    'get_email_preview' => ['callable' => [EmailSettingsController::class, 'getEmailPreview']],
    'get_email_status' => ['callable' => [EmailSettingsController::class, 'getEmailStatuses']],
    'email_update_status' => ['callable' => [EmailSettingsController::class, 'updateEmailStatus']],

    //Review Request
    'get_review_request' => ['callable' => [EmailSettingsController::class, 'getReviewRequest']],
    'save_review_request' => ['callable' => [EmailSettingsController::class, 'saveReviewRequest']],

    //Review Remainder
    'get_review_remainder' => ['callable' => [EmailSettingsController::class, 'getReviewRemainder']],
    'save_review_remainder' => ['callable' => [EmailSettingsController::class, 'saveReviewRemainder']],

    //Photo Request
    'get_photo_request' => ['callable' => [EmailSettingsController::class, 'getPhotoRequest']],
    'save_photo_request' => ['callable' => [EmailSettingsController::class, 'savePhotoRequest']],

    //Discount Notify/Reminder Request
    'get_review_discount_remainder' => ['callable' => [EmailSettingsController::class, 'getDiscountReminderSetting']],
    'save_review_discount_remainder' => ['callable' => [EmailSettingsController::class, 'saveDiscountReminderSetting']],
    'get_review_discount_notify' => ['callable' => [EmailSettingsController::class, 'getDiscountNotify']],
    'save_review_discount_notify' => ['callable' => [EmailSettingsController::class, 'saveDiscountNotify']],

    //Reply Review Request
    'get_review_reply_request' => ['callable' => [EmailSettingsController::class, 'getReplyToReviewRequest']],
    'save_review_reply_request' => ['callable' => [EmailSettingsController::class, 'saveReplyToReviewRequest']],

    //Settings
    'get_brand_settings' => ['callable' => [SettingsController::class, 'getBrandSettings']],
    'save_brand_settings' => ['callable' => [SettingsController::class, 'saveBrandSettings']],

    'get_general_settings' => ['callable' => [SettingsController::class, 'getGeneralSettings']],
    'save_general_settings' => ['callable' => [SettingsController::class, 'saveGeneralSettings']],

    'get_discount_settings' => ['callable' => [SettingsController::class, 'getDiscountSettings']],
    'save_discount_settings' => ['callable' => [SettingsController::class, 'saveDiscountSettings']],


    'get_sample_reviews' => ['callable' => [WidgetController::class, 'sampleReviewsforAdmin']],
    'get_widget_settings' => ['callable' => [WidgetController::class, 'getWidgetSettings']],
    'save_widget_settings' => ['callable' => [WidgetController::class, 'saveWidgetSettings']],
    'widget_update_status' => ['callable' => [WidgetController::class, "updateWidgetStatus"]],
    'get_widget_status' => ['callable' => [WidgetController::class, "getWidgetStatuses"]],


    //Widgets Settings
    'get_floating_product_review_widget' => ['callable' => [FloatingProductReviewWidgetController::class, 'getFloatingProductWidget']],
    'save_floating_product_review_widget' => ['callable' => [FloatingProductReviewWidgetController::class, 'saveFloatingProductWidget']],

    'get_sidebar_product_review_widget' => ['callable' => [SidebarWidgetController::class, 'getSidebarWidgetSettings']],
    'save_sidebar_product_review_widget' => ['callable' => [SidebarWidgetController::class, 'saveSidebarWidgetSettings']],

];
