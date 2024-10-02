<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

use Flycart\Review\Core\Models\Widget as WidgetModel;

class ReviewFormWidget extends Widget implements WidgetInterface
{


    public function getSettings($settings)
    {
        $general = $settings['general'] ?? [];
        $rating = $settings['rating'] ?? [];
        $photos = $settings['photos'] ?? [];
        $review_content = $settings['review_content'] ?? [];
        $reviewer = $settings['reviewer'] ?? [];
        $thank_you = $settings['thank_you'] ?? [];

        $this->settings = [
            'general' => [
                'title_color' => $general['title_color'] ?? '#f20ba9',
                'description_color' => $general['description_color'] ?? '#ec07a3',
                'button_text_color' => $general['button_text_color'] ?? '#f20ba9',
                'button_bg_color' => $general['button_bg_color'] ?? '#fbddef',
                'input_label_color' => $general['input_label_color'] ?? '#fbddef',
                'input_border_color' => $general['input_border_color'] ?? '#fbddef',
                'input_error_color' => $general['input_error_color'] ?? '#fbddef',
                'dialog_bg_color' => $general['dialog_bg_color'] ?? '#fbddef',
                'rating_icon_color' => $general['rating_icon_color'] ?? 'white',
            ],
            'rating' => [
                'title' => $rating['title'] ?? 'How would you rate {product_name?}',
            ],
            'photos' => [
                'title' => $photos['title'] ?? 'Show it Off',
                'description' => $photos['description'] ?? "We'd love to see it again",
                'button_text' => $photos['button_text'] ?? "Add Photos",
                'discount_text' => $photos['discount_text'] ?? "Get {{discount_value}} off your next purchase!",
            ],
            'review_content' => [
                'title' => $review_content['title'] ?? 'Tell us more!',
                'placeholder' => $review_content['placeholder'] ?? 'Share your experience',
            ],
            'reviewer' => [
                'title' => $reviewer['title'] ?? 'About you',
                'label_color' => $reviewer['label_color'] ?? 'purple',
                'description_color' => $reviewer['description_color'] ?? 'purple',
            ],
            'thank_you' => [
                'title' => $thank_you['title'] ?? 'Thank you',
                'description' => $thank_you['description_color'] ?? 'Your Review was submitted',
            ],

        ];

        return $this->settings;
    }

    public function getWidgetType()
    {
        return WidgetModel::REVIEW_FORM_WIDGET;
    }

    public function getRequestFromSettings()
    {

        if (is_null($this->request)) {
            return [];
        }

        return [
            'general' => $this->request->get('general'),
            'rating' => $this->request->get('rating'),
            'photos' => $this->request->get('photos'),
            'review_content' => $this->request->get('review_content'),
            'reviewer' => $this->request->get('reviewer'),
            'thank_you' => $this->request->get('thank_you'),
        ];
    }

    public function getProductWidgetStylesVars()
    {
        $vars = [
            "--r-rfw-btn-bg-color" => $this->settings['general']['button_bg_color'],
            "--r-rfw-btn-text-color" => $this->settings['general']['button_text_color'],
            "--r-rfw-description-color" => $this->settings['general']['description_color'],
            "--r-rfw-dialog-bg-color" => $this->settings['general']['dialog_bg_color'],
            "--r-rfw-input-border-color" => $this->settings['general']['input_border_color'],
            "--r-rfw-input-error-color" => $this->settings['general']['input_error_color'],
            "--r-rfw-input-label-color" => $this->settings['general']['input_label_color'],
            "--r-rfw-rating-icon-color" => $this->settings['general']['rating_icon_color'],
            "--r-rfw-title-color" => $this->settings['general']['title_color'],

            "--r-rfw-reviewer-label-color" => $this->settings['reviewer']['label_color'],
            "--r-rfw-reviewer-description-color" => $this->settings['reviewer']['description_color'],
        ];

        $style = '';

        foreach ($vars as $var => $value) {
            $style .= "$var:$value;";
        }

        return $style;
    }
}