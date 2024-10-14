<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\ReviewSettings\GeneralSettings;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\OrderReview;

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

            $inSeconds = $generalSettings->getReviewRequestDelay();

            error_log('printing review request delya in seconds ' . $inSeconds);
            if (!is_int($inSeconds)) return;

            OrderReview::query()->create([
                'woo_order_id' => $order_id,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $order_review_id =  OrderReview::query()->lastInsertedId();

            NotificationHistory::query()->create([
                'model_id' => $order_id,
                'model_type' => 'shop_order',
                'order_id' => $order_id,
                'status' =>  'pending',
                'notify_type' => EmailSetting::REVIEW_REQUEST_TYPE,
                'medium' => NotificationHistory::MEDIUM_EMAIL,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $notificationHistoryId = NotificationHistory::query()->lastInsertedId();

            if (\ActionScheduler::is_initialized()) {
                //Add Option in Settings Page when to send review
                $hook_name = F_Review_PREFIX . 'send_review_request_email';
                as_schedule_single_action(strtotime("+{$inSeconds} seconds"), $hook_name, [['notification_id' => $notificationHistoryId]]);
            }
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error while Iniating Review Process', [__CLASS__, __FUNCTION__], $exception);
        }
    }
}
