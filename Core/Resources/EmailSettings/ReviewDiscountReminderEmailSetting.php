<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\SettingsModel;

class ReviewDiscountReminderEmailSetting extends Resource
{
    public function toArray($settings)
    {
        $data = [
            'language' => $settings['language'],
            'language_label' => WordpressHelper::getLanguageLabel($settings['language']),
            'type' => SettingsModel::EMAIL_PHOTO_REQUEST_TYPE,
            'status' => $settings['status'],
            'settings' => $settings['settings'],
            'placeholders' => $settings['placeholders'],
        ];

        return $data;
    }
}
