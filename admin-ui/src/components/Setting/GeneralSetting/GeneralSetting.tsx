import React, { useEffect, useState } from "react";
import { useLocalState } from "@/src/components/zustand/localState";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import "@/src/main.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import * as yup from "yup";
import { axiosClient } from "../../api/axios";
import { toastrError, toastrSuccess } from "../../../helpers/ToastrHelper";
import { LoadingSpinner } from "../../ui/loader";
import SettingsRowWrapper from "../SettingsRowWrapper";
import SettingsColWrapper from "../SettingsColWrapper";
import { Label } from "../../ui/label";
import { produce } from "immer";
import { showValidationError } from "../../../helpers/html";

const GeneralSetting = () => {
  const [loading, setLoading] = useState(true);
  const [saveChangesLoading, setSaveChangesLoading] = useState(false);
  const { localState, setLocalState } = useLocalState();
  const [errors, setErrors] = useState<any>();
  const [settingsState, setSettingsState] = useState<any>({
    send_replies_to: "",
    enable_email_footer: true,
    footer_text: "",
    auto_publish_new_reviews: true,
    enable_review_notification: true,
    reviewers_name_format: "first_name",
    review_notification_to: "",
    review_request_timing: "0",
    review_reminder_timing: "0",
    review_photo_request_timing: "0",
    review_discount_notify_timing: "0",
    review_discount_reminder_timing: "0",
    order_status: "",
  });

  useEffect(() => {
    setLoading(true);
  }, []);

  const schema = yup.object().shape({
    send_replies_to: yup
      .string()
      .email("Must be a valid email address")
      .optional(),
    enable_email_footer: yup
      .boolean()
      .required("Enable Email Footer is required"),
    footer_text: yup.string().nullable("Footer text is required"),
    auto_publish_new_reviews: yup
      .boolean()
      .required("Auto publish Reviews is required"),
    enable_review_notification: yup
      .boolean()
      .required("Enable Review Notification is enabled"),
    reviewers_name_format: yup
      .string()
      .required("Reviewers Name format is required"),
    review_notification_to: yup
      .string()
      .email("Must be a valid email address")
      .optional(),
    review_request_timing: yup
      .string()
      .required("Review Request timing is required"),
    review_reminder_timing: yup
      .string()
      .required("Review Reminder timing is required"),
    review_photo_request_timing: yup
      .string()
      .required("Review Photo Request timing is required"),
    review_discount_notify_timing: yup
      .string()
      .required("Review Discount Notify timing is required"),
    review_discount_reminder_timing: yup
      .string()
      .required("Review discount reminder timing is required"),

    order_status: yup.string().required("Order Status is required"),
  });

  const getGeneralSettings = () => {
    axiosClient
      .post("", {
        method: "get_general_settings",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
      })
      .then((response: any) => {
        let data = response.data.data;
        let settings = data.settings;
        console.log("logging the settins");
        console.log(settings);
        setSettingsState(settings);
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateSettingFields = (cb: any) => {
    const newState = produce(settingsState, (draft: any) => {
      cb(draft);
    });
    setSettingsState(newState);
  };

  const saveGeneralSettings = () => {
    setSaveChangesLoading(true);
    schema
      .validate(settingsState, { abortEarly: false })
      .then(() => {
        axiosClient
          .post("", {
            method: "save_general_settings",
            _wp_nonce_key: "flycart_review_nonce",
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            ...settingsState,
          })
          .then((response: any) => {
            let data = response.data.data;
            toastrSuccess(data.message);
          })
          .catch((error: any) => {
            toastrError("Server Error Occurred");
            setErrors(error);
          })
          .finally(() => {
            setSaveChangesLoading(false);
          });
      })
      .catch((validationError: any) => {
        setSaveChangesLoading(false);
        toastrError("Validation Failed");
        const validationErrors = {};
        validationError?.inner?.forEach((e: any) => {
          // @ts-ignore
          validationErrors[e.path] = [e.message];
        });
        setErrors(validationErrors);
      });
  };

  useEffect(() => {
    setLoading(true);
    getGeneralSettings();
  }, []);

  return (
    <Card>
      <CardContent>
        {loading ? (
          <div
            className={
              "frt-grid frt-justify-center frt-items-center frt-h-[60vh]"
            }
          >
            <LoadingSpinner />
          </div>
        ) : (
          <div className={"frt-flex frt-flex-col frt-gap-8 frt-p-6"}>
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Send Email Replies To</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Leave Empty to have email replies to default admin email
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Input
                  placeholder="Reply To"
                  value={settingsState.send_replies_to}
                  type={"email"}
                  onChange={(e: any) => {
                    updateSettingFields((draftState: any) => {
                      draftState.send_replies_to = e.target.value;
                    });
                  }}
                />
                {showValidationError(errors, "send_replies_to")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Enable Email Footer</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Display text in the footer of review emails
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Switch
                  id="enable_email_footer"
                  checked={settingsState.enable_email_footer}
                  onCheckedChange={(value: boolean) => {
                    updateSettingFields((draftState: any) => {
                      draftState.enable_email_footer = value;
                    });
                  }}
                />
                {showValidationError(errors, "enable_email_footer")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            {settingsState.enable_email_footer ? (
              <SettingsRowWrapper>
                <SettingsColWrapper>
                  <Label>Footer Text</Label>
                  <Label className={"frt-text-xs frt-text-grayprimary"}>
                    Your Footer Text
                  </Label>
                </SettingsColWrapper>
                <SettingsColWrapper customClassName={"!frt-gap-0"}>
                  <Textarea
                    onChange={(e: any) => {
                      updateSettingFields((draftState: any) => {
                        draftState.footer_text = e.target.value;
                      });
                    }}
                    value={settingsState.footer_text}
                  ></Textarea>
                  {showValidationError(errors, "footer_text")}
                </SettingsColWrapper>
              </SettingsRowWrapper>
            ) : null}
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Reviewers Name Format</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Customize how the reviewer name is displayed on Review Widgets
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.reviewers_name_format}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.reviewers_name_format = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Reviewers Name format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="first_name">
                        First Name (John)
                      </SelectItem>
                      <SelectItem value="last_name">Last Name (Doe)</SelectItem>
                      <SelectItem value="first_last_name">
                        First Name Last Name (John Doe)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "reviewers_name_format")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Auto Publish new Reviews</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  select which reviews you want to auto-publish, Any changes
                  will only affect new reviews
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Switch
                  checked={settingsState.auto_publish_new_reviews}
                  onCheckedChange={(value: boolean) => {
                    updateSettingFields((draftState: any) => {
                      draftState.auto_publish_new_reviews = value;
                    });
                  }}
                />
                {showValidationError(errors, "auto_publish_new_reviews")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Enable Review Notification</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Enable Review Notification to remind the admin after a
                  customer has submitted a review.
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Switch
                  checked={settingsState.enable_review_notification}
                  onCheckedChange={(value: boolean) => {
                    updateSettingFields((draftState: any) => {
                      draftState.enable_review_notification = value;
                    });
                  }}
                />
                {showValidationError(errors, "enable_review_notification")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            {settingsState.enable_review_notification ? (
              <SettingsRowWrapper>
                <SettingsColWrapper>
                  <Label>Review Notification to</Label>
                  <Label className={"frt-text-xs frt-text-grayprimary"}>
                    Leave empty to have notifications sent to admin email
                  </Label>
                </SettingsColWrapper>
                <SettingsColWrapper customClassName={"!frt-gap-0"}>
                  <Input
                    placeholder="Review Notification To"
                    value={settingsState.review_notification_to}
                    onChange={(e: any) => {
                      updateSettingFields((draftState: any) => {
                        draftState.review_notification_to = e.target.value;
                      });
                    }}
                  />
                  {showValidationError(errors, "review_notification_to")}
                </SettingsColWrapper>
              </SettingsRowWrapper>
            ) : null}
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Review Request Timing</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Select the Option in which day you want to send review request
                  email
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.review_request_timing}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.review_request_timing = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Review Request Timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Day</SelectItem>
                      <SelectItem value="5">5 Day</SelectItem>
                      <SelectItem value="7">7 Day</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "review_request_timing")}
              </SettingsColWrapper>
            </SettingsRowWrapper>

            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Review Reminder Timing</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Select the Option in which day you want to send review
                  reminder email. it will only count from after the review
                  request email sent
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.review_reminder_timing}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.review_reminder_timing = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Review Reminder Timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Day</SelectItem>
                      <SelectItem value="5">5 Day</SelectItem>
                      <SelectItem value="7">7 Day</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "review_reminder_timing")}
              </SettingsColWrapper>
            </SettingsRowWrapper>

            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Review Photo Request Timing</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Select the Option in which day you want to send review photo
                  request. it will only count from after the review has been
                  added{" "}
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.review_photo_request_timing}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.review_photo_request_timing = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Review Photo Request Timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Day</SelectItem>
                      <SelectItem value="5">5 Day</SelectItem>
                      <SelectItem value="7">7 Day</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "review_photo_request_timing")}
              </SettingsColWrapper>
            </SettingsRowWrapper>

            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Review Discount Notify Timing</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Select the Option in which day you want to send discount
                  notify, this will count after the discount is created{" "}
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.review_discount_notify_timing}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.review_discount_notify_timing = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Review Discount Notify Timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Day</SelectItem>
                      <SelectItem value="5">5 Day</SelectItem>
                      <SelectItem value="7">7 Day</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "review_discount_notify_timing")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Review Discount Reminder Timing</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Select the Option in which day you want to send review
                  discount reminder. it will only count from after the review
                  has been added{" "}
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.review_discount_reminder_timing}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.review_discount_reminder_timing = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Review Discount Reminder Timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Day</SelectItem>
                      <SelectItem value="5">5 Day</SelectItem>
                      <SelectItem value="7">7 Day</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "review_discount_reminder_timing")}
              </SettingsColWrapper>
            </SettingsRowWrapper>

            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Order Status</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Send Review Request Email based on Order Status
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.order_status}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.order_status = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(localState.order_statuses)?.map(
                        (obj: any, index: number) => {
                          return (
                            <SelectItem key={index} value={obj[0]}>
                              {obj[1]}
                            </SelectItem>
                          );
                        },
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "order_status")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            <Button className={"frt-max-w-max"} onClick={saveGeneralSettings}>
              {saveChangesLoading && (
                <span className="frt-mx-2">
                  <LoadingSpinner />
                </span>
              )}
              <span>Save Changes</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralSetting;
