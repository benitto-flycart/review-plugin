<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\Core\Models\EmailSetting;
use WC_Order;

class DiscountRequest extends Emails
{
    public $settings = [];

    public function __construct($language)
    {
        $this->locale = $language;

        $reviewRequest = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::DISCOUNT_REQUEST_TYPE])
            ->first();

        if (empty($reviewRequest)) {
            $settings = EmailSetting::getDefaultReviewRequestSettings($this->locale);
            $this->status = 'active';
        } else {
            $settings = $reviewRequest->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);

            $this->status = $reviewRequest->status;
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
        ];

        if ($data['body'] == 'Review Request Body') {
            $data['body'] = 'Order #{order_number}, how did it go?';
        }

        if ($data['subject'] == 'Review Request Subject') {
            $data['subject'] = 'Order #{order_number}, how did it go?';
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

    public function getTemplatePreview()
    {
        return 'Discount request email template';
    }
}
