<?php

namespace Flycart\Review\App\Helpers\ReviewSettings;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\ReviewSetting;

class BrandSettings extends ReviewSettings
{
    public $brandSettings = [];

    public function __construct()
    {
        $brand_setting = ReviewSetting::query()
            ->where("meta_key = %s", [ReviewSetting::BRAND_SETTINGS])
            ->first();

        $data = Functions::jsonDecode($brand_setting->meta_value);

        $this->brandSettings = $this->mergeWithDefault($data);
    }

    public function get()
    {
        return $this->mergeWithDefault($this->brandSettings);
    }

    public function mergeWithDefault($settings)
    {
        return [
            'corner_radius' => $settings['corner_radius'] ?? '',
            'enable_logo' => Functions::getBoolValue($settings['enable_logo']) ?? false,
            'logo_url' => $settings['logo_url'] ?? '',
            'rating_icon' => $settings['rating_icon'] ?? '',
            'enable_review_branding' => Functions::getBoolValue($settings['enable_review_branding']) ?? false,
            'enable_email_banners' => $settings['enable_email_banners'] ?? false,
            'banner_src' => $settings['banner_src'] ?? '',
            'rating_rgb_color' => $settings['rating_rgb_color'] ?? '',
            'appearance' => $appearance = $settings['appearance'] ?? 'default',
            'appearance_options' => $appearance ? [
                'email_background_color' => $settings['appearance_options']['email_background_color'] ?? '',
                'content_background_color' => $settings['appearance_options']['content_background_color'] ?? '',
                'email_text_color' => $settings['appearance_options']['email_text_color'] ?? '',
                'button_bg_color' => $settings['appearance_options']['button_bg_color'] ?? '',
                'button_border_color' => $settings['appearance_options']['button_border_color'] ?? '',
                'button_title_color' => $settings['appearance_options']['button_title_color'] ?? '',
                'font_type' => $settings['appearance_options']['font_type'] ?? '',
                'font_size' => $settings['appearance_options']['font_size'] ?? '',
            ] : [],
        ];
    }

    public function getEmailBgColor()
    {
        return $this->brandSettings['appearance_options']['email_background_color'] ?? '#fff';
    }

    public function getContentBGColor()
    {
        return $this->brandSettings['appearance_options']['email_background_color'] ?? '#fff';
    }

    public function getIcon()
    {
        return $this->brandSettings['rating_icon'];
    }

    public function getFromRequest($request)
    {
        $data = [
            'corner_radius' => $request->get('corner_radius'),
            'enable_logo' => Functions::getBoolValue($request->get('enable_logo')),
            'logo_url' => $request->get('logo_url'),
            'rating_icon' => $request->get('rating_icon'),
            'enable_review_branding' => $request->get('enable_review_branding'),
            'enable_email_banners' => Functions::getBoolValue($request->get('enable_email_banners')),
            'banner_src' => $request->get('banner_src'),
            'rating_rgb_color' => $request->get('rating_rgb_color'),
            'appearance' => $customAppearance = $request->get('appearance'),
            'appearance_options' => $customAppearance ? [
                'email_background_color' => $request->get('appearance_options.email_background_color'),
                'content_background_color' => $request->get('appearance_options.content_background_color'),
                'email_text_color' => $request->get('appearance_options.email_text_color'),
                'button_bg_color' => $request->get('appearance_options.button_bg_color'),
                'button_border_color' => $request->get('appearance_options.button_border_color'),
                'button_title_color' => $request->get('appearance_options.button_title_color'),
                'font_type' => $request->get('appearance_options.font_type'),
                'font_size' => $request->get('appearance_options.font_size'),
            ] : [],
        ];

        return $this->mergeWithDefault($data);
    }

    public function isEmailBannerEnabled()
    {
     return $this->brandSettings['enable_email_banners'];
    }

    public function getEmailBanner()
    {
        return $this->brandSettings['banner_src'];
    }

    public function isLogoEnabled()
    {
        return $this->brandSettings['enable_logo'];

    }

    public function getLogoSrc()
    {
        return $this->brandSettings['logo_url'];
    }
}