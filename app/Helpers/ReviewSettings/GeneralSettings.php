<?php

namespace Flycart\Review\App\Helpers\ReviewSettings;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Models\ReviewSetting;

class GeneralSettings extends ReviewSettings
{
    public $generalSettings = [];

    public function __construct()
    {
        $brand_setting = ReviewSetting::query()
            ->where("meta_key = %s", [ReviewSetting::GENERAL_SETTINGS])
            ->first();

        $data = Functions::jsonDecode($brand_setting->meta_value);

        $this->generalSettings = $this->mergeWithDefault($data);
    }

    public function get()
    {
        return $this->mergeWithDefault($this->generalSettings);
    }

    public function mergeWithDefault($settings)
    {
        return [
            'reviewers_name_format' => $settings['reviewers_name_format'] ?? 'first_name',
            'auto_publish_new_reviews' => Functions::getBoolValue($settings['auto_publish_new_reviews']),
            'order_status' => $settings['order_status'] ?? 'wc-completed',
            'emails' => [
                'send_replies_to' => $settings['emails']['send_replies_to'] ?? '',
                'enable_email_footer' => Functions::getBoolValue($settings['emails']['enable_email_footer'] ?? false),
                'footer_text' => $settings['emails']['footer_text'] ?? '',
                'enable_review_notification' => Functions::getBoolValue($settings['emails']['enable_review_notification']) ?? false,
                'review_notification_to' => $settings['emails']['review_notification_to'] ?? '',
                'review_request_timing' => $settings['emails']['review_request_timing'] ?? "1",
                'review_reminder_timing' => $settings['emails']['review_reminder_timing'] ?? "0",
                'review_photo_request_timing' => $settings['emails']['review_photo_request_timing'] ?? "0",
                'review_discount_notify_timing' => $settings['emails']['review_discount_notify_timing'] ?? "0",
                'review_discount_reminder_timing' => $settings['emails']['review_discount_reminder_timing'] ?? "0",
            ],
        ];
    }

    public function getFromRequest($request)
    {
        $data = [];
        if (!empty($type = $request->get('settings_type')) && $type == 'email') {
            $data['emails'] = [
                'send_replies_to' => $request->get('emails.send_replies_to') ?? '',
                'enable_email_footer' => $enable_email_footer = Functions::getBoolValue($request->get('emails.enable_email_footer')),
                'footer_text' => $enable_email_footer ? $request->get('emails.footer_text', '', 'html') : '',
                'enable_review_notification' => $enable_review_notification = Functions::getBoolValue($request->get('emails.enable_review_notification')),
                'review_notification_to' => $enable_review_notification ? $request->get('emails.review_notification_to') : '',
                'review_request_timing' => $request->get('emails.review_request_timing'),
                'review_reminder_timing' => $request->get('emails.review_reminder_timing'),
                'review_photo_request_timing' => $request->get('emails.review_photo_request_timing'),
                'review_discount_notify_timing' => $request->get('emails.review_discount_notify_timing'),
                'review_discount_reminder_timing' => $request->get('emails.review_discount_reminder_timing'),
            ];
        } else {
            $data['reviewers_name_format'] = $request->get('reviewers_name_format');
            $data['auto_publish_new_reviews'] = $request->get('auto_publish_new_reviews');
            $data['order_status'] = $request->get('order_status');
        }

        return $this->mergeWithDefault($data);
    }

    public function isFooterEnabled()
    {
        return Functions::getBoolValue($this->generalSettings['emails']['footer_text']);
    }

    public function getFooterText()
    {
        return apply_filters('frap_test_get_email_footer_text', nl2br($this->generalSettings['emails']['footer_text']));
    }

    public function getOrderStatus()
    {
        return $this->generalSettings['order_status'];
    }

    public function isAutoPublishEnabled()
    {
        return Functions::getBoolValue($this->generalSettings['auto_publish_new_reviews']);
    }

    public function getReviewRequestDelay()
    {
        return PluginHelper::dayToSeconds($this->generalSettings['emails']['review_request_timing']);
    }

    public function getReviewReminderDelay()
    {
        return PluginHelper::dayToSeconds($this->generalSettings['emails']['review_reminder_timing']);
    }

    public function getReviewPhotoRequestDelay()
    {
        return PluginHelper::dayToSeconds($this->generalSettings['emails']['review_photo_request_timing']);
    }

    public function getDiscountNotifyDelay()
    {
        return PluginHelper::dayToSeconds($this->generalSettings['emails']['review_discount_notify_timing']);
    }

    public function getDiscountReminderDelay()
    {
        return PluginHelper::dayToSeconds($this->generalSettings['emails']['review_discount_reminder_timing']);
    }
}
