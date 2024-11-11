<?php

namespace Flycart\Review\Core\Emails\Hooks;

class EmailStatusUpdateHook
{
    /**
     * @action F_Review_PREFIX . mark_review_request_email_sent
     */

    public static function updateReviewRequestEmailStatusInOrderMeta(\WC_Order $woo_order, $notification_id)
    {
        if (!empty($woo_order)) {
            $woo_order->update_meta_data('_review_request_email_status', 'success');
            $woo_order->save();
        }
    }
}
