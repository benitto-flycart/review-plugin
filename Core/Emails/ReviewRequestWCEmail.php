<?php

namespace Flycart\Review\Core\Emails;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\SettingsModel;
use WC_Email;
use WC_Order;

class ReviewRequestWCEmail extends WC_Email
{
    public WC_Order $woo_order;
    public BrandSettings $brandSettings;
    public GeneralSettings $generalSettings;
    public  ReviewRequest  $reviewRequest;

    public function __construct()
    {
        // Email slug we can use to filter other data.
        $this->id = 'flycart_review_review_request_email';
        $this->title = __('Review Request Email', 'flycart-review');
        $this->description = __('An Email Send to request review', 'flycart-review');
        $this->heading = __("[{site_title}] Add Review!", 'flycart-review');

        #It will be overrided below
        $this->subject = __("[{site_title}] - Add Review", 'flycart-review');

        // Template paths.
        $this->template_html = 'review-request.php';
        $this->customer_email = true;

        $this->template_plain = 'plain/review-request.php';

        parent::__construct();

        $this->template_base = F_Review_PLUGIN_PATH . 'Core/Emails/views/';

        // Action to which we hook onto to send the email.
    }

    public function trigger($data)
    {
        $notification_id = $data['notification_id'] ?? '';

        $notification = NotificationHistory::query()->find($notification_id);

        if (empty($notification) || !NotificationHistory::isReviewRequestType($notification->notify_type) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $this->brandSettings = (new BrandSettings);

        $this->generalSettings = (new GeneralSettings);

        $this->reviewRequest = new ReviewRequest(get_locale());

        $this->woo_order = wc_get_order($notification->model_id);

        $this->subject = $this->reviewRequest->replaceCustomeEmailPlaceholders($this->reviewRequest->getSubject(), $this->woo_order);

        $html = $this->get_content();

        $short_codes = [
            '{email}' => $customer_billing_email = $this->woo_order->get_billing_email(),
            '{logo_src}' => $this->brandSettings->getLogoSrc(),
            '{banner_src}' => $this->brandSettings->getEmailBanner(),
            '{body}' => $this->reviewRequest->replaceCustomeEmailPlaceholders($this->reviewRequest->getBody(), $this->woo_order),
            '{button_text}' => $this->reviewRequest->replaceCustomeEmailPlaceholders($this->reviewRequest->getButtonText(), $this->woo_order),
            '{footer_text}' => $this->generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_request_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        $this->send($customer_billing_email, $this->get_subject(), $html, $this->get_headers(), $this->get_attachments());

        NotificationHistory::query()->update([
            'notification_content' => $html,
            'status' => NotificationHistory::SUCCESS,
        ], [
            'id' => $notification_id
        ]);

        do_action(F_Review_PREFIX . 'mark_review_request_email_as_success', $this->woo_order);

        $inSeconds = $this->generalSettings->getReviewReminderDelay();

        if (\ActionScheduler::is_initialized()) {
            NotificationHistory::query()->create([
                'model_id' => $this->woo_order->get_id(),
                'model_type' => 'shop_order',
                'order_id' => $this->woo_order->get_id(),
                'status' =>  'pending',
                'notify_type' => SettingsModel::EMAIL_REVIEW_REMINDER_TYPE,
                'medium' => NotificationHistory::MEDIUM_EMAIL,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $notificationHistoryId = NotificationHistory::query()->lastInsertedId();

            //Add Option in Settings Page when to send review
            $hook_name = F_Review_PREFIX . 'send_review_reminder_email';
            $time = PluginHelper::getStrTimeString($inSeconds, 'day');
            as_schedule_single_action(strtotime("+$time"), $hook_name, [['notification_id' => $notificationHistoryId]]);
        }
    }

    public function get_content_html()
    {
        return $this->get_content_string();
    }

    public function get_content_plain()
    {
        return $this->get_content_string(true);
    }

    public function get_content_string($plain_text = false)
    {

        return wc_get_template_html($this->template_plain, array(
            'order' => $this->woo_order,
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
            'brandSettings' => $this->brandSettings,
            'generalSettings' => $this->generalSettings,
            'reviewRequest' => $this->reviewRequest,
            'data' => [
                'styles' => $this->reviewRequest->getDefaultStyles($this->brandSettings),
            ]
        ), '', $this->template_base);
    }
}
