<?php

namespace Flycart\Review\Core\Emails;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\Core\Emails\Settings\DiscountNotifySetting;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\OrderReview;
use WC_Email;
use WC_Order;

class DiscountNotifyEmail extends WC_Email
{
    public WC_Order $woo_order;
    public BrandSettings $brandSettings;
    public GeneralSettings $generalSettings;
    public  DiscountNotifySetting $discountNotify;

    public function __construct()
    {
        // Email slug we can use to filter other data.
        $this->id = 'discount_reminder_wc_email';
        $this->title = __('Discount Notifiy WC Email', 'flycart-review');
        $this->description = __('An Email Send for to remind the discount usage', 'flycart-review');
        $this->heading = __("[{site_title}] Discount Notify!", 'flycart-review');

        $this->subject = __("[{site_title}] - Discount Notify", 'flycart-review');

        // Template paths.
        $this->template_html = 'discount-notify.php';
        $this->customer_email = true;
        $this->template_plain = 'plain/discount-notify.php';
        parent::__construct();

        $this->template_base = F_Review_PLUGIN_PATH . 'Core/Emails/views/';

        // Action to which we hook onto to send the email.
    }

    public function trigger($data)
    {
        $notification_id = $data['notification_id'] ?? '';
        $order_review_id = $data['order_review_id'] ?? '';

        $notification = NotificationHistory::query()->find($notification_id);

        if (empty($notification) || NotificationHistory::isAlreadySent($notification->status)) {
            return;
        }

        $orderReview = OrderReview::query()->find($order_review_id);

        $this->woo_order = wc_get_order($notification->order_id);

        if (empty($this->woo_order)) {
            return;
        }

        $this->brandSettings = new BrandSettings();
        $this->generalSettings = new GeneralSettings();
        $this->discountNotify = new DiscountNotifySetting(get_locale());

        $html = $this->get_content();

        $shop_page_url = WC::getShopPageURL();

        $short_codes = [
            '{email}' => $customer_billing_email = $this->woo_order->get_billing_email(),
            '{logo_src}' => $this->brandSettings->getLogoSrc(),
            '{banner_src}' => $this->brandSettings->getEmailBanner(),
            '{customer_name}' => $this->discountNotify->getCustomerName($this->woo_order),
            '{body}' => $this->discountNotify->getBody($this->woo_order),
            '{button_text}' => $this->discountNotify->getBody($this->woo_order),
            '{footer_text}' => $this->generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
            '{shop_page_url}' => $shop_page_url,
            '{discount_code}' => $orderReview->photo_discount_code,
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_discount_notify_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        //TODO: Update the Email
        $this->send($customer_billing_email, $this->get_subject(), $html, $this->get_headers(), $this->get_attachments());

        if (\ActionScheduler::is_initialized()) {

            NotificationHistory::query()->create([
                'model_id' => $this->woo_order->get_id(),
                'model_type' => 'shop_order',
                'order_id' => $this->woo_order->get_id(),
                'status' =>  'pending',
                'notify_type' => EmailSetting::DISCOUNT_REMINDER_TYPE,
                'medium' => NotificationHistory::MEDIUM_EMAIL,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $notificationHistoryId = NotificationHistory::query()->lastInsertedId();

            $delay = $this->generalSettings->getDiscountNotifyDelay();

            $delay = PluginHelper::getStrTimeString($delay, 'days');

            //Add Option in Settings Page when to send review
            $hook_name = F_Review_PREFIX . 'send_discount_reminder_email';

            as_schedule_single_action(strtotime("+{$delay}"), $hook_name, [['notification_id' => $notificationHistoryId]]);
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
            'email_heading' => $this->get_heading(),
            'sent_to_admin' => false,
            'plain_text' => $plain_text,
            'email' => $this,
            'brandSettings' => $this->brandSettings,
            'generalSettings' => $this->generalSettings,
            'discountNotify' => $this->discountNotify,
            'data' => [
                'styles' => $this->discountNotify->getDefaultStyles($this->brandSettings),
            ]
        ), '', $this->template_base);
    }
}
