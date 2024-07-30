<?php

namespace Flycart\Review\Core\Resources\Settings;

use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Resource;
use Flycart\Review\Core\Models\EmailSetting;

class GeneralSettingsResource extends Resource
{
    public function toArray($settings)
    {
        return [
            'settings' => [
                'send_replies_to' => $settings['send_replies_to'],
                'enable_email_footer' => $settings['enable_email_footer'],
                'footer_text' => $settings['footer_text'],
                'reviewers_name_format' => $settings['reviewers_name_format'],
                'auto_publish_new_reviews' => $settings['auto_publish_new_reviews'],
                'enable_review_notification' => $settings['enable_review_notification'],
                'review_notification_to' => $settings['review_notification_to'],
                'review_request_timing' => $settings['review_request_timing'],
                'order_status' => $settings['order_status']
            ],
        ];
    }
}