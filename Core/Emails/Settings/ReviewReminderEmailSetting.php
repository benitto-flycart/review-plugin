<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\Core\Models\EmailSetting;
use WC_Order;

class ReviewReminderEmailSetting extends Emails
{
    public $settings = [];
    public $placeholders = [];

    public function __construct($language)
    {
        $this->locale = $language;

        $reviewReminder = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::REVIEW_REMINDER_TYPE])
            ->first();

        if (empty($reviewReminder)) {
            $settings = $this->getDefaults($this->locale);
            $this->status = 'active';
        } else {
            $settings = $reviewReminder->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);

            $this->status = $reviewReminder->status;
        }

        $this->settings = $settings;
        $this->placeholders = $this->getPlaceHolders();
    }

    public function getBodyText()
    {
        return $this->settings['body'];
    }

    public function getPlaceHolders()
    {
        $data = [];

        $data['subject'] = 'Reminder: Order #[order_number], how did it go?';

        $data['body'] = "Hello [name]," .
            "\n \nWe would be grateful if you shared how things look and feel. Your review helps us and the community that supports us, and it only takes a few seconds.";

        $data['button_text'] = 'Write a Review';

        return $data;
    }

    public function getCustomerName(WC_Order $order)
    {
        return $order->get_billing_first_name();
    }


    public function getDefaults()
    {
        $data = [];

        $data['subject'] = "";

        $data['body'] = "";

        $data['button_text'] = "";

        return $data;
    }

    public function getBody()
    {
        return $this->getValue('body');
    }


    public function getSubject()
    {
        return $this->getValue('subject');
    }

    public function getButtonText()
    {
        return $this->getValue('button_text');
    }

    private function getValue(string $string)
    {
        if (isset($this->settings[$string]) && !empty($this->settings[$string])) {
            return $this->settings[$string];
        }

        return $this->placeholders[$string] ?? '';
    }

    public function getTemplatePreview()
    {
        static::$forPreview = true;
        //get_sample_order_data
        $order = $this->getSampleOrderData();
        $file = '';

        $brandSettings = new BrandSettings;

        $generalSettings = new GeneralSettings;

        $styles = $this->getDefaultStyles();

        $discountReminder = $this;

        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'discountReminder' => $discountReminder,
            'styles' => $styles
        ];

        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/review-reminder.php';

        $shop_page_url = WC::getShopPageURL();

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => $order->get_billing_email(),
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{body}' => $discountReminder->getBody(),
            '{button_text}' => $discountReminder->getButtonText(),
            '{footer_text}' => $generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
            '{shop_page_url}' => $shop_page_url,
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_reminder_email_short_codes', $short_codes);

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
