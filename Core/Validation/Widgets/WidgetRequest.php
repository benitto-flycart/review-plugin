<?php

namespace Flycart\Review\Core\Validation\Widgets;

use Flycart\Review\Package\Request\Request;

class WidgetRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'language' => ['required'],
            'widget_type' => ['required'],
        ];
        return $rules;
    }

    public function messages()
    {
        return [

        ];
    }


}