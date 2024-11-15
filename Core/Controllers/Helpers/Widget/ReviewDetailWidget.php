<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

defined('ABSPATH') || exit;

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

    public function getReviewDetailWidgetStylesVars()
    {
        $vars =  [
            "--r-rdw-dialog-bg-color" => $this->settings['colors']['dialog_bg_color'],
            "--r-rdw-rating-icon-color" => $this->settings['colors']['rating_icon_color'],
            "--r-rdw-text-color" => $this->settings['colors']['text_color'],
            "--r-rdw-btn-text-color" => $this->settings['colors']['button_text_color'],
            "--r-rdw-btn-bg-color" => $this->settings['colors']['button_bg_color'],
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }
}
