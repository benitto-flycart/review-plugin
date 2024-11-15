<?php

namespace Flycart\Review\Core\Validation;

defined('ABSPATH') || exit;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class ReviewRequestSettingsValidation implements FormRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'language' => ['required'],
            'subject' => ['required'],
            'body' => ['required'],
            'button_text' => ['required']
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}

