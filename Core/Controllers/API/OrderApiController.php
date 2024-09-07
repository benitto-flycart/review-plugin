<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Resources\OrderListCollection;
use Flycart\Review\Package\Request\Response;

class OrderApiController
{

    public static function getAllOrders()
    {
        try {
            $orderItemTable = Database::getWCOrderItemsTable();
            $orderItemMetaTable = Database::getWCOrderItemMetaTable();
            $reviewsTable = Review::getTableName();
            $notificationHistoryTable = NotificationHistory::getTableName();

            if (WC::isHPOSEnabled()) {
                $wcOrderTable = Database::getHPOSOrderTable();

//                INNER JOIN {$wpdb->prefix}woocommerce_order_items ON {$wpdb->prefix}wc_orders.id = {$wpdb->prefix}woocommerce_order_items.order_id
//                                            INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta ON {$wpdb->prefix}woocommerce_order_items.order_item_id = {$wpdb->prefix}woocommerce_order_itemmeta.order_item_id

                $data = Database::table($wcOrderTable)
                    ->select("{$wcOrderTable}.id as order_id, {$notificationHistoryTable}.status as email_status , COUNT(DISTINCT {$orderItemTable}.order_item_id) as order_item_count,
                    COUNT(DISTINCT {$orderItemTable}.order_item_id) as order_item_count,
                    COUNT(DISTINCT {$reviewsTable}.id) as review_count,
                    {$wcOrderTable}.date_created_gmt, {$wcOrderTable}.date_updated_gmt")
                    ->leftJoin($orderItemTable, "{$wcOrderTable}.id = {$orderItemTable}.order_id AND {$orderItemTable}.order_item_type = 'line_item'")
                    ->leftJoin($reviewsTable, "{$reviewsTable}.woo_order_id = {$orderItemTable}.order_id")
                    ->leftJoin($notificationHistoryTable, "{$notificationHistoryTable}.order_id = {$orderItemTable}.order_id")
                    ->groupBy("{$orderItemTable}.order_id")
                    ->orderBy("{$orderItemTable}.order_id", "DESC")
                    ->limit(50)
                    ->get();


            } else {
                $postTable = Database::getWPPostsTable();
                $postMetaTable = Database::getWPPostMetaTable();
                $data = [];
            }

            return OrderListCollection::collection([$data]);

        } catch (\Error|\Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}