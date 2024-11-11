<?php

namespace Flycart\Review\Core\Validation\OrderAction;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class OrderUpdateRequest implements FormRequest
{
    public function rules(Request $request)
    {

        return [
            'type' => ['required'],
            'order_id' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'type.required' => vsprintf(esc_attr('%s is required', 'f-review'), [__('type', 'f-review')]),
            'order_id.required' => vsprintf(esc_attr('%s is required', 'f-review'), [__('order_id', 'f-review')]),
        ];
    }
}
