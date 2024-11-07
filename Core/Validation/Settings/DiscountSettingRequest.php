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

            if (!empty($rules['photo_discount_expiry_in_days'])) {
                $rules['photo_discount_expiry_in_days'] = 'numeric';
            }
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'enable_photo_discount.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Enable photo discount', 'f-review')]),
            'photo_discount_type.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Type', 'f-review')]),
            'photo_discount_value.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Discount Value', 'f-review')]),
            'photo_discount_expiry_in_days.numeric' => vsprintf(esc_attr__('%s is must be a positive value', 'f-review'), [__('Expiry days', 'f-review')]),
        ];
    }
}
