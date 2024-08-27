<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\Core\Models\Widget as WidgetAlias;

class FloatingProductWidget extends Widget implements WidgetInterface
{

    public function getSettings($settings)
    {
        return [
            'text_content' => $settings['text_content'] ?? 'Reviews',
            'font_size' => $settings['font_size'] ?? 48,
            'text_color' => $settings['text_color'] ?? '#6D033D',
            'bg_color' => $settings['bg_color'] ?? '#FEE1F1',
        ];
    }

    public function getWidgetType()
    {
        return WidgetAlias::FLOATING_WIDGET;
    }

    public function getRequestFromSettings()
    {
        return [
            'text_content' => $this->request->get('text_content'),
            'font_size' => $this->request->get('font_size'),
            'text_color' => $this->request->get('text_color'),
            'bg_color' => $this->request->get('bg_color'),
        ];
    }
}