<?php

namespace Flycart\Review\Core\Resources\Widgets;

defined('ABSPATH') || exit;

use Flycart\Review\App\Resource;

class ProductWidgetResource extends Resource
{
    public function toArray($settings)
    {
        return [
            'layout' => [
                'widget_layout' => 'list',
                'header_layout' => 'compact',
            ],
            'style' => [
                'review_card_shadow' => 'dark',
                'review_card_openers' => 'extra_rounded',
            ],
            'colors' => [
                'type' => 'custom',
                'header' => [
                    'text_and_icon_color' => '#282828',
                    'bar_fill_color' => '#7b7b7b',
                    'bar_bg_color' => '#f5f5f5',
                ],
                'button' => [
                    'text_color' => '#000000',
                    'text_hover_color' => '#000000',
                    'bg_color' => '#ffffff',
                    'bg_hover_color' => '#e8e8e8',
                    'border_color' => '#e8e8e8',
                ],
                'reviews' => [
                    'text_color' => '#020202',
                    'bg_color' => '#f5c6c6',
                    'bg_hover_color' => '#b45e5e',
                    'shadow_color' => '#ebacac'
                ],
                'replies' => [
                    'text_color' => '#000000',
                    'bg_color' => '#ffffff',
                ],
                'verified_badge' => [
                    'icon_color' => '#282828'
                ]
            ],
            'preferences' => [
                'icon_size' => 'small',
                'product_review_widget' => '',
                'show_write_a_review' => true,
                'show_review_date' => true,
                'show_item_type' => true,
                'thumbnail_size' => 'medium',
                'reviews_per_page' => 5,
                'show_sorting_options' => true,
                'default_sorting' => 'newest',
                'show_rating_options' => true
            ]
        ];
    }
}

