<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Services\Settings;
use Flycart\Review\Core\Models\Widget as WidgetModel;
use Flycart\Review\Core\Resources\Widgets\ProductWidgetResource;
use Flycart\Review\Package\Request\Response;

class ProductWidget extends Widget implements WidgetInterface
{
    public function getSettings($settings)
    {
        $layout = $settings['layout'] ?? [];
        $style = $settings['style'] ?? [];
        $colors = $settings['colors'] ?? [];
        $preferences = $settings['preferences'] ?? [];

        $this->settings = [
            'layout' => [
                'widget_layout' => $layout['widget_layout'] ?? 'grid',
                'header_layout' => $layout['header_layout'] ?? 'compact',
            ],
            'style' => [
                'review_card_shadow' => $style['review_card_shadow'] ?? 'dark',
                'review_card_openers' => $style['review_card_openers'] ?? 'extra_rounded',
            ],

            'colors' => [
                'type' => $colors['type'] ?? 'custom',
                'header' => [
                    'text_and_icon_color' => $colors['header']['text_and_icon_color'] ?? '#E70680',
                    'bar_fill_color' => $colors['header']['bar_fill_color'] ?? '#E70680',
                    'bar_bg_color' => $colors['header']['bar_bg_color'] ?? '#FED2EA',
                ],
                'button' => [
                    'text_color' => $colors['button']['text_color'] ?? '#E70680',
                    'text_hover_color' => $colors['button']['text_hover_color'] ?? '#E70680',
                    'bg_color' => $colors['button']['bg_color'] ?? '#FED2EA',
                    'bg_hover_color' => $colors['button']['bg_hover_color'] ?? '#FED2EA',
                    'border_color' => $colors['button']['border_color'] ?? '#E70680',
                ],
                'reviews' => [
                    'text_color' => $colors['reviews']['text_color'] ?? '#6D033D',
                    'bg_color' => $colors['reviews']['bg_color'] ?? '#FEE1F1',
                    'bg_hover_color' => $colors['reviews']['bg_hover_color'] ?? '#FDAAD7',
                    'shadow_color' => $colors['reviews']['shadow_color'] ?? '#E70680'
                ],
                'replies' => [
                    'text_color' => $colors['replies']['text_color'] ?? '#6D033D',
                    'bg_color' => $colors['replies']['bg_color'] ?? '#FDAAD7',
                ],
                'verified_badge' => [
                    'icon_color' => $colors['verified_badge']['icon_color'] ?? '#E70680'
                ]
            ],
            'preferences' => [
                'icon_size' => $preferences['icon_size'] ?? 'small',
                'product_review_widget' => $preferences['product_review_widget'] ?? '',
                'show_write_a_review' => $preferences['show_write_a_review'] ?? true,
                'show_review_date' => $preferences['show_review_date'] ?? true,
                'show_item_type' => $preferences['show_item_type'] ?? true,
                'thumbnail_size' => $preferences['thumbnail_size'] ?? 'medium',
                'reviews_per_page' => $preferences['reviews_per_page'] ?? 5,
                'show_sorting_options' => $preferences['show_sorting_options'] ?? true,
                'default_sorting' => $preferences['default_sorting'] ?? 'newest',
                'show_rating_options' => $preferences['show_rating_options'] ?? true
            ]
        ];

        return $this->settings;
    }

    public function getWidgetType()
    {
        return WidgetModel::PRODUCT_WIDGET;
    }

    public function getRequestFromSettings()
    {

        if (is_null($this->request)) {
            return [];
        }

        return [
            'layout' => $this->request->get('layout'),
            'style' => $this->request->get('style'),
            'colors' => $this->request->get('colors'),
            'preferences' => $this->request->get('preferences'),
        ];
    }

    public function getHeaderLayout()
    {
        error_log(print_r($this->settings, true));
        return $this->settings['layout']['header_layout'];
    }

    public function getMainContentLayout()
    {
        return $this->settings['layout']['widget_layout'];
    }
}



/*
 *
 */