<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class ReviewPhotoRequestResource extends Resource
{
    public function toArray($photo_request)
    {
        return [
            'language' => $photo_request['language'],
            'language_label' => WordpressHelper::getLanguageLabel($photo_request['language']),
            'type' => EmailSetting::PHOTO_REQUEST_TYPE,
            'status' => $photo_request['status'],
            'settings' => $photo_request['settings'],
            'placeholders' => $photo_request['placeholders'],
        ];
    }
}

