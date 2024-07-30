<?php

//All routes actions will be performed in Route::handleAuthRequest method.

use Flycart\Review\Core\Controllers\Api\EmailSettingsController;
use Flycart\Review\Core\Controllers\Api\SettingsController;
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

    //Settings
    'get_brand_settings' => ['callable' => [SettingsController::class, 'getBrandSettings']],
    'save_brand_settings' => ['callable' => [SettingsController::class, 'saveBrandSettings']]
];