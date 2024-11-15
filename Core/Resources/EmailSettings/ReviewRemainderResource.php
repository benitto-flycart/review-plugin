<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class ReviewRemainderResource extends Resource
{
    public function toArray($review_remainder)
    {
        return [
            'language' => $review_remainder['language'],
            'language_label' => WordpressHelper::getLanguageLabel($review_remainder['language']),
            'type' => EmailSetting::REVIEW_REQUEST_TYPE,
            'status' => $review_remainder['status'],
            'settings' => EmailSetting::getReviewSettingsAsArray($review_remainder['settings']),
            'placeholders' => $review_remainder['placeholders'],
        ];
    }
}
