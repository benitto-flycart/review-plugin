<?php

namespace Flycart\Review\Core\Validation\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class GeneralSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $data = $request->all();

        $type = $data['settings_type'] ?? 'general';

        if ($type == 'email') {
            $rules = [];
        } else {
            $rules = [
                'reviewers_name_format' => ['required'],
                'auto_publish_new_reviews' => ['required'],
                'order_status' => ['required'],
                'review_font_family' => ['required'],
                'review_font_variant_value' => ['required'],
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'reviewers_name_format.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Reviewers Name Format', 'f-review')]),
            'auto_publish_new_reviews.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Auto Publish Reviews', 'f-review')]),
            'order_status.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Order Status', 'f-review')]),
            'review_font_family.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Font Family', 'f-review')]),
            'review_font_variant_value.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Font Variant Value', 'f-review')]),
        ];
    }
}
