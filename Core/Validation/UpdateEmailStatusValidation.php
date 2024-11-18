<?php

namespace Flycart\Review\Core\Validation;

defined('ABSPATH') || exit;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class UpdateEmailStatusValidation implements FormRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'current_locale' => ['required'],
            'email_type' => ['required'],
            'is_enabled' => ['required'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'current_locale.required' => __(vsprintf('The %s field is required.', [__('current locale', 'f-review')]), 'f-reivew'),
            'email_type.required' => __(vsprintf('The %s field is required.', [__('email type', 'f-review')]), 'f-reivew'),
            'is_enabled' => __(vsprintf('The %s field is required.', [__('is enabled', 'f-review')]), 'f-reivew'),
        ];
    }
}
