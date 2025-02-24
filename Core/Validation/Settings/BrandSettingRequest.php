<?php

namespace Flycart\Review\Core\Validation\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class BrandSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $data = $request->all();
        $rules = [
            'enable_logo' => ['required'],
            'rating_icon' => ['required'],
            'enable_review_branding' => ['required'],
            'enable_email_banners' => ['required'],
            'rating_rgb_color' => ['required'],
            'appearance' => ['required'],

        ];



        if (isset($data['enable_logo']) && Functions::getBoolValue($data['enable_logo'])) {
            $rules['logo_url'] = ['required'];
        }

        if (isset($data['enable_email_banners']) && Functions::getBoolValue($data['enable_email_banners'])) {
            $rules['banner_src'] = ['required'];
        }

        if ($data['appearance'] == 'custom') {
            $rules['appearance_options'] = ['required'];
        }

        if (isset($data['appearance']) && Functions::getBoolValue($data['appearance'])) {
            $rules['appearance_options'] = ['required'];
            $rules['appearance_options.email_background_color'] = ['required'];
            $rules['appearance_options.content_background_color'] = ['required'];
            $rules['appearance_options.email_text_color'] = ['required'];
            $rules['appearance_options.button_bg_color'] = ['required'];
            $rules['appearance_options.button_border_color'] = ['required'];
            $rules['appearance_options.button_title_color'] = ['required'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}
