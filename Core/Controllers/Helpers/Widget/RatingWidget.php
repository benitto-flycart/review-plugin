<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

class RatingWidget extends Widget implements WidgetInterface
{
    public static $enqueued = false;

    public static $instances_count = 0;

    public function getSettings($settings)
    {
        $colors = $settings['colors'] ?? [];
        return [
            'layout' => $settings['layout'] ?? 'single',
            'widget_alignment' => $settings['widget_alignment'] ?? 'left',
            'direction' => $settings['direction'] ?? 'icon_first',
            'text_content' => $settings['text_content'] ?? '{{rating}} - ({{count}})',
            'hide_text_content' => Functions::getBoolValue($settings['hide_text_content'] ?? false),
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
            'colors' => [
                'text_color' => $this->request->get('colors.text_color'),
                'rating_icon_color' => $this->request->get('colors.rating_icon_color'),
            ]
        ];
    }

    public function isSingleIconEnabled()
    {
        return $this->settings['layout'] == 'single';
    }

    public function getWidgetTextContent($rating_count, $review_count)
    {
        $content = $this->settings['text_content'];

        return str_replace(["{{rating}}", "{{count}}"], [$rating_count, $review_count], $content);
    }

    public function hideText()
    {
        return Functions::getBoolValue($this->settings['hide_text_content']);
    }

    public function getWidgetAlignment()
    {
        $justifyContent = 'start';

        switch ($this->settings['widget_alignment']) {
            case 'right':
                $justifyContent = 'end';
                break;
            case 'left':
                $justifyContent = 'start';;;;
                break;
            case 'center':
                $justifyContent = 'center';
                break;
        }

        return $justifyContent;
    }

    public function getStyleVars()
    {
        $vars = [
            "--r-rw-icon-color" => $this->settings['colors']['rating_icon_color'],
            "--r-rw-text-color" => $this->settings['colors']['text_color'],
            "--r-rw-flex-direction" => $this->settings['direction'] == 'text_first' ? 'row-reverse' : 'row',
            "--r-rw-flex-justify-content" => $this->getWidgetAlignment(),
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }
}
