<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\Core\Models\EmailSetting;
use WC_Order;

class PhotoRequest extends Emails
{
    public $settings = [];

    public function __construct($language)
    {
        $this->locale = $language;

        $photoRequest = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::PHOTO_REQUEST_TYPE])
            ->first();

        if (empty($photoRequest)) {
            $settings =  $this->getDefaultReviewRequestSettings($this->locale);
            error_log(print_r($settings, true));
            $this->status = 'active';
        } else {
            $settings = $photoRequest->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);

            $this->status = $photoRequest->status;
        }

        $this->settings = $settings;
    }

    public function getSettings()
    {
        return $this->settings;
    }


    public function getSubject()
    {
        return $this->settings['subject'];
    }

    public function getBodyText()
    {
        return $this->settings['body'];
    }

    public function getButtonText()
    {
        return $this->settings['button_text'];
    }

    public function getDefaultReviewRequestSettings()
    {
        $data = [
            'body' => __('Review Request Body', 'flycart-review'),
            'subject' => __('Review Request Subject', 'flycart-review'),
            'button_text' => __('Review Request Button Text', 'flycart-review'),
            'discount_text' => __('Add a photo to the review and get a discount off your next purchase', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Request Body') {
            $data['body'] = 'Hello [Name] \n\n We wanted to thank you again for your review of [product]. \n Please add your photo to the review and help our community of shopers!';
        }

        if ($data['subject'] == 'Review Request Subject') {
            $data['subject'] = 'Reminder: Add a photo to your review of [product]';
        }

        if ($data['button_text'] == 'Review Request Button Text') {
            $data['button_text'] = 'Write a Review';
        }

        return apply_filters('flycart_review_review_request_data', $data, $this->locale);
    }

    public function getCustomerName(WC_Order $order)
    {
        return $order->get_billing_first_name();
    }

    public function getBody(WC_Order $order)
    {
        $message = $this->getBodyText();

        $order_id = $order->get_id();

        $message = str_replace(['[order_id]'], [$order_id], $message);

        return $message;
    }

    public function getDiscountText()
    {
        return $this->settings['discount_text'];
    }

    public function getTemplatePreview()
    {
        return 'review photo request email template';
    }
}
