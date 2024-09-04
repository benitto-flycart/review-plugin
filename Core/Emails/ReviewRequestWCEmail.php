<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\Core\Models\NotificationHistory;
use WC_Email;

class ReviewRequestWCEmail extends WC_Email
{
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
        $html = $this->get_content();

        $short_codes = [
            '{{email}}' => 'benitto@cartrabbit.in',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_request_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

//        NotificationHistory::

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
        $brandSettings = (new BrandSettings());

        return wc_get_template_html($this->template_plain, array(
            'order' => $this->object,
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
            'brandSettings' => $brandSettings,
        ), '', $this->template_base);
    }
}