<?php

namespace Flycart\Review\Core\Controllers\Api;

defined('ABSPATH') || exit;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Emails\Settings\DiscountNotifySetting;
use Flycart\Review\Core\Emails\Settings\DiscountReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\PhotoRequest;
use Flycart\Review\Core\Emails\Settings\ReplyRequest;
use Flycart\Review\Core\Emails\Settings\ReviewReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use Flycart\Review\Core\Models\SettingsModel;
use Flycart\Review\Core\Resources\EmailSettings\ReviewDiscountNotifySettingResource;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Resources\EmailSettings\ReviewDiscountReminderEmailSetting;
use Flycart\Review\Core\Resources\EmailSettings\ReviewPhotoRequestResource;
use Flycart\Review\Core\Resources\EmailSettings\ReviewRemainderResource;
use Flycart\Review\Core\Resources\EmailSettings\ReviewReplyRequestResource;
use Flycart\Review\Core\Resources\EmailSettings\ReviewRequestResource;
use Flycart\Review\Core\Validation\ReviewDiscountNotifySettingsValidation;
use Flycart\Review\Core\Validation\ReviewDiscountRequestSettingsValidation;
use Flycart\Review\Core\Validation\ReviewPhotoRequestSettingsValidation;
use Flycart\Review\Core\Validation\ReviewRemainderSettingsValidation;
use Flycart\Review\Core\Validation\ReviewReplyToRequestSettingsValidation;
use Flycart\Review\Core\Validation\ReviewRequestSettingsValidation;
use Flycart\Review\Core\Validation\UpdateEmailStatusValidation;
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class EmailSettingsController
{
    public static function getReviewRequest(Request $request)
    {
        try {
            $language = $request->get('language');

            $reviewRequest = new ReviewRequest($language);
            $settings = $reviewRequest->getSettings();

            $data = [
                'language' => $reviewRequest->locale,
                'language_label' => WordpressHelper::getLanguageLabel($reviewRequest->locale),
                'status' => $reviewRequest->status,
                'settings' =>  $settings,
                'placeholders' =>  $reviewRequest->getPlaceHolders()
            ];

            //Returning Review Data
            return ReviewRequestResource::resource([$data], [
                'message' => __('Settings Fetched')
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveReviewRequest(Request $request)
    {
        $request->validate(new ReviewRequestSettingsValidation());

        try {

            $language = $request->get('language');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');
            $button_text = $request->get('button_text');

            $data = [
                'body' => $body,
                'subject' => $subject,
                'button_text' => $button_text
            ];

            $reviewRequest = new ReviewRequest($language);
            $reviewRequest->saveSettings($data);

            return Response::success([
                'message' => __('Settings saved', 'f-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }


    public static function getReviewRemainder(Request $request)
    {
        try {
            $language = $request->get('language');

            $reviewReminder = new ReviewReminderEmailSetting($language);
            $settings = $reviewReminder->getSettings();

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'status' => 'active',
                'settings' => $settings,
                'placeholders' =>  $reviewReminder->getPlaceHolders()
            ];

            //Returning Review Data
            return ReviewRemainderResource::resource([$data], [
                'message' => __('Settings fetched', 'f-review')
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveReviewRemainder(Request $request)
    {
        $request->validate(new ReviewRemainderSettingsValidation());

        try {
            $language = $request->get('language');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');
            $button_text = $request->get('button_text');

            $data = [
                'body' => $body,
                'subject' => $subject,
                'button_text' => $button_text
            ];

            $reviewReminder = new ReviewReminderEmailSetting($language);
            $updated = $reviewReminder->saveSettings($data);

            return Response::success([
                'message' => __('Settings saved', 'f-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getPhotoRequest(Request $request)
    {
        try {
            $language = $request->get('language');

            $photoRequest = new PhotoRequest($language);
            $settings = $photoRequest->getSettings();

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'status' => 'active',
                'settings' => $settings,
                'placeholders' =>  $photoRequest->getPlaceHolders()
            ];

            //Returning Review Data
            return ReviewPhotoRequestResource::resource([$data], [
                'message' => __('Settings Fetched')
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function savePhotoRequest(Request $request)
    {
        $request->validate(new ReviewPhotoRequestSettingsValidation());
        try {
            $language = $request->get('language');
            $stars = $request->get('minimum_star');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');
            $discount_text = $request->get('discount_text');
            $button_text = $request->get('button_text');

            $data = [
                'body' => $body,
                'subject' => $subject,
                'minimum_star' => $stars,
                'discount_text' => $discount_text,
                'button_text' => $button_text
            ];

            $photoRequest = new PhotoRequest($language);
            $settings = $photoRequest->saveSettings($data);

            return Response::success([
                'message' => __('Settings saved', 'f-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }


    public static function getDiscountNotify(Request $request)
    {
        try {
            $language = $request->get('language');

            $discountNotifySetting = new DiscountNotifySetting($language);

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'settings' => $discountNotifySetting->getSettings(),
                'placeholders' =>  $discountNotifySetting->getPlaceHolders()
            ];

            //Returning Review Data
            return ReviewDiscountNotifySettingResource::resource([$data], [
                'message' => __('Settings fetched', 'f-review')
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveDiscountNotify(Request $request)
    {
        $request->validate(new ReviewDiscountNotifySettingsValidation());

        try {
            $language = $request->get('language');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');
            $button_text = $request->get('button_text');

            $data = [
                'body' => $body,
                'subject' => $subject,
                'button_text' => $button_text
            ];
            $discountNotifySetting = new DiscountNotifySetting($language);
            $discountNotifySetting->saveSettings($data);

            return Response::success([
                'message' => 'Settings Saved Successfully',
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getDiscountReminderSetting(Request $request)
    {
        try {
            $language = $request->get('language');

            $discountEmail = new DiscountReminderEmailSetting($language);

            $data = [
                'language' => $discountEmail->locale,
                'language_label' => WordpressHelper::getLanguageLabel($discountEmail->locale),
                'status' => $discountEmail->status,
                'settings' =>  $discountEmail->getSettings(),
                'placeholders' =>  $discountEmail->getPlaceHolders()
            ];

            return ReviewDiscountReminderEmailSetting::resource([$data], [
                'message' => __('Settings fetched')
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveDiscountReminderSetting(Request $request)
    {
        $request->validate(new ReviewDiscountRequestSettingsValidation());
        try {
            $language = $request->get('language');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');
            $button_text = $request->get('button_text');

            $data = [
                'body' => $body,
                'subject' => $subject,
                'button_text' => $button_text
            ];

            $discountEmail = new DiscountReminderEmailSetting($language);
            $discountEmail = $discountEmail->saveSettings($data);

            return Response::success([
                'message' => __('Settings saved', 'f-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }


    public static function getReplyToReviewRequest(Request $request)
    {
        try {
            $language = $request->get('language');

            $replyRequest = new ReplyRequest($language);

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'settings' => $replyRequest->getSettings(),
                'placeholders' => $replyRequest->getPlaceHolders()
            ];

            //Returning Review Data
            return ReviewReplyRequestResource::resource([$data, [
                'message' => __('Settings fetched', 'f-review'),
            ]]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function saveReplyToReviewRequest(Request $request)
    {
        $request->validate(new ReviewReplyToRequestSettingsValidation());
        try {
            $language = $request->get('language');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');

            $data = [
                'body' => $body,
                'subject' => $subject,
            ];

            $replyRequest = new ReplyRequest($language);
            $replyRequest->saveSettings($data);

            return Response::success([
                'message' => __('Settings saved', 'f-review'),
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }


    public static function duplicateEmailConfig(Request $request)
    {
        try {
            $language = $request->get('language');
            $type = $request->get('type');

            $data = [];

            //Returning Review Data
            return ReviewPhotoRequestResource::resource([$data]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public function getEmailPreview(Request $request)
    {
        try {
            $language = $request->get('language');
            $email_type = $request->get('email_type');

            $object = SettingsModel::resolveObjectByType($language, $email_type);

            return Response::success([
                'content' => $object->getTemplatePreview(),
                'message' => __('preview fetched', 'f-review')
            ]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }



    public static function getEmailStatuses(Request $request)
    {
        try {
            $language = $request->get('current_locale');

            $settings = SettingsModel::getPluginStatusSettings();

            error_log('printing whole settings');

            error_log(print_r($settings, true));

            $settings = $settings['emails'][$language] ?? [];

            $emails_statues = SettingsModel::getDefaultEmailSettingStatus();

            $statuses = [];

            foreach ($emails_statues as $key => $value) {
                $statuses[$key] = [
                    'is_enabled' => isset($settings[$key]) ? ($settings[$key] == 'active') : $value['is_enabled']
                ];
            }

            Response::success($statuses, 200);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }

    public static function updateEmailStatus(Request $request)
    {
        $request->validate(new UpdateEmailStatusValidation());

        try {
            $email_type = $request->get('email_type');
            $is_enabled = Functions::getBoolValue($request->get('is_enabled'));
            $current_locale = $request->get('current_locale');

            $settings = SettingsModel::getPluginStatusSettings();

            $settings['emails'][$current_locale][$email_type] = $is_enabled ? SettingsModel::ACTIVE : SettingsModel::DRAFT;

            $is_updated = SettingsModel::updatePluginStatusSettings($settings);

            if ($is_updated) {
                return Response::success([
                    'message' => __('Email Status Updated', 'f-review'),
                ], 200);
            }

            return Response::success([
                'message' => __('Unable to update at the moment', 'f-review'),
            ], 500);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}
