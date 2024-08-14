<?php

namespace Flycart\Review\Core\Resources\Widgets;

use Flycart\Review\App\Resource;

class FloatingProductWidgetResource extends Resource
{

    public function toArray($settings)
    {
        return [
                'is_active' => $settings['is_active'],
                'title' => $settings['title'] ?? __('Reviews', 'flycart-review'),
                'title_bg_color' => $settings['title_bg_color'],
                'title_text_color' => $settings['title_text_color'],
                'product_thumbnail_enabled' => $settings['product_thumbnail_enabled'],
                'link_to_product_page_enabled' => $settings['link_to_product_page_enabled']
        ];
    }
}