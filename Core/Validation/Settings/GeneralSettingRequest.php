<?php

namespace Flycart\Review\Core\Validation\Settings;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;


class GeneralSettingRequest implements FormRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'send_replies_to' => ['required'],
            'enable_email_footer' => ['required'],
            'footer_text' => ['required'],
            'reviewers_name_format' => ['required'],
            'auto_publish_new_reviews' => ['required'],
            'enable_review_notification' => ['required'],
            'review_notification_to' => ['required'],
            'review_request_timing' => ['required'],
            'order_status' => ['required'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}