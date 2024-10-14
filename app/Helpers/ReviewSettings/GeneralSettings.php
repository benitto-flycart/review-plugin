<?php

namespace Flycart\Review\App\Helpers\ReviewSettings;

use Flycart\Review\App\Helpers\Functions;
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
            'send_replies_to' => $settings['send_replies_to'] ?? '',
            'enable_email_footer' => Functions::getBoolValue($settings['enable_email_footer']) ?? false,
            'footer_text' => $settings['footer_text'] ?? '',
            'reviewers_name_format' => $settings['reviewers_name_format'] ?? 'first_name',
            'auto_publish_new_reviews' => Functions::getBoolValue($settings['auto_publish_new_reviews']) ?? false,
            'enable_review_notification' => Functions::getBoolValue($settings['enable_review_notification']) ?? false,
            'review_notification_to' => $settings['review_notification_to'] ?? '',
            'review_request_timing' => $settings['review_request_timing'] ?? 1,
            'order_status' => $settings['order_status'] ?? 'wc-completed',
        ];
    }

    public function getFromRequest($request)
    {
        $data = [
            'send_replies_to' => $request->get('send_replies_to') ?? '',
            'enable_email_footer' => $enable_email_footer = Functions::getBoolValue($request->get('enable_email_footer')),
            'footer_text' => $enable_email_footer ? $request->get('footer_text') : '',
            'reviewers_name_format' => $request->get('reviewers_name_format'),
            'auto_publish_new_reviews' => $request->get('auto_publish_new_reviews'),
            'enable_review_notification' => $enable_review_notification = Functions::getBoolValue($request->get('enable_review_notification')),
            'review_notification_to' => $enable_review_notification ? $request->get('review_notification_to') : '',
            'review_request_timing' => $request->get('review_request_timing'),
            'order_status' => $request->get('order_status'),
        ];

        return $this->mergeWithDefault($data);
    }

    public function isFooterEnabled()
    {
        return Functions::getBoolValue($this->generalSettings['footer_text']);
    }

    public function getFooterText()
    {

        return $this->generalSettings['footer_text'];
    }


    public function getOrderStatus()
    {
        return $this->generalSettings['order_status'];
    }

    public function getReviewRequestDelay()
    {
        return $this->generalSettings['review_request_timing'] * 24 * 24 * 60;
    }
}
