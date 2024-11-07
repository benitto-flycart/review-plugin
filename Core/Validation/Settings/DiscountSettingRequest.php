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
        ];

        if (isset($data['enable_photo_discount']) && Functions::getBoolValue($data['enable_photo_discount'])) {
            $rules['photo_discount_type'] = ['required'];
            $rules['photo_discount_value'] = ['required'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}

