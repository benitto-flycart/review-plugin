<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

class PopupWidget extends Widget implements WidgetInterface
{
    public function getWidgetType()
    {
        return WidgetModel::POPUP_WIDGET;
    }

    public function getRequestFromSettings()
    {
        return [
            'corner_radius' => $this->request->get('corner_radius'),
            'minimum_rating' => $this->request->get('minimum_rating'),
            'initial_delay' => $this->request->get('initial_delay'),
            'delay_between_popup' => $this->request->get('delay_between_popup'),
            'popup_display_time' => $this->request->get('popup_display_time'),
            'show_product_thumbnail' => $this->request->get('show_product_thumbnail'),
            'hide_on_mobile' => Functions::getBoolValue($this->request->get('hide_on_mobile')),
            'auto_play_video' => Functions::getBoolValue($this->request->get('auto_play_video')),
            'show_on_home_page' => Functions::getBoolValue($this->request->get('show_on_home_page')),
            'show_on_cart_page' => Functions::getBoolValue($this->request->get('show_on_cart_page')),
            'show_on_product_page' => Functions::getBoolValue($this->request->get('show_on_product_page')),
            'colors' => $this->request->get('colors'),
        ];
    }

    public function getSettings($settings)
    {
        $colors = $settings['colors'] ?? [];

        return [
            'corner_radius' => $settings['corner_radius'] ?? 'sharp',
            'minimum_rating' => $settings['minimum_rating'] ?? '3_stars',
            'initial_delay' => $settings['initial_delay'] ?? "1",
            'delay_between_popup' => $settings['delay_between_popup'] ?? "1",
            'popup_display_time' => $settings['popup_display_time'] ?? "1",
            'show_product_thumbnail' => $settings['show_product_thumbnail'] ?? true,
            'hide_on_mobile' => Functions::getBoolValue($settings['hide_on_mobile'] ?? true),
            'auto_play_video' => Functions::getBoolValue($settings['auto_play_video'] ?? true),
            'show_on_home_page' => Functions::getBoolValue($settings['show_on_home_page'] ?? true),
            'show_on_cart_page' => Functions::getBoolValue($settings['show_on_cart_page'] ?? true),
            'show_on_product_page' => Functions::getBoolValue($settings['show_on_product_page'] ?? true),

            'colors' => [
                'review' => [
                    'text_color' => $colors['review']['text_color'] ?? '#E70680',
                    'bg_color' => $colors['review']['bg_color'] ?? '#FED2EA',
                ],
                'product' => [
                    'text_color' => $colors['product']['text_color'] ?? '#6D033D',
                ],
                'close_icon' => [
                    'text_color' => $colors['close_icon']['text_color'] ?? '#E70680',
                    'bg_color' => $colors['close_icon']['bg_color'] ?? '#FED2EA',
                ]
            ]
        ];
    }
}