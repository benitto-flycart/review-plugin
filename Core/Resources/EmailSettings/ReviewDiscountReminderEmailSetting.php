<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class ReviewDiscountReminderEmailSetting extends Resource
{
    public function toArray($settings)
    {
        $data = [
            'language' => $settings['language'],
            'language_label' => WordpressHelper::getLanguageLabel($settings['language']),
            'type' => EmailSetting::PHOTO_REQUEST_TYPE,
            'status' => $settings['status'],
            'settings' => EmailSetting::getReviewSettingsAsArray($settings['settings']),
        ];

        return $data;
    }
}
