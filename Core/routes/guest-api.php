<?php

//All routes actions will be performed in Route::handleGuestRequest method.

use Flycart\Review\Core\Controllers\StoreFront\ProductWidgetController;
use Flycart\Review\Core\Controllers\StoreFront\ReviewDetailController;
use Flycart\Review\Core\Controllers\StoreFront\ReviewFormController;

return [
    'review_form_template' => ['callable' => [ReviewFormController::class, 'getReviewFormTemplate']],
    'review_detail_template' => ['callable' => [ReviewDetailController::class, 'getReview']],
    'get_review_detail' => ['callable' => [ReviewDetailController::class, 'getReview']],
    'upload_review_image' => ['callable' => [ReviewFormController::class, 'uploadImage']],
    'save_customer_review' => ['callable' => [ReviewFormController::class, 'saveReview']],
    'popup_widget_template' => ['callable' => [\Flycart\Review\App\ShortCode\PopupWidgetShortCode::class, 'getTemplate']],
    'product_widget_template' => ['callable' => [ProductWidgetController::class, 'getProductWidgetTemplate']],
];

