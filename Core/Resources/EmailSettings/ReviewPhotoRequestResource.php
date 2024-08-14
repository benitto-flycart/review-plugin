<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class ReviewRequestResource extends Resource
{
    public function toArray($review_request)
    {
        return [
            'language' => $review_request['language'],
            'language_label' => WordpressHelper::getLanguageLabel($review_request['language']),
            'type' => EmailSetting::REVIEW_REQUEST_TYPE,
            'status' => $review_request['status'],
            'settings' => EmailSetting::getReviewSettingsAsArray($review_request['settings']),
        ];
    }
}