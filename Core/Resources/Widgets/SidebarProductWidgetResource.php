<?php

namespace Flycart\Review\Core\Resources\Widgets;

defined('ABSPATH') || exit;

use Flycart\Review\App\Resource;

class SidebarProductWidgetResource extends Resource
{

    public function toArray($settings)
    {
        return [
            'is_active' => $settings['is_active'] ?? true,
            'position' => $settings['position'] ?? 'left',
            'orientation' => $settings['orientation'] ?? 'top_to_bottom',
            'button_text' => $settings['button_text'] ?? 'Reviews',
            'button_bg_color' => $settings['button_bg_color'] ?? '#adb4ba',
            'button_text_color' => $settings['button_text_color'] ?? '#adb4ba',
            'hide_on_mobile' => $settings['hide_on_mobile'] ?? false,
            'show_in_home_page' => $settings['show_in_home_page'] ?? true,
            'show_in_product_page' => $settings['show_in_product_page'] ?? false,
            'show_in_cart_page' => $settings['show_in_cart_page'] ?? false,
        ];
    }
}

