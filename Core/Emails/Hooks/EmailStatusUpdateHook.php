<?php

namespace Flycart\Review\Core\Emails\Hooks;

use WC_Order;

class EmailStatusUpdateHook
{
    /**
     * @action F_Review_PREFIX . mark_review_request_email_sent
     */

    public static function success(\WC_Order $woo_order)
    {
        if (!empty($woo_order)) {
            $woo_order->update_meta_data('_review_request_email_status', 'success');
            $woo_order->save();
        }
    }

    public static function cancelled(WC_Order $woo_order)
    {
        if (!empty($woo_order)) {
            $woo_order->update_meta_data('_review_request_email_status', 'cancelled');
            $woo_order->save();
        }
    }

    public static function processing()
    {
        if (!empty($woo_order)) {
            $woo_order->update_meta_data('_review_request_email_status', 'processing');
            $woo_order->save();
        }
    }
}
