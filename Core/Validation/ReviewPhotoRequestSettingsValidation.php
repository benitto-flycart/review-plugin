<?php

namespace Flycart\Review\Core\Validation;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class ReviewPhotoRequestSettingsValidation implements FormRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'language' => ['required'],
            'subject' => ['required'],
            'minimum_star' => ['required'],
            'body' => ['required'],
            'discount_text' => ['required'],
            'button_text' => ['required']
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}