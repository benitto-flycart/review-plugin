<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\EmailSetting;
use WC_Order;

class DiscountNotifySetting extends Emails
{
    public $settings = [];

    public $placeholders = [];

    public function __construct($language)
    {
        $this->locale = $language;

        $discountEmail = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::DISCOUNT_NOTIFY_TYPE])
            ->first();

        if (empty($discountEmail)) {
            $settings = $this->getDefaults($this->locale);
            $this->status = 'active';
        } else {
            $settings = $discountEmail->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);

            $this->status = $discountEmail->status;
        }

        $this->settings = $settings;
        $this->placeholders = $this->getPlaceHolders();
    }

    private function getValue(string $string)
    {
        if (isset($this->settings[$string]) && !empty($this->settings[$string])) {
            return $this->settings[$string];
        }

        return $this->placeholders[$string] ?? '';
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



    private function getDefaults()
    {
        $data['body'] = "";

        $data['subject'] = "";

        $data['button_text'] = '';

        return $data;
    }

    public  function getPlaceHolders()
    {
        $data['body'] = "Hello [name]," .
            "\n \nThank you for sharing your experience!" .
            "\n \n Use the following discount code for [discount] off your next purchase at [client]!";

        $data['subject'] = "Your discount code at [client]";

        $data['button_text'] = 'Shop now';

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

        $styles = $this->getDefaultStyles();
        $discountNotify = $this;

        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'discountNotify' => $discountNotify,
            'styles' => $styles
        ];

        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/discount-notify.php';

        if (file_exists($file)) {
            error_log('file present');
        }

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => $order->get_billing_email(),
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{body}' => $this->replaceCustomeEmailPlaceholders($discountNotify->getBody(), $order),
            '{button_text}' => $this->replaceCustomeEmailPlaceholders($discountNotify->getButtonText(), $order),
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

    public function replaceCustomeEmailPlaceholders($content, \WC_Order $wooOrder)
    {
        return str_replace([
            "[order_number]",
            "[name]",
            "[first_name]",
            "[last_name]"
        ], [
            $wooOrder->get_id(),
            $wooOrder->get_formatted_billing_full_name(),
            $wooOrder->get_billing_first_name(),
            $wooOrder->get_billing_last_name(),
        ], $content);
    }
}
