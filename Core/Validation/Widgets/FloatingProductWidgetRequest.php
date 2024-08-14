<?php

namespace Flycart\Review\Core\Validation\Widgets;

use Flycart\Review\Package\Request\Request;

class FloatingProductWidgetRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'is_active' => ['required'],
            'title' => ['required'],
            'title_bg_color' => ['required'],
            'title_text_color' => ['required'],
            'product_thumbnail_enabled' => ['required'],
            'link_to_product_page_enabled' => ['required']
        ];
        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}