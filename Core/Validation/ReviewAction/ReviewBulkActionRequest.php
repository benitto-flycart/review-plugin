<?php

namespace Flycart\Review\Core\Validation\ReviewAction;

defined('ABSPATH') || exit;

use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Validation\FormRequest;

class ReviewBulkActionRequest implements FormRequest
{
    public function rules(Request $request)
    {

        return [
            'bulk_action' => ['required'],
            'ids' => ['required', 'array'],
        ];
    }

    public function messages()
    {
        return [
            'bulk_action.required' => vsprintf(esc_attr__('%s is required', 'f-review'), [__('Bulk action', 'f-review')]),
            'ids.array' => vsprintf(esc_attr__('%s should be an array', 'f-review'), [__('Ids', 'f-review')]),
            'ids.required' => vsprintf(esc_attr__('%s required', 'f-review'), ['']),
        ];
    }
}
