<?php

namespace Flycart\Review\Core\Controllers\StoreFront;

defined('ABSPATH') || exit;

class EmailHandler
{
    public static function sendEmail($notification_id)
    {
        do_action(F_Review_PREFIX . 'send_review_request_email', $notification_id);
    }
}

