<?php

namespace Flycart\Review\Core\Emails\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\SettingsModel;

class PhotoRequest extends Emails
{
    public function __construct($language)
    {
        $this->locale = $language;
        $this->email_type = SettingsModel::EMAIL_PHOTO_REQUEST_TYPE;
        $this->init();
    }

    public function getDefaults()
    {
        $data['body'] = '';
        $data['discount_text'] = '';
        $data['minimum_star'] = '5';
        $data['subject'] = '';
        $data['button_text'] = '';

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


    public function getPlaceHolders()
    {
        $data['body'] = "Hello [name] \n\nWe wanted to thank you again for your review of [product]. \nPlease add your photo to the review and help our community of shopers!";
        $data['discount_text'] = 'Add a photo to the review and get a discount off your next purchase';
        $data['subject'] = 'Reminder: Add a photo to your review of [product]';
        $data['minimum_star'] = '5';
        $data['button_text'] = 'Add a photo';

        return $data;
    }

    public function getDiscountText()
    {
        return $this->getValue('discount_text');
    }

    public function getTemplatePreview()
    {
        static::$forPreview = true;
        //get_sample_order_data
        $order = $this->getSampleOrderData();

        $brandSettings = (new BrandSettings);

        $generalSettings = (new GeneralSettings);

        $styles = $this->getDefaultStyles($brandSettings);
        $photoRequest = $this;

        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'photoRequest' => $photoRequest,
            'styles' => $styles
        ];

        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/photo-request.php';

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => $order->get_billing_email(),
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{body}' => $photoRequest->getBody(),
            '{button_text}' => $photoRequest->getButtonText(),
            '{discount_text}' => $photoRequest->getDiscountText(),
            '{footer_text}' => $generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_photo_request_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        static::$forPreview = false;

        return $html;
    }


    public function replaceCustomeEmailPlaceholders($content, \WC_Product $product, \WC_Order $wooOrder)
    {
        return str_replace([
            "[order_number]",
            "[product]",
            "[name]",
            "[first_name]",
            "[last_name]"
        ], [
            $wooOrder->get_id(),
            $product->get_name(),
            $wooOrder->get_formatted_billing_full_name(),
            $wooOrder->get_billing_first_name(),
            $wooOrder->get_billing_last_name(),
        ], $content);
    }
}
