<?php

namespace Flycart\Review\Core\Emails\Settings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\Transient;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\Core\Models\SettingsModel;

abstract class Emails
{
    public $status;
    public $locale;

    public static $forPreview = false;

    public $settings = [];

    public $placeholders = [];

    public $statuses = [];

    public $email_type;

    abstract public function getPlaceHolders();

    public function init()
    {
        $settings = $this->retrieveSettings();

        $this->settings = $settings;
        $this->placeholders = $this->getPlaceHolders();
    }

    public function retrieveSettings()
    {
        $transient_key = $this->getTransientKey();

        if (Transient::getTransient($transient_key)) {
            return Transient::getTransient($transient_key);
        }

        $previous = SettingsModel::query()
            ->where("language = %s", [$this->locale])
            ->where("type = %s", [SettingsModel::EMAIL_TYPE])
            ->where("sub_type = %s", [$this->email_type])
            ->first();

        if (empty($previous)) {
            $settings =  $this->getDefaults($this->locale);
        } else {
            $settings = $previous->settings;
            $settings = $this->settingsAsArray($settings);
        }

        Transient::setTransient($transient_key, $settings);

        return $settings;
    }


    public function getStatus()
    {
        return $this->status;
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public static function make($language)
    {
        return new static($language);
    }


    public function getTemplatePreview()
    {
        return __('Template Preview', 'flycart-review');
    }

    public function getSampleOrderData()
    {
        global $wpdb;

        if (WC::isHPOSEnabled()) {
            // Query the database for the first WooCommerce order in the HPOS table
            $order_id = $wpdb->get_var("
                SELECT id 
                FROM {$wpdb->prefix}wc_orders 
                ORDER BY date_created_gmt ASC 
                LIMIT 1
            ");
        } else {
            $order_id = $wpdb->get_var(
                "
            SELECT ID 
            FROM {$wpdb->posts} 
            WHERE post_type = 'shop_order' 
            ORDER BY post_date ASC 
                LIMIT 1"
            );
        }

        //find the first order from the DB using wc_get_order
        $woo_order = wc_get_order($order_id);

        if ($woo_order) {
            return $woo_order;
        } else {
            return new \WC_Order();
        }
    }

    public static function isTemplatePreviewRequest()
    {
        return static::$forPreview;
    }

    public function getSettings()
    {
        $settings = [];

        //add annoation for hiding the following line error        
        $placeholders = $this->getPlaceHolders();

        foreach ($placeholders as $key => $value) {
            if (isset($this->settings[$key]) && !empty($this->settings[$key])) {
                $settings[$key] = $this->settings[$key];
            } else {
                $settings[$key] = '';
            }
        }

        return $settings;
    }

    public function getDefaultStyles(BrandSettings $brandSettings)
    {
        $appearance = $brandSettings->getAppearanceOptions();
        //var_dump($appearance);
        return [
            'email_bg_color' => $appearance['email_background_color'],
            'email_content_bg_color' => $appearance['content_background_color'],
            'email_text_color' => $appearance['email_text_color'],
            'button_bg_color' => $appearance['button_bg_color'],
            'button_text_color' => $appearance['button_title_color'],
            'button_border_color' => $appearance['button_border_color'],
        ];
    }

    protected function getValue(string $string)
    {
        if (isset($this->settings[$string]) && !empty($this->settings[$string])) {
            $value =  $this->settings[$string];
        } else {
            $value =  $this->placeholders[$string] ?? '';
        }

        return $this->formatValue($value);
    }

    private function formatValue($value)
    {
        return nl2br($value);
    }

    public function settingsAsArray($settings)
    {
        if (is_array($settings)) return $settings;

        return Functions::jsonDecode($settings);
    }

    public function getCurrentLocaleStatues($settings)
    {
        if (!empty($settings['emails'])) {
            $emails_settings = $settings['emails'];
            if (!empty($emails_settings[$this->locale])) {
                $current_locale_emails_settings = $emails_settings[$this->locale];
                return $current_locale_emails_settings;
            }
        }

        return [];
    }

    public function saveSettings($data)
    {
        $previous = SettingsModel::query()
            ->where(
                "language = %s AND type = %s AND sub_type = %s",
                [
                    $this->locale,
                    SettingsModel::EMAIL_TYPE,
                    $this->email_type
                ]
            )
            ->first();

        if (empty($previous)) {
            $updated = SettingsModel::query()->create([
                'type' => SettingsModel::EMAIL_TYPE,
                'sub_type' => $this->email_type,
                'language' => $this->locale,
                'settings' => Functions::jsonEncode($data),
            ]);
        } else {
            $updated = SettingsModel::query()->update([
                'type' => SettingsModel::EMAIL_TYPE,
                'sub_type' => $this->email_type,
                'settings' => Functions::jsonEncode($data),
            ], [
                'language' => $this->locale,
            ]);
        }

        return $updated;
    }

    public function getTransientKey()
    {
        return 'flycart_review_email_settings_' . $this->email_type . '_' . $this->locale;
    }
}
