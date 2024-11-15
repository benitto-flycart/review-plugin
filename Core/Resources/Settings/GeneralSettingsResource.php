<?php

namespace Flycart\Review\Core\Resources\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Resource;

class GeneralSettingsResource extends Resource
{
    public function toArray($settings, $email_only = false)
    {
        $data =  [
            'settings' => [
                'reviewers_name_format' => $settings['reviewers_name_format'],
                'auto_publish_new_reviews' => $settings['auto_publish_new_reviews'],
                'order_status' => $settings['order_status'],
                'review_font_family' => $settings['review_font_family'],
                'review_font_variant_value' => $settings['review_font_variant_value'],

            ],
        ];

        if (!$email_only) {
            return $data;
        }

        if ($email_only) {
            $data['settings'] = [];
            $data['settings']['emails'] = [
                'send_replies_to' => $settings['emails']['send_replies_to'],
                'enable_email_footer' => $settings['emails']['enable_email_footer'],
                'footer_text' => $settings['emails']['footer_text'],
                'enable_review_notification' => $settings['emails']['enable_review_notification'],
                'review_notification_to' => $settings['emails']['review_notification_to'],
                'review_request_timing' => $settings['emails']['review_request_timing'],
                'review_reminder_timing' => $settings['emails']['review_reminder_timing'],
                'review_photo_request_timing' => $settings['emails']['review_photo_request_timing'],
                'review_discount_notify_timing' => $settings['emails']['review_discount_notify_timing'] ?? "0",
                'review_discount_reminder_timing' => $settings['emails']['review_discount_reminder_timing'] ?? "0",
            ];
        }

        return $data;
    }
}
