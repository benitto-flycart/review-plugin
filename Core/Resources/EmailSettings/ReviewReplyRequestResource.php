<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\SettingsModel;

class ReviewReplyRequestResource extends Resource
{
    public function toArray($settings)
    {
        return [
            'language' => $settings['language'],
            'language_label' => WordpressHelper::getLanguageLabel($settings['language']),
            'type' => SettingsModel::EMAIL_REVIEW_REPLY_TYPE,
            'status' => $settings['status'],
            'settings' => $settings['settings'],
            'placeholders' => $settings['placeholders'],
        ];
    }
}
