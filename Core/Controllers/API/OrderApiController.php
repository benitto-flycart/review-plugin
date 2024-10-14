<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Resources\OrderListCollection;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class OrderApiController
{

    public static function getAllOrders(Request $request)
    {
        try {

            $perPage = $request->get('per_page') ?? 30;
            $currentPage = $request->get('current_page')  ?? 5;

            $orderItemTable = Database::getWCOrderItemsTable();
            $orderItemMetaTable = Database::getWCOrderItemMetaTable();
            $reviewsTable = Review::getTableName();
            $notificationHistoryTable = NotificationHistory::getTableName();

            if (WC::isHPOSEnabled()) {
                $wcOrderTable = Database::getHPOSOrderTable();

                $query = Database::table($wcOrderTable)
                    ->select("{$wcOrderTable}.id as order_id, 
                        {$wcOrderTable}.date_created_gmt, 
                        {$wcOrderTable}.billing_email as order_email, 
                        {$wcOrderTable}.date_updated_gmt")
                    ->where('type = %s', ['shop_order'])
                    ->orderBy("{$wcOrderTable}.id", "DESC");

                $totalCount = $query->count();

                $data = $query
                    ->limit($perPage)
                    ->offset(($currentPage - 1) * $perPage);

                error_log($data->toSql());

                $data = $data->get();

                $order_ids_as_string = static::getOrdersIdsAsString($data);


                $products = Database::table($wcOrderTable)
                    ->select("
                        {$orderItemTable}.order_item_name as product_name,
                        {$orderItemTable}.order_id as order_id,
                        {$orderItemTable}.order_item_id as order_item_id, 
                        {$orderItemMetaTable}.meta_value as product_id, 
                        {$reviewsTable}.product_id as review_product_id, 
                        {$reviewsTable}.created_at as review_added_at, 
                        {$notificationHistoryTable}.status as email_status
                        ")
                    ->leftJoin($orderItemTable, "{$wcOrderTable}.id = {$orderItemTable}.order_id AND {$orderItemTable}.order_item_type = 'line_item'")
                    ->leftJoin($orderItemMetaTable, "{$orderItemMetaTable}.order_item_id = {$orderItemTable}.order_item_id AND {$orderItemMetaTable}.meta_key = '_product_id'")
                    ->leftJoin($notificationHistoryTable, "{$notificationHistoryTable}.model_id = {$orderItemTable}.order_id AND {$notificationHistoryTable}.model_type = 'shop_order'")
                    ->leftJoin($reviewsTable, "{$reviewsTable}.product_id = {$orderItemMetaTable}.meta_value")
                    ->where("{$wcOrderTable}.id IN ({$order_ids_as_string})");


                error_log($products->toSql());

                $products = $products->get();
            } else {
                $postTable = Database::getWPPostsTable();

                $query = Database::table($postTable)
                    ->select("{$postTable}.ID as order_id, 
                        {$postTable}.post_date_gmt as date_created_gmt,
                        {$postTable}.post_modified_gmt as date_updated_gmt")
                    ->where("post_type = %s", ['shop_order'])
                    ->orderBy("{$postTable}.ID", "DESC");

                $totalCount = $query->count();

                $data = $query->get();

                $order_ids_as_string = static::getOrdersIdsAsString($data);

                $products = [];

                if (!empty(trim($order_ids_as_string))) {
                    $products = Database::table($postTable)
                        ->select("
                        {$orderItemTable}.order_item_name as product_name,
                        {$orderItemTable}.order_id as order_id,
                        {$orderItemTable}.order_item_id as order_item_id, 
                        {$orderItemMetaTable}.meta_value as product_id, 
                        {$reviewsTable}.product_id as review_product_id, 
                        {$reviewsTable}.created_at as review_added_at, 
                        {$notificationHistoryTable}.status as email_status")
                        ->leftJoin($orderItemTable, "{$postTable}.id = {$orderItemTable}.order_id AND {$orderItemTable}.order_item_type = 'line_item'")
                        ->leftJoin($orderItemMetaTable, "{$orderItemMetaTable}.order_item_id = {$orderItemTable}.order_item_id AND {$orderItemMetaTable}.meta_key = '_product_id'")
                        ->leftJoin($notificationHistoryTable, "{$notificationHistoryTable}.model_id = {$orderItemTable}.order_id AND {$notificationHistoryTable}.model_type = 'shop_order'")
                        ->leftJoin($reviewsTable, "{$reviewsTable}.product_id = {$orderItemMetaTable}.meta_value")
                        ->where("{$postTable}.id IN ({$order_ids_as_string})")
                        ->get();
                }
            }


            $results = static::buildOrderData($data, $products);

            return OrderListCollection::collection([$results, $totalCount, $perPage, $currentPage]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function buildOrderData($data, $products)
    {

        $groupedByOrderId = [];

        foreach ($products as $product) {
            $orderId = $product->order_id;

            // If the order_id doesn't exist in the result array, create it
            if (!isset($groupedByOrderId[$orderId])) {
                $groupedByOrderId[$orderId] = [];
            }

            $groupedByOrderId[$orderId][] = [
                "product_name" => $product->product_name,
                "order_item_id" => $product->order_item_id,
                "product_id" => $product->product_id,
                "review_product_id" => $product->review_product_id,
                "review_added_at" => $product->review_added_at,
                "email_status" => $product->email_status,
            ];
        }

        $orders = [];
        foreach ($data as $order) {
            $orderObj = wc_get_order($order->order_id);

            $orders[] = array(
                'order_id' => $order->order_id,
                'order_url' => admin_url('post.php?post=' . $order->order_id . '&action=edit'),
                'email' => $orderObj->get_billing_email(),
                'created_at'   => Functions::getWcTimeFromGMT($order->date_created_gmt),
                'order_items' => $groupedByOrderId[$order->order_id],
            );
        }

        return $orders;
    }

    private static function getOrdersIdsAsString($data): string
    {
        $benitto = [];

        foreach ($data as $order) {
            $benitto[] = $order->order_id;
        }


        $benitto_as_string = implode(", ", $benitto);

        return $benitto_as_string;
    }
}
