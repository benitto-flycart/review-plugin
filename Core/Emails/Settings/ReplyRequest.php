<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\App\Helpers\AssetHelper;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\EmailSetting;

class ReplyRequest extends Emails
{
    public function __construct($language)
    {
        $this->locale = $language;

        $replyRequest = EmailSetting::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [EmailSetting::REPLY_REQUEST_TYPE])
            ->first();

        if (empty($replyRequest)) {
            $settings = $this->getDefault($this->locale);
            $this->status = 'active';
        } else {
            $settings = $replyRequest->settings;
            $settings = EmailSetting::getReviewSettingsAsArray($settings);

            $this->status = $replyRequest->status;
        }
        $this->settings = $settings;

        $this->placeholders = $this->getPlaceHolders();
    }

    public function getBody()
    {
        return $this->getValue('body');
    }

    public function getSubject()
    {
        return $this->getValue('subject');
    }


    public function getPlaceHolders()
    {
        $data['subject'] = 'In response to your review of [product]';
        $data['body'] = "Hello [name],\n\nA reply was added to your review of [product]: \n\n[reply_content]\n\nTo respond privately, reply to this email";

        return $data;
    }

    public function getDefault()
    {
        $data['body'] = "";

        $data['subject'] = '';

        return $data;
    }

    public function getTemplatePreview()
    {
        static::$forPreview = true;

        $order = $this->getSampleOrderData();

        $brandSettings = (new BrandSettings);

        $generalSettings = (new GeneralSettings);

        $styles = $this->getDefaultStyles($brandSettings);
        $file = F_Review_PLUGIN_PATH . '/Core/Emails/views/review-reply.php';

        $replyRequest = $this;

        $data = [
            'order' => $order,
            'brandSettings' => $brandSettings,
            'generalSettings' => $generalSettings,
            'replyRequest' => $replyRequest,
            'styles' => $styles
        ];

        $html =  AssetHelper::renderTemplate($file, $data);

        $short_codes = [
            '{email}' => '',
            '{logo_src}' => $brandSettings->getLogoSrc(),
            '{banner_src}' => $brandSettings->getEmailBanner(),
            '{customer_name}' => '',
            '{body}' => $this->getBody(),
            '{footer_text}' => $generalSettings->getFooterText(),
            '{unsubscribe_link}' => 'https://localhost:8004',
        ];

        $short_codes = apply_filters(F_Review_PREFIX . 'review_reply_email_short_codes', $short_codes);

        foreach ($short_codes as $short_code => $short_code_value) {
            $html = str_replace($short_code, $short_code_value, $html);
        }

        static::$forPreview = false;

        return $html;
    }
}
