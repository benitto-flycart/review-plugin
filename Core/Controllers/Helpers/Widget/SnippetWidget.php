<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

defined('ABSPATH') || exit;

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
            'no_of_reviews_to_display' => $settings['no_of_reviews_to_display'] ?? "12",
            'minimum_rating' => $settings['minimum_rating'] ?? "5",
            "position_to_show" => $settings['position_to_show'] ?? 'woocommerce_single_prodct_summary',
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
            'minimum_rating' => $this->request->get('minimum_rating'),
            "position_to_show" => $this->request->get('position_to_show'),
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


    public function getSnippetWidgetStyles()
    {
        $vars =  [
            "--r-srw-review-bg-color" =>  $this->settings['colors']['bg_color'],
            "--r-srw-review-border-color" => $this->settings['colors']['border_color'],
            "--r-srw-review-box-shadow" => $this->getReviewShadows($this->settings['style']['review_card_shadow']),
            "--r-srw-review-border-radius" => $this->getBorderRadius($this->settings['style']['review_card_openers']),
            "--r-srw-review-text-color" => $this->settings['colors']['text_color'],
            "--r-srw-reviewer-name-color" => $this->settings['colors']['name_color'],
            "--r-srw-rating-icon-color" => $this->settings['colors']['rating_icon_color'],
            "--r-srw-btn-text-color" => $this->settings['colors']['text_color'],
            "--r-srw-btn-bg-color" => $this->settings['colors']['bg_color'],
            "--r-srw-btn-border-radius" => "50%",
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }

    public static function getBorderRadius($index)
    {
        $data =  [
            'sharp' => [
                'borderRadius' => '2px',
            ],
            'slightly_rounded' => [
                'borderRadius' => '4px',
            ],
            'rounded' => [
                'borderRadius' => '8px',
            ],
            'extra_rounded' => [
                'borderRadius' => '16px',
            ],
            'none' => [
                'borderRadius' => '0px',
            ],
        ];

        return $data[$index]['borderRadius'] ?? '0px';
    }

    public function getReviewShadows($index)
    {
        $data = [
            'classic' => [
                'boxShadow' => '0 0 8px {{color}}',
            ],
            'dark' => [
                'boxShadow' => '0 6px 14px {{color}}',
            ],
            'light' => [
                'boxShadow' => '0 6px 14px -4px {{color}}',
            ],
            'none' => [
                'boxShadow' => '0 0 0 0 {{color}}',
            ],
        ];

        $boxShadow =  $data[$index]['boxShadow'] ?? '0 0 0px {{color}}';

        return str_replace("{{color}}", $this->settings['colors']['shadow_color'], $boxShadow);
    }

    public function getNoOfReviewsCount()
    {
        return $this->settings['no_of_reviews_to_display'];
    }

    public function getMinimumRatingToDisplay()
    {
        return $this->settings['minimum_rating'];
    }

    public function getPositionToShow()
    {
        return $this->settings['position_to_show'];
    }
}
