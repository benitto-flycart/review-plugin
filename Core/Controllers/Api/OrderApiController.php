<?php

namespace Flycart\Review\Core\Controllers\Api;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WC;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\OrderReview;
use Flycart\Review\Core\Models\Review;
use Flycart\Review\Core\Models\SettingsModel;
use Flycart\Review\Core\Resources\OrderListCollection;
use Flycart\Review\Core\Validation\OrderAction\OrderUpdateRequest;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class OrderApiController
{

    public static function getAllOrders(Request $request)
    {
        try {

            $perPage = $request->get('per_page') ?? 10;
            $currentPage = $request->get('current_page')  ?? 1;
            $search = $request->get('search')  ?? '';
            $range = $request->get('range')  ?? 'all_time';
            $start_date = $request->get('start_date')  ?? null;
            $end_date = $request->get('end_date')  ?? null;
            $order_status = $request->get('order_status')  ?? 'all';

            $orderItemTable = Database::getWCOrderItemsTable();
            $orderItemMetaTable = Database::getWCOrderItemMetaTable();
            $reviewsTable = Review::getTableName();
            $notificationHistoryTable = NotificationHistory::getTableName();

            if (WC::isHPOSEnabled()) {
                $wcOrderTable = Database::getHPOSOrderTable();

                $query = Database::table($wcOrderTable)
                    ->select("{$wcOrderTable}.id as order_id, 
                        {$wcOrderTable}.date_created_gmt as date_created, 
                        {$wcOrderTable}.billing_email as billing_email, 
                        {$wcOrderTable}.date_updated_gmt")
                    ->where('type = %s', ['shop_order'])
                    ->when($order_status != 'all', function ($query) use ($wcOrderTable, $order_status) {
                        return $query->where("{$wcOrderTable}.status = %s", [$order_status]);
                    })

                    ->when($range == 'custom', function ($query) use ($start_date, $end_date, $wcOrderTable) {
                        $gmt_start_date = get_gmt_from_date($start_date);
                        return $query->where("{$wcOrderTable}.date_created_gmt >= %s ", [$gmt_start_date])
                            ->when(!empty($end_date), function (Database $query) use ($end_date, $wcOrderTable) {
                                $gmt_end_date = get_gmt_from_date($end_date);
                                return $query->where("{$wcOrderTable}.date_created_gmt <= %s", [$gmt_end_date]);
                            });
                    })
                    ->orderBy("{$wcOrderTable}.id", "DESC");

                $totalCount = $query->count();

                $query = $query
                    ->limit($perPage)
                    ->offset(($currentPage - 1) * $perPage);

                $data = $query->get();

                $order_ids_as_string = static::getOrdersIdsAsString($data);
                $products = Database::table($wcOrderTable)
                    ->select("
                        {$orderItemTable}.order_item_name as product_name,
                        {$orderItemTable}.order_id as order_id,
                        {$orderItemTable}.order_item_id as order_item_id, 
                        {$orderItemMetaTable}.meta_value as product_id, 
                        {$reviewsTable}.product_id as review_product_id,                        {$reviewsTable}.created_at as review_added_at, 
                        {$notificationHistoryTable}.status as email_status
                        ")
                    ->leftJoin($orderItemTable, "{$wcOrderTable}.id = {$orderItemTable}.order_id AND {$orderItemTable}.order_item_type = 'line_item'")
                    ->leftJoin($orderItemMetaTable, "{$orderItemMetaTable}.order_item_id = {$orderItemTable}.order_item_id AND {$orderItemMetaTable}.meta_key = '_product_id'")
                    ->leftJoin(
                        $notificationHistoryTable,
                        "{$notificationHistoryTable}.model_id = {$orderItemTable}.order_id 
                            AND {$notificationHistoryTable}.model_type = 'shop_order'
                            AND {$notificationHistoryTable}.notify_type = '" . SettingsModel::EMAIL_REVIEW_REQUEST_TYPE . "'"
                    )
                    ->leftJoin(
                        $reviewsTable,
                        "{$reviewsTable}.product_id = {$orderItemMetaTable}.meta_value
                            AND {$orderItemMetaTable}.meta_key = '_product_id'
                            AND {$reviewsTable}.woo_order_id = {$orderItemTable}.order_id"
                    )
                    ->where("{$wcOrderTable}.id IN ({$order_ids_as_string})");

                $products = $products->get();
            } else {
                $postTable = Database::getWPPostsTable();
                $postMetaTable = Database::getWPPostMetaTable();

                $query = Database::table($postTable)
                    ->select(
                        "{$postTable}.ID as order_id, 
                        {$postTable}.post_date as date_created"
                    )
                    ->join($postMetaTable, "{$postTable}.ID = {$postMetaTable}.post_id")
                    ->where("post_type = %s", ['shop_order'])
                    ->when($order_status != 'all', function ($query) use ($postTable, $order_status) {
                        return $query->where("{$postTable}.post_status = %s", [$order_status]);
                    })
                    ->when(!empty($search), function ($query) use ($search, $postMetaTable) {
                        return $query->where("{$postMetaTable}.meta_key = %s AND {$postMetaTable}.meta_value = %s", ['_billing_email', $search]);
                    })
                    ->when($range == 'custom', function ($query) use ($start_date, $end_date, $postTable) {
                        return $query->where("{$postTable}.post_date >= %s", [$start_date])
                            ->when(!empty($end_date), function (Database $query) use ($end_date, $postTable) {
                                return $query->where("{$postTable}.post_date <= %s", [$end_date]);
                            });
                    })
                    ->groupBy("{$postTable}.ID")
                    ->orderBy("{$postTable}.ID", "DESC");

                $totalCount = $query->count();

                $query = $query
                    ->limit($perPage)
                    ->offset(($currentPage - 1) * $perPage);

                $data = $query->get();

                $order_ids_as_string = static::getOrdersIdsAsString($data);

                $products = [];

                if (!empty(trim($order_ids_as_string))) {
                    $productQuery = Database::table($postTable)
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
                        ->leftJoin(
                            $notificationHistoryTable,
                            "{$notificationHistoryTable}.model_id = {$orderItemTable}.order_id 
                            AND {$notificationHistoryTable}.model_type = 'shop_order'
                            AND {$notificationHistoryTable}.notify_type = '" . SettingsModel::EMAIL_REVIEW_REQUEST_TYPE . "'"
                        )
                        ->leftJoin(
                            $reviewsTable,
                            "{$reviewsTable}.product_id = {$orderItemMetaTable}.meta_value
                            AND {$orderItemMetaTable}.meta_key = '_product_id'
                            AND {$reviewsTable}.woo_order_id = {$orderItemTable}.order_id"
                        )
                        ->where("{$postTable}.id IN ({$order_ids_as_string})");

                    $products = $productQuery->get();
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
                "email_status" => !empty($product->email_status) ? $product->email_status : 'awaiting_fullfillment',
            ];
        }

        $orders = [];
        foreach ($data as $order) {
            $orderObj = wc_get_order($order->order_id);

            $orders[] = array(
                'order_id' => $order->order_id,
                'order_url' => admin_url('post.php?post=' . $order->order_id . '&action=edit'),
                'email' => $orderObj->get_billing_email(),
                'email_status' => $groupedByOrderId[$order->order_id][0]['email_status'],
                'created_at'   => Functions::getWcTimeFromGMT($order->date_created),
                'order_items' => $groupedByOrderId[$order->order_id] ?? [],
            );
        }

        return $orders;
    }

    private static function getOrdersIdsAsString($data): string
    {
        $orderIds = [];

        foreach ($data as $order) {
            $orderIds[] = $order->order_id;
        }

        $order_ids_as_string = implode(", ", $orderIds);

        return $order_ids_as_string;
    }

    public static function updateOrder(Request $request)
    {

        $request->validate(new OrderUpdateRequest);

        try {
            $order_id = $request->get('order_id');
            $type = $request->get('type');

            $woo_order = wc_get_order($order_id);

            if (empty($woo_order)) {
                Response::error([
                    'message' => __('Order Not Found', 'f-review'),
                ], 422);
            }

            if ($type != 'send_mail' && $type != 'cancel_mail') {
                Response::error([
                    'message' => __('Invalid Type', 'f-review'),
                ], 422);
            }

            $orderReview = OrderReview::query()->where("woo_order_id = %d", [$order_id])->first();

            if (empty($orderReview)) {
                OrderReview::query()->create([
                    'woo_order_id' => $order_id,
                    'created_at' => Functions::currentUTCTime(),
                    'updated_at' => Functions::currentUTCTime(),
                ]);
                $order_review_id =  OrderReview::query()->lastInsertedId();
            } else {
                $order_review_id = $orderReview->id;
            }
            $order_review_id =  OrderReview::query()->lastInsertedId();

            $notificationHistory = NotificationHistory::query()
                ->where(
                    "model_id = %d AND model_type = %s AND notify_type = %s AND medium = %s",
                    [$order_id, 'shop_order', SettingsModel::EMAIL_REVIEW_REQUEST_TYPE, NotificationHistory::MEDIUM_EMAIL]
                )
                ->first();

            if (empty($notificationHistory)) {
                NotificationHistory::query()->create([
                    'model_id' => $order_id,
                    'model_type' => 'shop_order',
                    'order_id' => $order_id,
                    'status' =>  $type == 'send_mail' ? 'processing' : 'cancelled',
                    'notify_type' => SettingsModel::email_REVIEW_REQUEST_TYPE,
                    'medium' => NotificationHistory::MEDIUM_EMAIL,
                    'created_at' => Functions::currentUTCTime(),
                    'updated_at' => Functions::currentUTCTime(),
                ]);
                $notificationHistoryId = NotificationHistory::query()->lastInsertedId();
            } else {
                $notificationHistoryId = $notificationHistory->id;
            }

            if ($type == 'send_mail') {
                do_action(F_Review_PREFIX . 'mark_review_request_email_as_processing', $woo_order);
                if (\ActionScheduler::is_initialized()) {
                    $hook_name = F_Review_PREFIX . 'send_review_request_email';
                    $time = PluginHelper::getStrTimeString(0, 'seconds');

                    as_schedule_single_action(strtotime("+$time"), $hook_name, [
                        ['notification_id' => $notificationHistoryId]
                    ]);
                }
            } else if ($type == 'cancel_mail') {
                do_action(F_Review_PREFIX . 'mark_review_request_email_as_cancelled', $woo_order);
            } else {
                Response::error([
                    'message' => __('Invalid Type', 'f-review'),
                ], 422);
            }

            return Response::success([
                'message' => __('Order Updated Successfully', 'f-review'),
            ]);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}
