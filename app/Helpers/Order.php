<?php

namespace Flycart\Review\App\Helpers;

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
}
