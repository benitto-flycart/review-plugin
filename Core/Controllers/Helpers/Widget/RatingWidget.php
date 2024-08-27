<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

class RatingWidget extends Widget implements WidgetInterface
{


    public function getSettings($settings)
    {
        $colors = $settings['colors'] ?? [];
        return [
            'layout' => $settings['layout'] ?? 'default',
            'widget_alignment' => $settings['widget_alignment'] ?? 'left',
            'direction' => $settings['direction'] ?? 'icon_first',
            'text_content' => $settings['text_content'] ?? '{{rating}} - ({{count}})',
            'hide_text_content' => Functions::getBoolValue($settings['hide_text_content'] ?? false),
            'font_size' => $settings['font_size'] ?? 30,
            'rating_icon_size' => $settings['rating_icon_size'] ?? 30,
            'colors' => [
                'text_color' => $colors['text_color'] ?? '#E70680',
                'rating_icon_color' => $colors['rating_icon_color'] ?? '#E70680',
            ]
        ];
    }

    public function getWidgetType()
    {
        return WidgetModel::RATING_WIDGET;
    }

    public function getRequestFromSettings()
    {
        return [
            'layout' => $this->request->get('layout'),
            'widget_alignment' => $this->request->get('widget_alignment'),
            'direction' => $this->request->get('direction'),
            'text_content' => $this->request->get('text_content'),
            'hide_text_content' => Functions::getBoolValue($this->request->get('hide_text_content')),
            'font_size' => $this->request->get('font_size'),
            'rating_icon_size' => $this->request->get('rating_icon_size'),
            'colors' => [
                'text_color' => $this->request->get('colors.text_color'),
                'rating_icon_color' => $this->request->get('colors.rating_icon_color'),
            ]
        ];
    }
}