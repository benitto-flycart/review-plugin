import React, { useEffect, useState } from "react";
import { useLocalState } from "../zustand/localState";
import * as yup from "yup";
import { axiosClient } from "../api/axios";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { produce } from "immer";
import { Card, CardContent } from "../ui/card";
import { LoadingSpinner } from "../ui/loader";
import SettingsRowWrapper from "../Setting/SettingsRowWrapper";
import SettingsColWrapper from "../Setting/SettingsColWrapper";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "@/src/main.css";
import { showValidationError } from "../../helpers/html";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import AsyncSelect from 'react-select/async';
import fontData from "../../assets/fonts.json";

function Setting() {
  const [loading, setLoading] = useState<boolean>(false);
  const [saveChangesLoading, setSaveChangesLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [settingsState, setSettingsState] = useState<any>({
    review_request_timing: "0",
    review_reminder_timing: "0",
    review_photo_request_timing: "0",
    review_discount_notify_timing: "0",
    review_discount_reminder_timing: "0",
    email_font_family: "Advent Pro",
    email_font_variant_value:"100",
  });
  const { localState, setLocalState } = useLocalState();
  const [originalSettings, setoriginalSettings] = useState<any>({});
  const fetchFontOptions = (inputValue: string) => {
    return fontData.fonts
      .filter(font => font.family.toLowerCase().includes(inputValue.toLowerCase()))
      .map(font => ({
        value: font.family,
        variant_value: font.variant_value,
        label: `${font.family} (${font.variant_value})`,
      }));
  };

  const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    setTimeout(()=>{
      const options = fetchFontOptions(inputValue);
      callback(options);
    },1000);
  };


  const schema = yup.object().shape({
    send_replies_to: yup
      .string()
      .email("Must be a valid email address")
      .optional(),
    enable_email_footer: yup
      .boolean()
      .required("Enable Email Footer is required"),
    footer_text: yup
      .string()
      .nullable("Footer text is required"),
    enable_review_notification: yup
      .boolean()
      .required("Must be a valid email address"),
    review_notification_to: yup
      .string()
      .email("Must be a valid email address")
      .optional(),
    email_font_family: yup
      .string()
      .required("Email font is required"),
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
  });

  const getGeneralSettings = () => {
    axiosClient
      .post("", {
        method: "get_general_settings",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        ...settingsState,
      })
      .then((response: any) => {
        let data = response.data.data;
        let settings = data.settings;
        setSettingsState(settings);
        setoriginalSettings({...settings})
        toastrSuccess("Saved Successfully");
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
    const keysToTarget=["send_replies_to","enable_email_footer","footer_text","enable_review_notification","review_notification_to","review_request_timing","review_reminder_timing","review_photo_request_timing","review_discount_notify_timing","review_discount_reminder_timing","email_font_family","email_font_variant_value"];

    const modifiedFields = keysToTarget.reduce(
      (changes: { [key: string]: any }, key) => {
        changes[key] = settingsState[key];
        return changes;
      }, {}
    );

    schema
      .validate(settingsState, { abortEarly: false })
      .then(() => {
        setErrors({});
        axiosClient
          .post("", {
            method: "save_general_settings",
            _wp_nonce_key: "flycart_review_nonce",
            settings_type: 'email',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            ...modifiedFields,
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
                    type={"email"}
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
                <Label>Email Font</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>Select Email fonts for emails</Label>
              </SettingsColWrapper>
              <SettingsColWrapper>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptions}
                  onChange={(selectedOption) => updateSettingFields((draft: any) => {
                    draft.email_font_family = selectedOption ? selectedOption.value : "";
                    draft.email_font_variant_value = selectedOption ? selectedOption.variant_value : "";
                  })}
                  placeholder="Select Email fonts"
                  getOptionLabel={(option) => option.label} 
                  getOptionValue={(option) => option.value} 
                />
                {showValidationError(errors,"email_font_family")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
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
}

export default Setting;
