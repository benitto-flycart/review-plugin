<?php

namespace Flycart\Review\Core\Controllers\Helpers\Widget;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\ReviewSettings\DiscountSettings;
use Flycart\Review\Core\Models\SettingsModel;

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
                'title' => stripslashes($rating['title'] ?? 'How would you rate {product_name?}'),
            ],
            'photos' => [
                'title' => stripslashes($photos['title'] ?? 'Show it Off'),
                'description' => stripslashes($photos['description'] ?? "We'd love to see it again"),
                'button_text' => $photos['button_text'] ?? "Add Photos",
                'discount_text' => stripslashes($photos['discount_text'] ?? "Get {{discount_value}} off your next purchase!"),
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
                'description' => stripslashes($thank_you['description_color'] ?? 'Your Review was submitted'),
                'discount_info_title' => stripslashes($thank_you['discount_info_title'] ?? 'Use the following discount code for {discount_value} off your next purchase'),
                'discount_info_description' => stripslashes($thank_you['discount_info_description'] ?? "we'll also send it by email discount expires {date_expiry}"),
            ],

        ];

        return $this->settings;
    }

    public function getWidgetType()
    {
        return SettingsModel::REVIEW_FORM_WIDGET;
    }

    public function getRequestFromSettings()
    {

        if (is_null($this->request)) {
            return [];
        }

        return [
            'general' => $this->request->get('general'),
            'rating' => [
                'title' => $this->request->get('rating.title', '', '')
            ],
            'photos' => [
                'button_text' => $this->request->get('photos.button_text'),
                'description' => $this->request->get('photos.description', '', ''),
                'discount_text' => $this->request->get('photos.discount_text', '', ''),
                'title' => $this->request->get('photos.title'),
            ],
            'review_content' => [
                'title' => $this->request->get('review_content.title'),
                'placeholder' => $this->request->get('review_content.placeholder'),
            ],
            'reviewer' => [
                'title' => $this->request->get('reviewer.title'),
            ],
            'thank_you' => [
                'title' => $this->request->get('thank_you.title'),
                'description' => $this->request->get('thank_you.description', '', ''),
                'discount_info_title' => $this->request->get('thank_you.discount_info_title'),
                'discount_info_description' => $this->request->get('thank_you.discount_info_description', '', 'html'),
            ],
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

    public function getRatingTitle($product)
    {
        $product_name = $product->get_name();

        $content = "<span class='r_rfw_rating-title__product_name'>" . $product_name .  " </span>";

        $title =  $this->settings['rating']['title'];

        return nl2br(preg_replace('/\[product_name\??\]/', $content, $title));
    }

    public function getPhotoTitle()
    {
        return $this->settings['photos']['title'];
    }

    public function getPhotoDescription()
    {
        return nl2br($this->settings['photos']['description']);
    }

    public function getPhotoButtonText()
    {
        return $this->settings['photos']['button_text'];
    }

    public function getPhotoDiscountText(DiscountSettings $discountSettings)
    {
        $discount_value = $discountSettings->photoDiscountString();

        return nl2br(str_replace("[discount_value]", $discount_value, $this->settings['photos']['discount_text']));
    }

    public function getReviewContentPlaceholder()
    {
        return $this->settings['review_content']['placeholder'];
    }

    public function getReviewContentTitle()
    {
        return $this->settings['review_content']['title'];
    }

    public function getReviewerInfoTitle()
    {
        return $this->settings['reviewer']['title'];
    }

    public function getThankYouPageTitle()
    {
        return $this->settings['thank_you']['title'];
    }

    public function getThankYouPageDescription()
    {
        return $this->settings['thank_you']['description'];
    }

    public function getDiscountTitle()
    {
        return $this->settings['thank_you']['discount_info_title'];
    }

    public function getDiscountDescription()
    {
        return $this->settings['thank_you']['discount_info_description'];
    }
}
