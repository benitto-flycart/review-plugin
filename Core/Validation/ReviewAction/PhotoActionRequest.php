<?php

namespace Flycart\Review\Core\Validation\ReviewAction;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class PhotoActionRequest implements FormRequest
{
    public function rules(Request $request)
    {

        return [
            'action_type' => ['required'],
            'value' => ['required'],
            'attachment_id' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'action_type.required' => 'Action type is required',
            'value.required' => 'Value is required',
            'attachment_id.required' => 'Attachment ID is required',

        ];
    }
}
