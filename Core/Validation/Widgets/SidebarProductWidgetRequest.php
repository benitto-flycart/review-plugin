<?php

namespace Flycart\Review\Core\Validation\Widgets;

defined('ABSPATH') || exit;

use Flycart\Review\Package\Request\Request;

class SidebarProductWidgetRequest
{
    public function rules(Request $request)
    {
        $rules = [
            'is_active' => ['required'],
            'position' => ['required'],
            'orientation' => ['required'],
            'button_text' => ['required'],
            'button_bg_color' => ['required'],
            'button_text_color' => ['required'],
            'hide_on_mobile' => ['required'],
            'show_in_home_page' => ['required'],
            'show_in_product_page' => ['required'],
            'show_in_cart_page' => ['required'],
        ];
        return $rules;
    }

    public function messages(): array
    {
        return [];
    }
}

