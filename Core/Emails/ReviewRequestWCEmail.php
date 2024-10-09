<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
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
        $this->id = 'review_request_email';
        $this->title = __('Review Request Email', 'flycart-review');
        $this->description = __('An Email Send to request review', 'flycart-review');
        $this->heading = __("[{site_title}] Add Review!", 'flycart-review');

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

        $this->woo_order = wc_get_order($notification->order_id);

        $short_codes = [
            '{{email}}' => $customer_billing_email = $this->woo_order->get_billing_email(),
        ];

        $html = $this->get_content();

        $short_codes = [
            '{logo_src}' => $this->brandSettings->getLogoSrc(),
            '{banner_src}' => $this->brandSettings->getEmailBanner(),
            '{customer_name}' => $this->reviewRequest->getCustomerName($this->woo_order),
            '{body}' => $this->reviewRequest->getBody($this->woo_order),
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
        $this->brandSettings = (new BrandSettings);
        $this->generalSettings = (new GeneralSettings);

        $this->reviewRequest = new ReviewRequest(get_locale());


        $this->woo_order->get_formatted_billing_full_name();

        return wc_get_template_html($this->template_plain, array(
            'order' => $this->woo_order,
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
            'brandSettings' => $this->brandSettings,
            'generalSettings' => $this->generalSettings,
            'reviewRequest' => $this->reviewRequest
        ), '', $this->template_base);
    }
}
