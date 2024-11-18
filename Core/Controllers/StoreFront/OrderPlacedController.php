<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\OrderReview;
use Flycart\Review\Core\Models\SettingsModel;

class OrderPlacedController
{

    public static function statusUpdated($order_id)
    {
        try {

            $generalSettings = (new GeneralSettings);

            $status = $generalSettings->getOrderStatus();

            $order = wc_get_order($order_id);

            $order_status = $order->get_status();

            //if the order status is not equal to configured order status no need to send  the email
            if ($status != ('wc-' . $order_status)) return;


            $review_request_email_status = $order->get_meta('_review_request_email_status');

            if ($review_request_email_status == 'cancelled' || $review_request_email_status == 'success') return;

            $inSeconds = $generalSettings->getReviewRequestDelay();

            if (!is_int($inSeconds)) return;

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
                    'status' =>  'pending',
                    'notify_type' => SettingsModel::EMAIL_REVIEW_REQUEST_TYPE,
                    'medium' => NotificationHistory::MEDIUM_EMAIL,
                    'created_at' => Functions::currentUTCTime(),
                    'updated_at' => Functions::currentUTCTime(),
                ]);
                $notificationHistoryId = NotificationHistory::query()->lastInsertedId();
            } else {
                $notificationHistoryId = $notificationHistory->id;
            }

            do_action(F_Review_PREFIX . 'mark_review_request_email_as_processing', $order);
            if (\ActionScheduler::is_initialized()) {
                $hook_name = F_Review_PREFIX . 'send_review_request_email';
                $time = PluginHelper::getStrTimeString($inSeconds, 'days');
                as_schedule_single_action(strtotime("+$time"), $hook_name, [['notification_id' => $notificationHistoryId]]);
            }
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error while Iniating Review Process', [__CLASS__, __FUNCTION__], $exception);
        }
    }
}
