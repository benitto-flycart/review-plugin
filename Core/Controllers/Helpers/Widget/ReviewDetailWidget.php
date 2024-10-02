<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

class ReviewDetailWidget extends Widget implements WidgetInterface
{

    public function getSettings($settings)
    {
        $colors = $settings['colors'] ?? [];

        $this->settings = [
            'colors' => [
                'dialog_bg_color' => $colors['dialog_bg_color'] ?? '#fffcfe',
                'rating_icon_color' => $colors['rating_icon_color'] ?? '#040304',
                'text_color' => $colors['text_color'] ?? '#040304',
                'button_text_color' => $colors['button_text_color'] ?? '#000000',
                'button_bg_color' => $colors['button_bg_color'] ?? '#9e9e9e',
            ],
        ];

        return $this->settings;
    }

    public function getWidgetType()
    {
        return \Flycart\Review\Core\Models\Widget::REVIEW_DETAIL_WIDGET;
    }

    public function getRequestFromSettings()
    {

        if (is_null($this->request)) {
            return [];
        }

        $colors = $this->request->get('colors');

        return [
            'colors' => [
                'dialog_bg_color' => $colors['dialog_bg_color'] ?? '#fffcfe',
                'rating_icon_color' => $colors['rating_icon_color'] ?? '#040304',
                'text_color' => $colors['text_color'] ?? '#040304',
                'button_text_color' => $colors['button_text_color'] ?? '#000000',
                'button_bg_color' => $colors['button_bg_color'] ?? '#9e9e9e',
            ],
        ];
    }
}