<?php

namespace Flycart\Review\Core\Resources\Settings;

use Flycart\Review\App\Resource;

class DiscountSettingResource extends Resource
{
    public function toArray($settings)
    {
        return [
            'settings' => [
                'enable_photo_discount' => $settings['enable_photo_discount'] ?? false,
                'photo_discount_type' => $settings['photo_discount_type'] ?? 'fixed',
                'photo_discount_value' => $settings['photo_discount_value'] ?? 0,
                'enable_video_discount' => $settings['enable_video_discount'] ?? false,
                'video_discount_type' => $settings['video_discount_type'] ?? 'fixed',
                'video_discount_value' => $settings['video_discount_value'] ?? 0,
            ],
        ];
    }
}