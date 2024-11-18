<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\Core\Models\SettingsModel;

defined('ABSPATH') || exit;

class FloatingProductWidget extends Widget implements WidgetInterface
{

    public function getSettings($settings)
    {
        return [
            'text_content' => $settings['text_content'] ?? 'Reviews',
            'text_color' => $settings['text_color'] ?? '#6D033D',
            'bg_color' => $settings['bg_color'] ?? '#FEE1F1',
        ];
    }

    public function getWidgetType()
    {
        return SettingsModel::FLOATING_WIDGET;
    }

    public function getRequestFromSettings()
    {
        return [
            'text_content' => $this->request->get('text_content'),
            'text_color' => $this->request->get('text_color'),
            'bg_color' => $this->request->get('bg_color'),
        ];
    }

    public function getStyles()
    {
        $vars = [
            "--r-frw-bg-color" => $this->settings['bg_color'],
            "--r-frw-text-color" => $this->settings['text_color'],
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }
}
