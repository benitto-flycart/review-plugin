<?php

//All routes actions will be performed in Route::handleAuthRequest method.

use Flycart\Review\Core\Controllers\Api\EmailSettingsController;
use Flycart\Review\Core\Controllers\Api\FloatingProductReviewWidgetController;
use Flycart\Review\Core\Controllers\Api\SettingsController;
use Flycart\Review\Core\Controllers\Api\SidebarWidgetController;
use Flycart\Review\Core\Controllers\Api\Widget\WidgetController;
use Flycart\Review\Core\Controllers\LocalDataController;

return [
    'get_local_data' => ['callable' => [LocalDataController::class, 'getLocalData']],

    //Review Request
    'get_review_request' => ['callable' => [EmailSettingsController::class, 'getReviewRequest']],
    'save_review_request' => ['callable' => [EmailSettingsController::class, 'saveReviewRequest']],
    'get_review_request_email_settings_list' => ['callable' => [EmailSettingsController::class, 'getReviewRequestLanguageSettingsList']],

    //Review Remainder
    'get_review_remainder' => ['callable' => [EmailSettingsController::class, 'getReviewRemainder']],
    'save_review_remainder' => ['callable' => [EmailSettingsController::class, 'saveReviewRemainder']],
    'get_review_remainder_email_settings_list' => ['callable' => [EmailSettingsController::class, 'getReviewRemainderLanguageSettingsList']],

    //Photo Request
    'get_photo_request' => ['callable' => [EmailSettingsController::class, 'getPhotoRequest']],
    'save_photo_request' => ['callable' => [EmailSettingsController::class, 'savePhotoRequest']],
    'get_photo_request_email_settings_list' => ['callable' => [EmailSettingsController::class, 'getPhotoRequestLanguageSettingsList']],

    //Discount Request
    'get_review_discount_remainder' => ['callable' => [EmailSettingsController::class, 'getDiscountRequest']],
    'save_review_discount_remainder' => ['callable' => [EmailSettingsController::class, 'saveDiscountRequest']],
    'get_review_discount_email_settings_list' => ['callable' => [EmailSettingsController::class, 'getDiscountRequestLanguageSettingsList']],

    //Reply Review Request
    'get_review_reply_request' => ['callable' => [EmailSettingsController::class, 'getReplyToReviewRequest']],
    'save_review_reply_request' => ['callable' => [EmailSettingsController::class, 'saveReplyToReviewRequest']],
    'get_review_reply_review_email_settings_list' => ['callable' => [EmailSettingsController::class, 'getReplyToReviewRequestLanguageSettingsList']],

    //Settings
    'get_brand_settings' => ['callable' => [SettingsController::class, 'getBrandSettings']],
    'save_brand_settings' => ['callable' => [SettingsController::class, 'saveBrandSettings']],

    'get_general_settings' => ['callable' => [SettingsController::class, 'getGeneralSettings']],
    'save_general_settings' => ['callable' => [SettingsController::class, 'saveGeneralSettings']],

    'get_discount_settings' => ['callable' => [SettingsController::class, 'getDiscountSettings']],
    'save_discount_settings' => ['callable' => [SettingsController::class, 'saveDiscountSettings']],


    'get_widget_settings' => ['callable' => [WidgetController::class, 'getWidgetSettings']],
    'save_widget_settings' => ['callable' => [WidgetController::class, 'saveWidgetSettings']],


    //Widgets Settings
    'get_floating_product_review_widget' => ['callable' => [FloatingProductReviewWidgetController::class, 'getFloatingProductWidget']],
    'save_floating_product_review_widget' => ['callable' => [FloatingProductReviewWidgetController::class, 'saveFloatingProductWidget']],

    'get_sidebar_product_review_widget' => ['callable' => [SidebarWidgetController::class, 'getSidebarWidgetSettings']],
    'save_sidebar_product_review_widget' => ['callable' => [SidebarWidgetController::class, 'saveSidebarWidgetSettings']],

];