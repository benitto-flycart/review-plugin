<?php

namespace Flycart\Review\Core\Emails\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\SettingsModel;

class ReviewRequest extends Emails
{
    public function __construct($language)
    {
        $this->locale = $language;
        $this->email_type = SettingsModel::EMAIL_REVIEW_REQUEST_TYPE;
        $this->init();
    }

    public function getPlaceHolders()
    {
        $data = [];

        $data['subject'] = 'Order #[order_number], how did it go?';

        $data['body'] = "Hello [name]," .
            "\n \nWe would be grateful if you shared how things look and feel. Your review helps us and the community that supports us, and it only takes a few seconds.";

        $data['button_text'] = 'Write a Review';

        return $data;
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
        return stripslashes($this->getValue('body'));
    }

    public function getSubject()
    {
        return stripslashes($this->getValue('subject'));
    }

    public function getButtonText()
    {
        return stripslashes($this->getValue('button_text'));
    }

    public function getTemplatePreview()
    {
        static::$forPreview = true;
        //get_sample_order_data
        $order = $this->getSampleOrderData();
        $file = '';

        $brandSettings = (new BrandSettings);

        $generalSettings = (new GeneralSettings);

        $reviewRequest = new ReviewRequest(get_locale());
        $styles = $this->getDefaultStyles($brandSettings);
        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'reviewRequest' => $reviewRequest,
            'styles' => $styles
        ];

        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/review-request.php';

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => $customer_billing_email = $order->get_billing_email(),
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{body}' => $this->replaceCustomeEmailPlaceholders($reviewRequest->getBody(), $order),
            '{button_text}' => $this->replaceCustomeEmailPlaceholders($reviewRequest->getButtonText(), $order),
            '{footer_text}' => $generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_request_email_short_codes', $short_codes);

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
