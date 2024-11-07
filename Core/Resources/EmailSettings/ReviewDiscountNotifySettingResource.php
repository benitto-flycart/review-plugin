<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class ReviewDiscountNotifySettingResource extends Resource
{
    public function toArray($settings)
    {
        return [
            'language' => $settings['language'],
            'language_label' => WordpressHelper::getLanguageLabel($settings['language']),
            'type' => EmailSetting::DISCOUNT_NOTIFY_TYPE,
            'status' => $settings['status'],
            'settings' => EmailSetting::getReviewSettingsAsArray($settings['settings']),
            'placeholders' => $settings['placeholders'],
        ];
    }
}
