<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\Core\Models\Widget as WidgetModel;

class SnippetWidget extends Widget implements WidgetInterface
{


    public function getSettings($settings)
    {
        return [
            'widget_alignment' => $settings['widget_alignment'] ?? 'left',
            'width' => $settings['width'] ?? 'fill',
            'shadow_type' => $settings['shadow_type'] ?? 'spread',
            'show_rating' => $settings['show_rating'] ?? true,
            'show_review_image' => $settings['show_review_image'] ?? true,
            'hide_arrows_on_mobile' => $settings['hide_arrows_on_mobile'] ?? true,
            'font_size' => $settings['font_size'] ?? 16,
            'name_font_size' => $settings['name_font_size'] ?? 16,
            'icon_font_size' => $settings['icon_font_size'] ?? 16,
            'no_of_reviews_to_display' => $settings['no_of_reviews_to_display'] ?? 10,
            'style' => [
                'review_card_shadow' => $settings['style']['review_card_shadow'] ?? 'dark',
                'review_card_openers' => $settings['style']['review_card_openers'] ?? 'extra_rounded',
            ],
            'colors' => [
                'text_color' => $settings['colors']['text_color'] ?? '#6D033D',
                'bg_color' => $settings['colors']['bg_color'] ?? '#FEE1F1',
                'name_color' => $settings['colors']['name_color'] ?? '#6D033D',
                'rating_icon_color' => $settings['colors']['rating_icon_color'] ?? '#E70680',
                'border_color' => $settings['colors']['border_color'] ?? '#4b0b0b',
                'shadow_color' => $settings['colors']['shadow_color'] ?? '#E70680',
            ]
        ];
    }

    public function getWidgetType()
    {
        return WidgetModel::SNIPPET_WIDGET;
    }

    public function getRequestFromSettings()
    {
        return [
            'widget_alignment' => $this->request->get('widget_alignment'),
            'width' => $this->request->get('width'),
            'shadow_type' => $this->request->get('shadow_type'),
            'show_rating' => $this->request->get('show_rating'),
            'show_review_image' => $this->request->get('show_review_image'),
            'hide_arrows_on_mobile' => $this->request->get('hide_arrows_on_mobile'),
            'font_size' => $this->request->get('font_size'),
            'name_font_size' => $this->request->get('name_font_size'),
            'icon_font_size' => $this->request->get('icon_font_size'),
            'no_of_reviews_to_display' => $this->request->get('no_of_reviews_to_display'),
            'style' => [
                'review_card_shadow' => $this->request->get('style.review_card_shadow'),
                'review_card_openers' => $this->request->get('style.review_card_openers'),
            ],
            'colors' => [
                'text_color' => $this->request->get('colors.text_color'),
                'bg_color' => $this->request->get('colors.bg_color'),
                'name_color' => $this->request->get('colors.name_color'),
                'rating_icon_color' => $this->request->get('colors.rating_icon_color'),
                'border_color' => $this->request->get('colors.border_color'),
                'shadow_color' => $this->request->get('colors.shadow_color'),
            ]
        ];
    }
}