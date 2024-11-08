<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\Widget as WidgetModel;

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
                'widget_wrapper' => $colors['widget_wrapper'] ?? '#FED2EA',
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
                    'shadow_color' => $colors['reviews']['shadow_color'] ?? '#E70680',
                    'separator_color' => $colors['reviews']['separator_color'] ?? '#E70680'
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
                'show_write_a_review' => Functions::getBoolValue($preferences['show_write_a_review'] ?? true),
                'show_review_date' => Functions::getBoolValue($preferences['show_review_date'] ?? true),
                'reviews_per_page' => $preferences['reviews_per_page'] ?? 5,
                'show_sorting_options' => Functions::getBoolValue($preferences['show_sorting_options'] ?? true),
                'default_sorting' => $preferences['default_sorting'] ?? 'newest',
                'show_rating_options' => Functions::getBoolValue($preferences['show_rating_options'] ?? true)
            ]
        ];

        return $this->settings;
    }


    public function isReviewDateEnabled()
    {
        return $this->settings['preferences']['show_review_date'];
    }

    public function showWriteAReview()
    {
        return $this->settings['preferences']['show_write_a_review'];
    }

    public function showRatingOptions()
    {
        return $this->settings['preferences']['show_rating_options'];
    }

    public function showSortingOptions()
    {
        return $this->settings['preferences']['show_sorting_options'];
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
        return $this->settings['layout']['header_layout'];
    }

    public function getMainContentLayout()
    {
        return $this->settings['layout']['widget_layout'];
    }

    public function getPerPage()
    {
        return  5;
    }

    public function getProductWidgetStylesVars()
    {
        $vars = [
            "--r-prw-wrapper-bg-color" => $this->settings['colors']['widget_wrapper'],
            "--r-prw-btn-color" => $this->settings['colors']['button']['text_color'],
            "--r-prw-btn-bg-color" => $this->settings['colors']['button']['bg_color'],
            "--r-prw-btn-bg-hover-color" => $this->settings['colors']['button']['bg_hover_color'],
            "--r-prw-btn-border-color" => $this->settings['colors']['button']['border_color'],
            "--r-prw-progress-fill-color" => $this->settings['colors']['header']['bar_fill_color'],
            "--r-prw-progress-bg-color" => $this->settings['colors']['header']['bar_bg_color'],
            "--r-prw-header-text-icon-color" => $this->settings['colors']['header']['text_and_icon_color'],

            //Review Colors
            '--r-prw-review-color' => $this->settings['colors']['reviews']['text_color'],
            '--r-prw-review-bg-color' => $this->settings['colors']['reviews']['bg_color'],
            '--r-prw-review-bg-hover-color' => $this->settings['colors']['reviews']['bg_hover_color'],
            '--r-prw-review-box-shadow' => $this->reviewShadows($this->settings['style']['review_card_shadow'], $this->settings['colors']['reviews']['shadow_color']),
            '--r-prw-review-border-radius' => $this->reviewOpeners($this->settings['style']['review_card_openers']),

            //Replies Color
            '--r-prw-review-replies-color' => $this->settings['colors']['replies']['text_color'],
            '--r-prw-review-replies-bg-color' => $this->settings['colors']['replies']['bg_color'],
            '--r-prw-review-separator-color' => $this->settings['colors']['reviews']['separator_color'],

            //Verified Color
            '--r-prw-review-verified-color' => $this->settings['colors']['verified_badge']['icon_color'],
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }

    public function reviewShadows($type, $color)
    {
        $shadows = [
            'classic' => [
                'box-shadow' => "0 0 8px {{color}}",
            ],
            'dark' => [
                'box-shadow' => "0 6px 14px {{color}}"
            ],
            'light' => [
                'box-shadow' => "0 6px 14px -4px {{color}}",
            ],
            'none' => [
                'box-shadow' => "0 0 0 0 {{color}}",
            ]
        ];

        $shadow = isset($shadows[$type]) ? $shadows[$type]['box-shadow'] : '';

        return str_replace("{{color}}", $color, $shadow);
    }

    public function reviewOpeners($type)
    {
        $openers = [
            'sharp' => [
                'border-radius' => "2px",
            ],
            'slightly_rounded' => [
                'border-radius' => "4px",
            ],
            'rounded' => [
                'border-radius' => "8px",
            ],
            'extra_rounded' => [
                'border-radius' => "16px"
            ],
            'none' => [
                'border-radius' => "0px"
            ]
        ];

        return isset($openers[$type]) ? $openers[$type]['border-radius'] : '';
    }
}
