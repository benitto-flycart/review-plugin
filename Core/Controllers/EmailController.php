<?php

namespace Flycart\Review\Core\Controllers;

use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\Core\Emails\DiscountReminderWCEmail;
use Flycart\Review\Core\Emails\PhotoRequestWCEmail;
use Flycart\Review\Core\Emails\ReviewReminderWCEmail;
use Flycart\Review\Core\Emails\ReviewReplyEmail;
use Flycart\Review\Core\Emails\ReviewRequestWCEmail;

class EmailController
{
    public static function addEmails($emails)
    {
        if (!isset($emails['ReviewRequestWCEmail']) && class_exists(ReviewRequestWCEmail::class)) {
            $emails['ReviewRequestWCEmail'] = new ReviewRequestWCEmail();
        }

        if (!isset($emails['ReviewReminderWCEmail']) && class_exists(ReviewReminderWCEmail::class)) {
            $emails['ReviewReminderWCEmail'] = new ReviewReminderWCEmail();
        }

        if (!isset($emails['PhotoRequestWCEmail']) && class_exists(PhotoRequestWCEmail::class)) {
            $emails['PhotoRequestWCEmail'] = new PhotoRequestWCEmail();
        }

        if (!isset($emails['DiscountReminderWCEmail']) && class_exists(DiscountReminderWCEmail::class)) {
            $emails['DiscountReminderWCEmail'] = new DiscountReminderWCEmail();
        }

        if (!isset($emails['ReviewReplyEmail']) && class_exists(ReviewReplyEmail::class)) {
            $emails['ReviewReplyEmail'] = new ReviewReplyEmail();
        }

        return $emails;
    }

    public static function sendReviewRequestWCEmail($data)
    {
        try {
            \WC_Emails::instance();

            error_log('email controller method is called');

            $emails = wc()->mailer()->get_emails();

            if (isset($emails['ReviewRequestWCEmail'])) {
                error_log('sending review request');
                $emails['ReviewRequestWCEmail']->trigger($data);
            }
        } catch (\Error $error) {
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }

    public static function sendReviewReplyWCEmail($data)
    {
        try {
            \WC_Emails::instance();

            $emails = wc()->mailer()->get_emails();

            if (isset($emails['ReviewReplyEmail'])) {
                $emails['ReviewReplyEmail']->trigger($data);
            }
        } catch (\Error $error) {
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }

    public static function sendPhotoRequestReminder($data)
    {
        try {
            \WC_Emails::instance();

            $emails = wc()->mailer()->get_emails();

            if (isset($emails['PhotoRequestWCEmail'])) {
                $emails['PhotoRequestWCEmail']->trigger($data);
            }
        } catch (\Error $error) {
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }

    public static function sendReviewReminderWCEmail($data)
    {
        try {
            \WC_Emails::instance();

            $emails = wc()->mailer()->get_emails();

            if (isset($emails['ReviewReminderWCEmail'])) {
                error_log('triger method called for review reminder');
                $emails['ReviewReminderWCEmail']->trigger($data);
            }
        } catch (\Error $error) {
            error_log(print_r($error->getMessage(), true));
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }

    public static function sendDiscountReminder($data)
    {
        try {

            \WC_Emails::instance();

            $emails = wc()->mailer()->get_emails();

            if (isset($emails['DiscountReminderWCEmail'])) {
                $emails['DiscountReminderWCEmail']->trigger($data);
            }
        } catch (\Error $error) {
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }

    public static function sendReplyToEmail($data)
    {
        try {
            \WC_Emails::instance();

            $emails = wc()->mailer()->get_emails();

            error_log('before triggering review reply email');
            if (isset($emails['ReviewReplyEmail'])) {
                error_log('triggering review reply email');
                $emails['ReviewReplyEmail']->trigger($data);
            }
        } catch (\Error $error) {
            PluginHelper::logError('Error Occurred While Sending Review Request Email', [__CLASS__, __FUNCTION__], $error);
        }
    }
}
