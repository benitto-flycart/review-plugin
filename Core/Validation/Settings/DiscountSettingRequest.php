<?php

namespace Flycart\Review\Core\Validation\Settings;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class DiscountSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'enable_photo_discount' => ['required'],
            'photo_discount_type' => ['required'],
            'photo_discount_value' => ['required'],
            'enable_video_discount' => ['required'],
            'video_discount_type' => ['required'],
            'video_discount_value' => ['required'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}