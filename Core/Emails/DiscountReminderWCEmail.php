<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use WC_Email;
use WC_Order;

class DiscountReminderWCEmail extends WC_Email
{
    public WC_Order $woo_order;
    public BrandSettings $brandSettings;
    public GeneralSettings $generalSettings;
    public  ReviewRequest  $reviewRequest;

    public function __construct()
    {
        // Email slug we can use to filter other data.
        $this->id = 'discount_reminder_wc_email';
        $this->title = __('Discount Reminder WC Email', 'flycart-review');
        $this->description = __('An Email Send for to remind the discount usage', 'flycart-review');
        $this->heading = __("[{site_title}] Discount Reminder!", 'flycart-review');

        $this->subject = __("[{site_title}] - Discount Reminder", 'flycart-review');

        // Template paths.
        $this->template_html = 'discount-reminder.php';
        $this->customer_email = true;
        $this->template_plain = 'plain/discount-reminder.php';
        parent::__construct();

        $this->template_base = F_Review_PLUGIN_PATH . 'Core/Emails/views/';

        // Action to which we hook onto to send the email.
    }

    public function trigger($data)
    {
        $html = $this->get_content();

        $short_codes = [];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_request_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        $this->send('benitto@cartrabbit.in', $this->get_subject(), $html, $this->get_headers(), $this->get_attachments());
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
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
        ), '', $this->template_base);
    }
}
