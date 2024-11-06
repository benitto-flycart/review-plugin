<?php

namespace Flycart\Review\Core\Validation\Settings;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class GeneralSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $data = $request->all();

        $rules = [
            'reviewers_name_format' => ['required'],
            'auto_publish_new_reviews' => ['required'],
            'order_status' => ['required'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}

