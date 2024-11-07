<?php

namespace Flycart\Review\App\Helpers;

use WC_Order;

class Product
{
    public static function getProductImageForEmail($product)
    {
        if (defined('F_Review_PLUGIN_IN_DEV_MODE') && F_Review_PLUGIN_IN_DEV_MODE)
            return 'https://unsplash.it/150/150';
        // return F_Review_PLUGIN_URL . 'resources/images/product-sample.png';

        $product_image_id = $product->get_image_id();
        $image_data = wp_get_attachment_image_src($product_image_id, 'woocommerce_thumbnail');

        return $image_data[0] ?? '';
    }
}
