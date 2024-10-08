<?php

namespace Flycart\Review\Core\Controllers\Api;

use Flycart\Review\App\Helpers\Functions;
use Flycart\Review\App\Helpers\PluginHelper;
use Flycart\Review\App\Helpers\WordpressHelper;
use Flycart\Review\App\Services\Database;
use Flycart\Review\Core\Emails\Settings\ReviewRequest;
use Flycart\Review\Core\Models\EmailSetting;
use Flycart\Review\Core\Resources\EmailSettings\ReviewDiscountRequestEmailSettingsCollection;
use Flycart\Review\Core\Resources\EmailSettings\ReviewPhotoRequestEmailSettingsCollection;
use Flycart\Review\Core\Resources\EmailSettings\ReviewPhotoRequestResource;
use Flycart\Review\Core\Resources\EmailSettings\ReviewRemainderEmailSettingsCollection;
use Flycart\Review\Core\Resources\EmailSettings\ReviewRemainderResource;
use Flycart\Review\Core\Resources\EmailSettings\ReviewReplyToRequestEmailSettingsCollection;
use Flycart\Review\Core\Resources\EmailSettings\ReviewRequestEmailSettingsCollection;
use Flycart\Review\Core\Resources\EmailSettings\ReviewRequestResource;
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
                'settings' =>  $reviewRequest->getSettings()
            ];

            //Returning Review Data
            return ReviewRequestResource::resource([$data]);
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
            $body = $request->get('body');
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
                'message' => 'Review Request Updated for Selected Language',
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getReviewRequestLanguageSettingsList(Request $request)
    {
        try {
            $list = EmailSetting::query()
                ->where("type = %s", [EmailSetting::REVIEW_REQUEST_TYPE])
                ->get();

            return ReviewRequestEmailSettingsCollection::collection([$list]);
        } catch (\Exception | \Error $exception) {
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::REVIEW_REMINDER_TYPE])
                ->first();

            if (!empty($previous)) {
                $data = [
                    'language' => $previous->language,
                    'language_label' => WordpressHelper::getLanguageLabel($previous->language),
                    'status' => $previous->status,
                    'settings' => EmailSetting::getReviewSettingsAsArray($previous->settings),
                ];
            } else {
                $settings = EmailSetting::getDefaultReviewRemainderSettings($language);

                $data = [
                    'language' => $language,
                    'language_label' => WordpressHelper::getLanguageLabel($language),
                    'status' => 'active',
                    'settings' => $settings,
                ];
            }

            //Returning Review Data
            return ReviewRemainderResource::resource([$data]);
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
            $body = $request->get('body');
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
                'message' => 'Review Request Updated for Selected Language',
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getReviewRemainderLanguageSettingsList(Request $request)
    {
        try {
            $list = EmailSetting::query()
                ->where("type = %s", [EmailSetting::REVIEW_REMINDER_TYPE])
                ->get();

            return ReviewRemainderEmailSettingsCollection::collection([$list]);
        } catch (\Exception | \Error $exception) {
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::PHOTO_REQUEST_TYPE])
                ->first();

            if (!empty($previous)) {
                $data = [
                    'language' => $previous->language,
                    'language_label' => WordpressHelper::getLanguageLabel($previous->language),
                    'status' => $previous->status,
                    'settings' => EmailSetting::getReviewSettingsAsArray($previous->settings),
                ];
            } else {
                $settings = EmailSetting::getDefaultReviewPhotoRequestSettings($language);

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

    public static function savePhotoRequest(Request $request)
    {
        $request->validate(new ReviewPhotoRequestSettingsValidation());
        Database::beginTransaction();
        try {
            $language = $request->get('language');
            $stars = $request->get('minimum_star');
            $body = $request->get('body');
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
                'message' => 'Review Photo Request Updated for Selected Language',
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getPhotoRequestLanguageSettingsList(Request $request)
    {
        try {
            $list = EmailSetting::query()
                ->where("type = %s", [EmailSetting::PHOTO_REQUEST_TYPE])
                ->get();

            return ReviewPhotoRequestEmailSettingsCollection::collection([$list]);
        } catch (\Exception | \Error $exception) {
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getDiscountRequest(Request $request)
    {
        try {
            $language = $request->get('language');

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::DISCOUNT_REQUEST_TYPE])
                ->first();

            if (!empty($previous)) {
                $data = [
                    'language' => $previous->language,
                    'language_label' => WordpressHelper::getLanguageLabel($previous->language),
                    'status' => $previous->status,
                    'settings' => EmailSetting::getReviewSettingsAsArray($previous->settings),
                ];
            } else {
                $settings = EmailSetting::getDefaultReviewDiscountRequestSettings($language);

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

    public static function saveDiscountRequest(Request $request)
    {
        $request->validate(new ReviewDiscountRequestSettingsValidation());
        Database::beginTransaction();
        try {
            $language = $request->get('language');
            $body = $request->get('body');
            $subject = $request->get('subject');
            $button_text = $request->get('button_text');

            $data = [
                'body' => $body,
                'subject' => $subject,
                'button_text' => $button_text
            ];

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::DISCOUNT_REQUEST_TYPE])
                ->first();

            if (empty($previous)) {
                EmailSetting::query()->create([
                    'type' => EmailSetting::DISCOUNT_REQUEST_TYPE,
                    'language' => $language,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ]);
            } else {
                EmailSetting::query()->update([
                    'type' => EmailSetting::DISCOUNT_REQUEST_TYPE,
                    'status' => 'active',
                    'settings' => Functions::jsonEncode($data),
                ], [
                    'id' => $previous->id,
                    'language' => $language,
                ]);
            }

            Database::commit();

            return Response::success([
                'message' => 'Review Discount Request Updated for Selected Language',
            ]);
        } catch (\Exception | \Error $exception) {
            Database::rollBack();
            PluginHelper::logError('Error Occurred While Processing', [__CLASS__, __FUNCTION__], $exception);
            return Response::error([
                'message' => 'Server Error Occurred'
            ]);
        }
    }

    public static function getDiscountRequestLanguageSettingsList(Request $request)
    {
        try {
            $list = EmailSetting::query()
                ->where("type = %s", [EmailSetting::DISCOUNT_REQUEST_TYPE])
                ->get();

            return ReviewDiscountRequestEmailSettingsCollection::collection([$list]);
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

            $previous = EmailSetting::query()
                ->where("language = %s AND type = %s", [$language, EmailSetting::REPLY_REQUEST_TYPE])
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

    public static function saveReplyToReviewRequest(Request $request)
    {
        $request->validate(new ReviewReplyToRequestSettingsValidation());
        Database::beginTransaction();
        try {
            $language = $request->get('language');
            $body = $request->get('body');
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

    public static function getReplyToReviewRequestLanguageSettingsList(Request $request)
    {
        try {
            $list = EmailSetting::query()
                ->where("type = %s", [EmailSetting::REPLY_REQUEST_TYPE])
                ->get();

            return ReviewReplyToRequestEmailSettingsCollection::collection([$list]);
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
}
