<?php

namespace Flycart\Review\App\Helpers;

defined('ABSPATH') || exit;

use WC_Order;

class Order
{

    public static function getProductIds(WC_Order $order)
    {
        $product_ids = [];
        foreach ($order->get_items() as $item_id => $item) {
            $product_ids[] = $item['product_id'];
        }
        return $product_ids;
    }

    public static function filterItems(WC_Order $order, $product_ids)
    {
        $item = [];
        foreach ($order->get_items() as $item_id => $item) {
            $product_ids[] = $item['product_id'];
        }
        return $product_ids;
    }
    public static function getOrderEditURL($order_id)
    {
        return admin_url("post.php?post={$order_id}&action=edit");
    }
    public function getProductImageForEmail($product)
    {
        $product_image_id = $product->get_image_id();
        $image_data = wp_get_attachment_image_src($product_image_id, 'woocommerce_thumbnail');
        $image_url = $image_data[0] ?? '';
    }
}
