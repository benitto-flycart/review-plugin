<?php

namespace Flycart\Review\Core\Resources\Settings;

defined('ABSPATH') || exit;

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
                'photo_discount_expiry_in_days' => $settings['photo_discount_expiry_in_days'] ?? '',
            ],
        ];
    }
}
