<?php

namespace Flycart\Review\Core\Emails\Settings;

use Flycart\Review\App\Helpers\ReviewSettings\BrandSettings;
use Flycart\Review\App\Helpers\WC;

/*
 * @see
*/

abstract class Emails
{
    public $status;
    public $locale;
    public static $forPreview = false;

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
}
