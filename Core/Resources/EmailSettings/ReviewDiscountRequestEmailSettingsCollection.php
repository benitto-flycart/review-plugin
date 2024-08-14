<?php

namespace Flycart\Review\Core\Resources\EmailSettings;

use Flycart\Review\App\Collection;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\Core\Models\EmailSetting;

class ReviewDiscountRequestEmailSettingsCollection extends  Collection
{
    public function toArray($items)
    {
        $data = [];
        foreach ($items as $item) {
            $data[] = [
                'language' => $item->language,
                'language_label' => WordpressHelper::getLanguageLabel($item->language),
                'type' => EmailSetting::PHOTO_REQUEST_TYPE,
                'status' => $item->status,
                'settings' => EmailSetting::getReviewSettingsAsArray($item->settings),
            ];
        }

        return [
            'list' => $data,
        ];
    }
}