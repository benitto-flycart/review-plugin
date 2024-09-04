<?php

namespace Flycart\Review\Core\Controllers;

use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Emails\ReviewRequestWCEmail;

class EmailController
{
    public static function addEmails($emails)
    {
        if (!isset($emails['ReviewRequestWCEmail']) && class_exists(ReviewRequestWCEmail::class)) {
            $emails['ReviewRequestWCEmail'] = new ReviewRequestWCEmail();
        }

        return $emails;
    }

    public static function sendReviewRequestWCEmail($data)
    {
        try {
            \WC_Emails::instance();

            $emails = wc()->mailer()->get_emails();

            error_log(print_r($data, true));

            if (isset($emails['ReviewRequestWCEmail'])) {
                $emails['ReviewRequestWCEmail']->trigger($data);
            }
        } catch (\Error $error) {
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }
}