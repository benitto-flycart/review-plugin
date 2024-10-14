<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Emails\Settings\PhotoRequest;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use Flycart\Review\Core\Models\NotificationHistory;
use WC_Email;
use WC_Order;
use WC_Product;

class PhotoRequestWCEmail extends WC_Email
{
    public WC_Order $woo_order;
    public WC_Product $product;
    public BrandSettings $brandSettings;
    public GeneralSettings $generalSettings;
    public  PhotoRequest  $photoRequest;

    public function __construct()
    {
        // Email slug we can use to filter other data.
        $this->id = 'photo_request_wc_email';
        $this->title = __('Review Photo Request Email', 'flycart-review');
        $this->description = __('An Email Send to photo request review', 'flycart-review');
        $this->heading = __("[{site_title}] Add Photo!", 'flycart-review');

        $this->subject = __("[{site_title}] - Add Photo", 'flycart-review');

        // Template paths.
        $this->template_html = 'photo-request.php';
        $this->customer_email = true;

        $this->template_plain = 'plain/photo-request.php';
        parent::__construct();

        $this->template_base = F_Review_PLUGIN_PATH . 'Core/Emails/views/';

        // Action to which we hook onto to send the email.
    }

    public function trigger($data)
    {
        $notification_id = $data['notification_id'] ?? '';
        $product_id = $data['product_id'] ?? '';

        $this->product = wc_get_product($product_id);

        if (!$this->product instanceof \WC_Product) {
            error_log('unable to get product');
            return false;
        }

        error_log('executing phot');

        $notification = NotificationHistory::query()->find($notification_id);

        if (empty($notification) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $this->brandSettings = (new BrandSettings);
        $this->generalSettings = (new GeneralSettings);

        $this->photoRequest =  new PhotoRequest(get_locale());

        $this->woo_order = wc_get_order($notification->order_id);

        if (empty($notification) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $html = $this->get_content();


        $short_codes = [

            '{{email}}' => $customer_billing_email = $this->woo_order->get_billing_email(),
            '{logo_src}' => $this->brandSettings->getLogoSrc(),
            '{banner_src}' => $this->brandSettings->getEmailBanner(),
            '{body}' => $this->photoRequest->getBody($this->woo_order),
            '{footer_text}' => $this->generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
            '{review_link}' => \Flycart\Review\App\Helpers\PluginHelper::getReviewLink($this->woo_order, $product_id),
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_photo_request_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        $this->send('benitto@cartrabbit.in', $this->get_subject(), $html, $this->get_headers(), $this->get_attachments());

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

        return wc_get_template_html($this->template_plain, array(
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
            'brandSettings' => $this->brandSettings,
            'generalSettings' => $this->generalSettings,
            'order' => $this->woo_order,
            'product' => $this->product,
            'photoRequest' => $this->photoRequest,
        ), '', $this->template_base);
    }


    public function markNotificationAsFailed($notification_id, $data = [])
    {
        NotificationHistory::query()->update([
            'status' => NotificationHistory::FAILED,
            'extra' => Functions::jsonEncode($data)
        ], [
            'id' => $notification_id
        ]);
    }
}
