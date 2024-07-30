<?php

namespace Flycart\Review\Core\Validation\Settings;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class BrandSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'corner_radius' => ['required'],
            'enable_logo' => ['required'],
            'rating_icon_style' => ['required'],
            'enable_review_branding' => ['required'],
            'enable_email_banners' => ['required'],
            'rating_rgb_color' => ['required'],
            'appearance' => ['required'],
            'appearance_options' => [
                'email_background_color' => ['required'],
                'content_background_color' => ['required'],
                'email_text_color' => ['required'],
                'button_bg_color' => ['required'],
                'button_border_color' => ['required'],
                'button_title_color' => ['required'],
                'font_type' => ['required'],
                'font_size' => ['required'],
            ],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}