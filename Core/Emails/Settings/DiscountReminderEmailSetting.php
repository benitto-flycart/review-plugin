<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\EmailSetting;
use WC_Order;

class DiscountReminderEmailSetting extends Emails
{

    public function __construct($language)
    {
        $this->locale = $language;

        $discountReminder = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::DISCOUNT_REMINDER_TYPE])
            ->first();

        if (empty($discountReminder)) {
            $settings = $this->getDefaults($this->locale);
            $this->status = 'active';
        } else {
            $settings = $discountReminder->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);
            $this->status = $discountReminder->status;
        }

        $this->settings = $settings;
        $this->placeholders = $this->getPlaceHolders();
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



    public function getDefaults()
    {
        $data['body'] = '';

        $data['subject'] = '';

        $data['button_text'] = '';

        return $data;
    }

    public  function getPlaceHolders()
    {
        $data['subject'] = "Your discount code at [client]";

        $data['body'] = "Hello [name]," .
            "\n \nThank you for sharing your experience!" .
            "\n \n Use the following discount code for [discount] off your next purchase at [client]!";

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

        $styles = $this->getDefaultStyles($brandSettings);
        $discountReminder = $this;

        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'discountReminder' => $discountReminder,
            'styles' => $styles
        ];

        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/discount-reminder.php';

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => $order->get_billing_email(),
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{body}' => $this->replaceCustomeEmailPlaceholders($discountReminder->getBody(), $order),
            '{button_text}' => $this->replaceCustomeEmailPlaceholders($discountReminder->getButtonText(), $order),
            '{footer_text}' => $generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_discount_reminder_email_short_codes', $short_codes);

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
