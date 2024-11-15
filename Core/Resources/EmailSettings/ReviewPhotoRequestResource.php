<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\SettingsModel;

class ReviewPhotoRequestResource extends Resource
{
    public function toArray($photo_request)
    {
        return [
            'language' => $photo_request['language'],
            'language_label' => WordpressHelper::getLanguageLabel($photo_request['language']),
            'type' => SettingsModel::EMAIL_PHOTO_REQUEST_TYPE,
            'status' => $photo_request['status'],
            'settings' => $photo_request['settings'],
            'placeholders' => $photo_request['placeholders'],
        ];
    }
}
