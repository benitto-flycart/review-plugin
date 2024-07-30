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
            'appearance_options' => ['required'],
            'appearance_options.email_background_color' => ['required'],
            'appearance_options.content_background_color' => ['required'],
            'appearance_options.email_text_color' => ['required'],
            'appearance_options.button_bg_color' => ['required'],
            'appearance_options.button_border_color' => ['required'],
            'appearance_options.button_title_color' => ['required'],
            'appearance_options.font_type' => ['required'],
            'appearance_options.font_size' => ['required'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}