<?php

namespace Flycart\Review\Core\Validation\ReviewAction;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class PhotoActionRequest implements FormRequest
{
    public function rules(Request $request)
    {

        return [
            'type' => ['required'],
            'review_id' => ['required'],
            'image_id' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'type.required' => vsprintf(esc_attr('%s is required', 'f-review'), [__('type', 'f-review')]),
            'review_id.required' => vsprintf(esc_attr('%s is required', 'f-review'), [__('review_id', 'f-review')]),
            'image_id.required' => vsprintf(esc_attr('%s is required', 'f-review'), [__('image_id', 'f-review')]),
        ];
    }
}
