<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Emails\Settings\DiscountNotifySetting;
use Flycart\Review\Core\Emails\Settings\DiscountReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\PhotoRequest;
use Flycart\Review\Core\Emails\Settings\ReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\ReplyRequest;
use Flycart\Review\Core\Emails\Settings\ReviewReminderEmailSetting;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
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
use Flycart\Review\Package\Request\Request;
use Flycart\Review\Package\Request\Response;

class EmailSettingsController
{
    public static function getReviewRequest(Request $request)
    {
        try {
            $language = $request->get('language');

            $reviewRequest = new ReviewRequest($language);

            $data = [
                'language' => $reviewRequest->locale,
                'language_label' => WordpressHelper::getLanguageLabel($reviewRequest->locale),
                'status' => $reviewRequest->status,
                'settings' =>  $reviewRequest->getSettings(),
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

        Database::beginTransaction();
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::REVIEW_REQUEST_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::REVIEW_REQUEST_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::REVIEW_REQUEST_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

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

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'status' => 'active',
                'settings' => $reviewReminder->getSettings(),
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

        Database::beginTransaction();

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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::REVIEW_REMINDER_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::REVIEW_REMINDER_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::REVIEW_REMINDER_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

            return Response::success([
                'message' => __('Settings fetched', 'f-review'),
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

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'status' => 'active',
                'settings' => $photoRequest->getSettings(),
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
        Database::beginTransaction();
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::PHOTO_REQUEST_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::PHOTO_REQUEST_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::PHOTO_REQUEST_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

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
        Database::beginTransaction();
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::DISCOUNT_REMINDER_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::DISCOUNT_REMINDER_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::DISCOUNT_REMINDER_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

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


    public static function getReplyToReviewRequest(Request $request)
    {
        try {
            $language = $request->get('language');

            $replyRequest = new ReplyRequest($language);

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'status' => 'active',
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
        Database::beginTransaction();
        try {
            $language = $request->get('language');
            $body = $request->get('body', '', 'html');
            $subject = $request->get('subject');

            $data = [
                'body' => $body,
                'subject' => $subject,
            ];

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::REPLY_REQUEST_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::REPLY_REQUEST_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::REPLY_REQUEST_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

            return Response::success([
                'message' => 'Review Reply Request Updated for Selected Language',
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, $type])
                ->first();

            if (!empty($previous)) {
                $data = [
                    'language' => $previous->language,
                    'language_label' => WordpressHelper::getLanguageLabel($previous->language),
                    'status' => $previous->status,
                    'settings' => EmailSetting::getReviewSettingsAsArray($previous->settings),
                ];
            } else {
                $settings = EmailSetting::getDefaultReviewReplyRequestSettings($language);

                $data = [
                    'language' => $language,
                    'language_label' => WordpressHelper::getLanguageLabel($language),
                    'status' => 'active',
                    'settings' => $settings,
                ];
            }

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

            $object = EmailSetting::resolveObjectByType($language, $email_type);

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

    public static function getDiscountNotify(Request $request)
    {
        try {
            $language = $request->get('language');

            $discountNotifySetting = new DiscountNotifySetting($language);

            $data = [
                'language' => $language,
                'language_label' => WordpressHelper::getLanguageLabel($language),
                'status' => 'active',
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
        Database::beginTransaction();
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::DISCOUNT_NOTIFY_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::DISCOUNT_NOTIFY_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::DISCOUNT_NOTIFY_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

            return Response::success([
                'message' => 'Settings Saved Successfully',
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getEmailStatuses(Request $request)
    {
        try {
            $language = $request->get('language');

            $emails = EmailSetting::query()
                ->where("language = %s", [$language])
                ->get();

            $statuses = EmailSetting::getDefaultEmailSettingStatus();

            foreach ($emails as $email) {
                $statuses[$email->type] = [
                    'is_enabled' => $email->status == EmailSetting::ACTIVE
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
        try {
            $email_type = $request->get('email_type');
            $is_enabled = $request->get('is_enabled');

            if (empty($email_type)) {
                Response::error([
                    'message' => __('Email type is required', 'f-review'),
                ], 422);
            }

            EmailSetting::query()->update([
                'status' => $is_enabled ? EmailSetting::ACTIVE : EmailSetting::DRAFT,
            ], [
                'type' => $email_type
            ]);

            Response::success([
                'message' => __('Email Status Updated', 'f-review'),
            ], 200);
        } catch (\Error | \Exception $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error(Functions::getServerErrorMessage());
        }
    }
}
