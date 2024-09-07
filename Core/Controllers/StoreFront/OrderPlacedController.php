<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Models\NotificationHistory;
use Flycart\Review\Core\Models\OrderReview;

class OrderPlacedController
{

    public static function statusUpdated($order_id)
    {
        try {
            $order = wc_get_order($order_id);

            OrderReview::query()->create([
                'woo_order_id' => $order_id,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);

            $order_review_id =  OrderReview::query()->lastInsertedId();

            NotificationHistory::query()->create([
                'order_id' => $order_id,
                'woo_order_id' => $order_id,
                'status' =>  'pending',
                'notify_type' => EmailSetting::REVIEW_REQUEST_TYPE,
                'medium' => NotificationHistory::MEDIUM_EMAIL,
                'created_at' => Functions::currentUTCTime(),
                'updated_at' => Functions::currentUTCTime(),
            ]);
            $lastInsertedId = NotificationHistory::query()->lastInsertedId();

            if (\ActionScheduler::is_initialized()) {
                $hook_name = F_Review_PREFIX . 'send_review_request_email';
                as_schedule_single_action(strtotime("+0 minutes"), $hook_name, [$lastInsertedId]);
            }

        } catch (\Error|\Exception $exception) {
            PluginHelper::logError('Error while Iniating Review Process', [__CLASS__, __FUNCTION__], $exception);
        }
    }
}