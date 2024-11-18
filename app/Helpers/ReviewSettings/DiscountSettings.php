<?php

namespace Flycart\Review\App\Helpers\ReviewSettings;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\ReviewSetting;
use Flycart\Review\Core\Models\SettingsModel;

class DiscountSettings extends ReviewSettings
{
    public $discountSettings = [];

    public function __construct()
    {
        $this->settings_type = SettingsModel::DISCOUNT_SETTINGS;

        $discount_settings = SettingsModel::query()
            ->where("type = %s AND sub_type = %s", [SettingsModel::SETTINGS_TYPE, $this->settings_type])
            ->first();

        $data = Functions::jsonDecode($discount_settings->settings ?? '{}');

        $this->discountSettings = $this->mergeWithDefault($data);
    }

    public function get()
    {
        return $this->mergeWithDefault($this->discountSettings);
    }

    public function mergeWithDefault($settings)
    {
        return [
            'enable_photo_discount' => $settings['enable_photo_discount'] ?? false,
            'photo_discount_type' => $settings['photo_discount_type'] ?? 'fixed_cart',
            'photo_discount_value' => $settings['photo_discount_value'] ?? 0,
            'photo_discount_expiry_in_days' => $settings['photo_discount_expiry_in_days'] ?? 0,
        ];
    }

    public function getFromRequest($request)
    {
        $photo_discount_enabled = Functions::getBoolValue($request->get('enable_photo_discount'));

        $data = [
            'enable_photo_discount' => $photo_discount_enabled,
            'photo_discount_type' => $photo_discount_enabled ? $request->get('photo_discount_type') : 'fixed_cart',
            'photo_discount_value' => $photo_discount_enabled ? $request->get('photo_discount_value') : 0,
            'photo_discount_expiry_in_days' => $photo_discount_enabled ? $request->get('photo_discount_expiry_in_days') : '',
        ];

        return $this->mergeWithDefault($data);
    }

    public function isPhotoDiscountEnabled()
    {
        return $this->discountSettings['enable_photo_discount'];
    }

    public function isVideoDiscountEnabled()
    {
        return $this->discountSettings['enable_video_discount'];
    }

    public function photoDiscountString()
    {
        $discount_type = $this->discountSettings['photo_discount_type'];
        $discount_value = $this->discountSettings['photo_discount_value'];

        $label = '';

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

    public function getPhotoDiscountValue()
    {
        return $this->discountSettings['photo_discount_value'];
    }

    public function getPhotoDiscountType()
    {
        return $this->discountSettings['photo_discount_type'];
    }

    public function getPhotoDiscountExpiryDate()
    {
        $value =  $this->discountSettings['photo_discount_expiry_in_days'];

        if (empty($value)) {
            return -1;
        }

        return $this->discountSettings['photo_discount_expiry_in_days'];
    }

    public function generateCoupon($review_id, $for = 'photo')
    {
        $comment = get_comment($review_id);

        $discount_value = $this->getPhotoDiscountValue();
        $discount_type = $this->getPhotoDiscountType();

        $discount_type = strtolower($discount_type) == 'fixed' ? 'fixed_cart' : 'percent';

        $expiryInDays = $this->getPhotoDiscountExpiryDate();

        $prefix_coupon = apply_filters('frap_test_review_prefix_for_discount_coupon', 'REVIEW-DIS-');
        $coupon_code = $prefix_coupon . Functions::generateRandomString(10);
        $coupon = new \WC_Coupon();
        $coupon->set_code($coupon_code);
        $coupon->set_discount_type($discount_type);
        $coupon->set_amount($discount_value);
        $coupon->set_individual_use(true);
        $coupon->set_date_expires($expiry_date = gmdate('Y-m-d', strtotime("+{$expiryInDays} days")));
        $coupon->set_free_shipping(false);
        $coupon->set_product_ids([]);
        $coupon->set_excluded_product_ids([]);
        $coupon->set_product_categories([]);
        $coupon->set_excluded_product_categories([]);
        $coupon->set_minimum_amount('');
        $coupon->set_maximum_amount('');
        $coupon->set_email_restrictions([]);
        $coupon->set_description('Discount coupon for review');
        $coupon->save();

        //set coupon meta review_id 
        $coupon->update_meta_data('review_id', $review_id);
        $coupon->update_meta_data('comment_post_ID', $comment->comment_post_ID);

        return [$coupon_code, $expiry_date];
    }
}
