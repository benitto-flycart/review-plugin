<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

class SidebarWidget extends Widget implements WidgetInterface
{

    public function getSettings($settings)
    {
        return [
            'position' => $settings['position'] ?? 'left',
            'orientation' => $settings['orientation'] ?? 'top_bottom',
            'button_text' => $settings['button_text'] ?? 'Reviews',
            'button_bg_color' => $settings['button_bg_color'] ?? '#FED2EA',
            'button_text_color' => $settings['button_text_color'] ?? '#E70680',
            'hide_on_mobile' => Functions::getBoolValue($settings['hide_on_mobile'] ?? true),
            'show_on_home_page' => Functions::getBoolValue($settings['show_on_home_page'] ?? true),
            'show_on_cart_page' => Functions::getBoolValue($settings['show_on_cart_page'] ?? true),
            'show_on_product_page' => Functions::getBoolValue($settings['show_on_product_page'] ?? true),
        ];
    }

    public function getWidgetType()
    {
        return WidgetModel::SIDEBAR_WIDGET;
    }

    public function getRequestFromSettings()
    {
        return [
            'position' => $this->request->get('position'),
            'orientation' => $this->request->get('orientation'),
            'button_text' => $this->request->get('button_text'),
            'button_bg_color' => $this->request->get('button_bg_color'),
            'button_text_color' => $this->request->get('button_text_color'),
            'hide_on_mobile' => Functions::getBoolValue($this->request->get('hide_on_mobile')),
            'show_on_home_page' => Functions::getBoolValue($this->request->get('show_on_home_page')),
            'show_on_cart_page' => Functions::getBoolValue($this->request->get('show_on_cart_page')),
            'show_on_product_page' => Functions::getBoolValue($this->request->get('show_on_product_page')),
        ];
    }


    public function getSidebarPositionClass()
    {
        switch ($this->settings['position']) {
            case 'right':
                return 'r_sbw__right';
            case 'left':
                return 'r_sbw__left';
        }
    }

    public function getOrientationClass()
    {
        $position = $this->settings['position'];
        $orientation = $this->settings['orientation'];

        if ($position == "left" && $orientation == "top_bottom") {
            return "r_sbw__pl_tb";
        } else if ($position == "right" && $orientation == "top_bottom") {
            return "r_sbw__pr_tb";
        } else if ($position == "left" && $orientation == "bottom_top") {
            return "r_sbw__pl_bt";
        } else {
            return "r_sbw__pr_bt";
        }
    }

    public function getStyleVars()
    {
        $vars = [
            '--r-r_sbw-text-color' => $this->settings['button_text_color'],
            '--r-r_sbw-bg-color' => $this->settings['button_bg_color'],
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }
}

