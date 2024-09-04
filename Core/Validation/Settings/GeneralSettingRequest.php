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
            'enable_email_footer' => ['required'],
            'reviewers_name_format' => ['required'],
            'auto_publish_new_reviews' => ['required'],
            'enable_review_notification' => ['required'],
            'review_request_timing' => ['required'],
            'order_status' => ['required'],
        ];

        if (isset($data['enable_email_footer']) && Functions::getBoolValue($data['enable_email_footer'])) {
            $rules['footer_text'] = ['required'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}