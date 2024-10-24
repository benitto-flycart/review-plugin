<?php

namespace Flycart\Review\App\Helpers\ReviewSettings;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\Core\Models\ReviewSetting;

class DiscountSettings extends ReviewSettings
{
    public $discountSettings = [];

    public function __construct()
    {
        $brand_setting = ReviewSetting::query()
            ->where("meta_key = %s", [ReviewSetting::DISCOUNT_SETTINGS])
            ->first();

        $data = Functions::jsonDecode($brand_setting->meta_value ?? '{}');

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
            'photo_discount_type' => $settings['photo_discount_type'] ?? 'fixed',
            'photo_discount_value' => $settings['photo_discount_value'] ?? 0,
            'enable_video_discount' => $settings['enable_video_discount'] ?? false,
            'video_discount_type' => $settings['video_discount_type'] ?? 'fixed',
            'video_discount_value' => $settings['video_discount_value'] ?? 0,
        ];
    }

    public function getFromRequest($request)
    {
        $photo_discount_enabled = Functions::getBoolValue($request->get('enable_photo_discount'));
        $video_discount_enabled = Functions::getBoolValue($request->get('enable_video_discount'));

        $data = [
            'enable_photo_discount' => $photo_discount_enabled,
            'photo_discount_type' => $photo_discount_enabled ? $request->get('photo_discount_type') : 'fixed',
            'photo_discount_value' => $photo_discount_enabled ? $request->get('photo_discount_value') : 0,
            'enable_video_discount' => $video_discount_enabled,
            'video_discount_type' => $video_discount_enabled ? $request->get('video_discount_type') : 'fixed',
            'video_discount_value' => $video_discount_enabled ? $request->get('video_discount_value') : 0,
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

        if ($discount_type == 'fixed') {
            $label = get_woocommerce_currency_symbol() . ' Fixed';
        } else {
            $label = '% Percentage';
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
        return $this->discountSettings['photo_discount_expiry_date'] ?? '-1';
    }

    public function generateCoupon($review_id, $for = 'photo')
    {
        $comment = get_comment($review_id);

        $discount_value = $this->getPhotoDiscountValue();
        $discount_type = $this->getPhotoDiscountType();

        $discount_type = strtolower($discount_type) == 'fixed' ? 'fixed_cart' : 'percent';

        $expiryInDays = $this->getPhotoDiscountExpiryDate();

        $prefix_coupon = apply_filters('frap_test_review_prefix_for_discount_coupon', 'REVIW_DIS_');
        $coupon_code = $prefix_coupon . Functions::generateRandomString(10);
        $coupon = new \WC_Coupon();
        $coupon->set_code($coupon_code);
        $coupon->set_discount_type($discount_type);
        $coupon->set_amount($discount_value);
        $coupon->set_individual_use(true);
        $coupon->set_date_expires(gmdate('Y-m-d', strtotime("+{$expiryInDays} days")));
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

        return $coupon_code;
    }
}
