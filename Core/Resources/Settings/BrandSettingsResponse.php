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
            'language' => $settings['language'],
            'language_label' => WordpressHelper::getLanguageLabel($settings['language']),
            'settings' => [
                'corner_radius' => $settings['corner_radius'] ?? '',
                'enable_logo' => $settings['enable_logo'] ?? false,
                'rating_icon_style' => $settings['rating_icon_style'] ?? '',
                'enable_review_branding' => $settings['enable_review_branding'] ?? false,
                'enable_email_banners' => $settings['enable_email_banners'] ?? false,
                'rating_rgb_color' => $settings['rating_rgb_color'] ?? '',
                'appearance' => $settings['appearance'] ?? '',
                'appearance_options' => [
                    'email_background_color' => $settings['appearance_options']['appearance_options'] ?? '',
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