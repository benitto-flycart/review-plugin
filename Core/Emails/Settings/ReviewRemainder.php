<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\Core\Models\EmailSetting;
use WC_Order;

class ReviewRemainder extends Emails
{
    public $settings = [];

    public function __construct($language)
    {
        $this->locale = $language;

        $reviewReminder = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::REVIEW_REMINDER_TYPE])
            ->first();

        error_log('checking in db');

        if (empty($reviewReminder)) {
            $settings = $this->getDefaultReviewRemainderSettings($this->locale);
            $this->status = 'active';
        } else {
            $settings = $reviewReminder->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);

            $this->status = $reviewReminder->status;
        }

        $this->settings = $settings;

        error_log('review reminder construcotr executed');
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

    public function getBody($order)
    {
        $message = $this->getBodyText();

        $order_id = $order->get_id();

        $message = str_replace(['[order_id]'], [$order_id], $message);

        return $message;

        # code...
    }

    public function getTemplatePreview()
    {
        return 'Review Remainder Email Template';
    }

    public  function getDefaultReviewRemainderSettings($language)
    {
        $data = [
            'body' => __('Review Remainder Body', 'flycart-review'),
            'subject' => __('Review Remainder Subject', 'flycart-review'),
            'button_text' => __('Review Remainder Button Text', 'flycart-review'),
        ];

        if ($data['body'] == 'Review Remainder Body') {
            $data['body'] = "Hello {name}, We would be grateful if you shared how things look and feel . Your reviews help us and the community that support us, and it only takes a few seconds";
        }

        if ($data['subject'] == 'Review Remainder Subject') {
            $data['subject'] = "Reminder: Order #{order_number}, how did it go?";
        }

        if ($data['button_text'] == 'Review Remainder Button Text') {
            $data['button_text'] = 'Write a Review';
        }

        return apply_filters('flycart_review_review_remainder_data', $data, $language);
    }
}
