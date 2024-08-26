<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Services\Settings;
use Flycart\Review\Core\Models\Widget as WidgetModel;
use Flycart\Review\Core\Resources\Widgets\ProductWidgetResource;
use Flycart\Review\Package\Request\Response;

class ProductWidget extends Widget implements WidgetInterface
{
    public function save()
    {
        $widget = WidgetModel::query()
            ->where("language = %s AND widget_type = %s", [$this->language, WidgetModel::PRODUCT_WIDGET])
            ->first();

        $settings = [
            'layout' => $this->request->get('layout'),
            'style' => $this->request->get('style'),
            'colors' => $this->request->get('colors'),
            'preferences' => $this->request->get('preferences'),
        ];

        $settingsAsArray = $this->getSettings($settings);
        $settings = Functions::jsonEncode($settingsAsArray);

        if (empty($widget)) {
            WidgetModel::query()->create([
                'language' => $this->language,
                'widget_type' => WidgetModel::PRODUCT_WIDGET,
                'status' => WidgetModel::ACTIVE,
                'theme' => 'default',
                'settings' => $settings
            ]);
        } else {
            WidgetModel::query()->update([
                'settings' => $settings
            ], [
                'id' => $widget->id
            ]);
        }

        $data = [
            'message' => sprintf(__('%s Widget Saved Successfully'), 'Product'),
            'settings' => $settingsAsArray
        ];

        return $data;
    }

    public function get()
    {
        $widget = WidgetModel::query()
            ->where("language = %s AND widget_type = %s", [$this->language, WidgetModel::PRODUCT_WIDGET])
            ->first();

        $settings = Functions::jsonDecode($widget->settings ?? null);
        $settings = $this->getSettings($settings);

        $data = [
            'settings' => $settings,
            'message' => sprintf(__('%s Widget Fetched Successfully'), 'Product')
        ];

        return $data;
    }


    public function getSettings($settings)
    {

        $layout = $settings['layout'] ?? [];
        $style = $settings['style'] ?? [];
        $colors = $settings['colors'] ?? [];
        $preferences = $settings['preferences'] ?? [];

        return [
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
                    'text_and_icon_color' => $colors['header']['text_and_icon_color'] ?? '#ea3c3c',
                    'bar_fill_color' => $colors['header']['bar_fill_color'] ?? '#7b7b7b',
                    'bar_bg_color' => $colors['header']['bar_bg_color'] ?? 'f5f5f5',
                ],
                'button' => [
                    'text_color' => $colors['button']['text_color'] ?? '#000000',
                    'text_hover_color' => $colors['button']['text_hover_color'] ?? '#000000',
                    'bg_color' => $colors['button']['bg_color'] ?? '#ffffff',
                    'bg_hover_color' => $colors['button']['bg_hover_color'] ?? '#e8e8e8',
                    'border_color' => $colors['button']['border_color'] ?? '#e8e8e8',
                ],
                'reviews' => [
                    'text_color' => $colors['reviews']['text_color'] ?? '#020202',
                    'bg_color' => $colors['reviews']['bg_color'] ?? '#f5c6c6',
                    'bg_hover_color' => $colors['reviews']['bg_hover_color'] ?? '#b45e5e',
                    'shadow_color' => $colors['reviews']['shadow_color'] ?? '#ebacac'
                ],
                'replies' => [
                    'text_color' => $colors['replies']['text_color'] ?? '#000000',
                    'bg_color' => $colors['replies']['bg_color'] ?? '#ffffff',
                ],
                'verified_badge' => [
                    'icon_color' => $colors['verified_badge']['icon_color'] ?? '#282828'
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
    }
}



/*
 *
 */