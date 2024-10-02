<?php

namespace Flycart\Review\Core\Resources\Settings;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class BrandSettingsResponse extends Resource
{
    public function toArray($settings)
    {
        return [
            'settings' => [
                'corner_radius' => $settings['corner_radius'] ?? '',
                'enable_logo' => $settings['enable_logo'] ?? false,
                'logo_url' => $settings['logo_url'] ?? '',
                'rating_icon' => $settings['rating_icon'] ?? '',
                'enable_review_branding' => $settings['enable_review_branding'] ?? false,
                'enable_email_banners' => $settings['enable_email_banners'] ?? false,
                'banner_src' => $settings['banner_src'] ?? '',
                'rating_rgb_color' => $settings['rating_rgb_color'] ?? '',
                'appearance' => $settings['appearance'] ?? '',
                'appearance_options' => [
                    'email_background_color' => $settings['appearance_options']['email_background_color'] ?? '',
                    'content_background_color' => $settings['appearance_options']['content_background_color'] ?? '',
                    'email_text_color' => $settings['appearance_options']['email_text_color'] ?? '',
                    'button_bg_color' => $settings['appearance_options']['button_bg_color'] ?? '',
                    'button_border_color' => $settings['appearance_options']['button_border_color'] ?? '',
                    'button_title_color' => $settings['appearance_options']['button_title_color'] ?? '',
                    'font_type' => $settings['appearance_options']['font_type'] ?? '',
                    'font_size' => $settings['appearance_options']['font_size'] ?? '',
                ],
            ],
        ];
    }
}