<?php

namespace Flycart\Review\Core\Emails\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\DiscountSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\SettingsModel;
use WC_Coupon;
use WC_Order;

class DiscountNotifySetting extends Emails
{
    public $discount_coupon = null;

    public function __construct($language)
    {
        $this->locale = $language;
        $this->email_type = SettingsModel::EMAIL_DISCOUNT_REMINDER_TYPE;
        $this->init();
    }


    public function getSubject()
    {
        return $this->getValue('subject');
    }

    public function getBody()
    {
        return $this->getValue('body');
    }

    public function getButtonText()
    {
        return $this->getValue('button_text');
    }

    public function getCustomerName(WC_Order $order)
    {
        return $order->get_billing_first_name();
    }

    public function getDefaults()
    {
        $data['body'] = "";

        $data['subject'] = "";

        $data['button_text'] = '';

        return $data;
    }

    public  function getPlaceHolders()
    {
        $data["body"] = "Hello [name]," .
            "\n \nThank you for sharing your experience!" .
            "\n \n Use the following discount code for [discount] off your next purchase at [client]!" .
            "\n \n Your discount expires on [expires]";

        $data["subject"] = "Your discount code at [client]";

        $data["button_text"] = "Shop now";

        return $data;
    }

    public function getTemplatePreview()
    {
        static::$forPreview = true;
        //get_sample_order_data
        $order = $this->getSampleOrderData();
        $file = '';

        $brandSettings = (new BrandSettings);

        $generalSettings = (new GeneralSettings);

        $styles = $this->getDefaultStyles($brandSettings);
        $discountNotify = $this;

        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'discountNotify' => $discountNotify,
            'styles' => $styles
        ];

        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/discount-notify.php';

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => $order->get_billing_email(),
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{body}' => $discountNotify->getBody(),
            '{button_text}' => $discountNotify->getButtonText(),
            '{footer_text}' => $generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_discount_notify_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        static::$forPreview = false;

        return $html;
    }

    public function replaceCustomeEmailPlaceholders($content, \WC_Order $wooOrder, $discount_code)
    {
        return str_replace([
            "[order_number]",
            "[name]",
            "[first_name]",
            "[last_name]",
            "[client]",
            "[discount]",
            "[expires]"
        ], [
            $wooOrder->get_id(),
            $wooOrder->get_formatted_billing_full_name(),
            $wooOrder->get_billing_first_name(),
            $wooOrder->get_billing_last_name(),
            WC::getstoreName(),
            $this->getDiscountString($discount_code),
            $this->getDiscounExpires($discount_code)
        ], $content);
    }

    public function getDiscountString($discount_code)
    {
        if (empty($this->discount_coupon)) {
            $this->discount_coupon = new WC_Coupon($discount_code);
        }

        $discount_type = $this->discount_coupon->get_discount_type();
        $discount_value = $this->discount_coupon->get_amount();

        if ($discount_type == 'fixed_cart') {
            $label = get_woocommerce_currency_symbol() . ' Fixed';
        } else if ($discount_type == 'percent') {
            $label = '% Percentage';
        } else if ($discount_type == 'fixed_product') {
            $label = get_woocommerce_currency_symbol() . 'Fixed Product discount';
        }

        /* translators: placeholder description */
        return vsprintf(esc_html__('%s %s', 'f-review'), [$discount_value, $label]);
    }

    public function getDiscounExpires($discount_code)
    {
        if (empty($this->discount_coupon)) {
            $this->discount_coupon = new WC_Coupon($discount_code);
        }

        $date =  $this->discount_coupon->get_date_expires();

        if (!empty($date)) {
            return $date->format('Y-m-d');
        }

        return '';
    }
}
