<?php

namespace Flycart\Review\Core\Validation\Settings;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class DiscountSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $data = $request->all();

        $rules = [
            'enable_photo_discount' => ['required'],
            'enable_video_discount' => ['required'],
        ];

        if (isset($data['enable_photo_discount']) && Functions::getBoolValue($data['enable_photo_discount'])) {
            $rules['photo_discount_type'] = ['required'];
            $rules['photo_discount_value'] = ['required'];
        }

        if (isset($data['enable_video_discount']) && Functions::getBoolValue($data['enable_video_discount'])) {
            $rules['video_discount_type'] = ['required'];
            $rules['video_discount_value'] = ['required'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}