<?php

//All routes actions will be performed in Route::handleGuestRequest method.

use Flycart\Review\Core\Controllers\StoreFront\ProductWidgetController;
use Flycart\Review\Core\Controllers\StoreFront\ReviewFormController;

return [
    'review_form_template' => ['callable' => [ReviewFormController::class, 'getReviewFormTemplate']],
    'upload_review_image' => ['callable' => [ReviewFormController::class, 'uploadImage']],
    'save_customer_review' => ['callable' => [ReviewFormController::class, 'saveReview']],

    'product_widget_template' => ['callable' => [ProductWidgetController::class, 'getProductWidgetTemplate']],
];

