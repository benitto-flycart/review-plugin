import React, { useEffect, useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { axiosClient } from "../../api/axios";
import { toastrError, toastrSuccess } from "../../../helpers/ToastrHelper";
import { useLocalState } from "../../zustand/localState";
import { LoadingSpinner } from "../../ui/loader";
import { Label } from "../../ui/label";
import SettingsRowWrapper from "../SettingsRowWrapper";
import SettingsColWrapper from "../SettingsColWrapper";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import { produce } from "immer";
import * as yup from "yup";
import { showValidationError } from "../../../helpers/html";
import { runUploader } from "../../../helpers/utils";
import ReviewIcon from "../../ReviewIcon";
import { reviewIcons } from "../../../helpers/icons";
import { ClientResponse } from "../../../helpers/response";

const BrandingSetting = () => {
  const [loading, setLoading] = useState(true);
  const [saveChangesLoading, setSaveChangesLoading] = useState(false);
  const { localState } = useLocalState();
  const [errors, setErrors] = useState<any>();
  const [settingsState, setSettingsState] = useState<any>({
    enable_logo: true,
    logo_url: "",
    rating_icon: "gem",
    enable_email_banners: false,
    banner_src: "",
    rating_rgb_color: "#ff224f",
    appearance: "default",
    appearance_options: {
      email_background_color: "#fffff",
      content_background_color: "#fffff",
      email_text_color: "#fffff",
      button_bg_color: "#fffff",
      button_border_color: "#fffff",
      button_title_color: "#fffff",
    },
  });

  const updateSettingFields = (cb: any) => {
    const newState = produce(settingsState, (draft: any) => {
      cb(draft);
    });
    setSettingsState(newState);
  };

  const schema = yup.object().shape({
    enable_logo: yup.boolean().required("Enable logo is required"),
    logo: yup.string().optional(),
    rating_icon: yup.string().required("Rating Icon required"),
    rating_rgb_color: yup.string().required("Rating color is required"),
    enable_email_banners: yup
      .boolean()
      .required("Enable email Banners is required"),
    banner_src: yup.string().optional(),
    appearance: yup.string().required("Appearance is required"),
    appearance_options: yup.object().shape({
      email_background_color: yup
        .string()
        .required("Email Background color is required"),
      content_background_color: yup
        .string()
        .required("Content Background color is required"),
      email_text_color: yup.string().required("Email text color is required"),
      button_bg_color: yup
        .string()
        .required("Button Background color is required"),
      button_border_color: yup
        .string()
        .required("Button Border color is required"),
      button_title_color: yup
        .string()
        .required("Button text color is required"),
    }),
  });

  const getBrandSettings = () => {
    axiosClient
      .post("", {
        method: "get_brand_settings",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
      })
      .then((response: any) => {
        let data = response.data.data;
        let settings = data.settings;
        setSettingsState(settings);
        toastrSuccess("Settings fetched successfully");
      })
      .catch((error: any) => {
        toastrError("Server Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveBrandSettings = () => {
    setSaveChangesLoading(true);
    schema
      .validate(settingsState, { abortEarly: false })
      .then(() => {
        axiosClient
          .post("", {
            method: "save_brand_settings",
            _wp_nonce_key: "flycart_review_nonce",
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            ...settingsState,
          })
          .then((response: any) => {
            let [code, data] = ClientResponse.getResponseData(response);
            toastrSuccess(data.message);

            setErrors({});
          })
          .catch((error: any) => {
            let [code, errors] = ClientResponse.getResponseError(error);
            if (ClientResponse.isValidationError(code)) {
              setErrors(errors);
              toastrError("Validation Error Occurred");
              return;
            }
            toastrError("Server Error Occurred");
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
    getBrandSettings();
  }, []);

  return (
    <Card>
      <CardContent className=" frt-grid !frt-p-2">
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
                <Label>Enable Logo</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Enabling the logo helps recipients instantly identify your
                  brand, enhancing trust and engagement with your review
                  requests
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Switch
                  id="enable-logo"
                  defaultChecked={settingsState.enable_logo}
                  onCheckedChange={(value: any) => {
                    updateSettingFields((draftState: any) => {
                      draftState.enable_logo = value;
                    });
                  }}
                />
                {showValidationError(errors, "enable_logo")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            {settingsState.enable_logo ? (
              <SettingsRowWrapper>
                <SettingsColWrapper>
                  <Label className="frt-w-full">Logo</Label>
                  <p className={"frt-text-xs frt-text-grayprimary"}>
                    Display your logo in review emails to reinforce brand
                    recognition and create a more professional look.
                  </p>
                </SettingsColWrapper>
                <SettingsColWrapper customClassName={"!frt-gap-0"}>
                  <div className="frt-w-full frt-flex frt-gap-3">
                    {settingsState.logo_url ? (
                      <div className={"frt-w-24 frt-relative"}>
                        <img src={settingsState.logo_url} alt="logo" />
                        <i
                          onClick={() => {
                            updateSettingFields((draftState: any) => {
                              draftState.logo_url = "";
                            });
                          }}
                          className={
                            "farp farp-cross-icon frt-cursor-pointer frt-bg-primary frt-text-white frt-rounded-xl frt-p-1 farp frt-absolute -frt-top-2 -frt-right-2"
                          }
                        ></i>
                      </div>
                    ) : null}
                    <div className="frt-border frt-border-dashed frt-w-full frt-p-4 frt-grid frt-justify-center frt-items-center">
                      <span
                        className="frt-bg-primary frt-text-white frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                        onClick={(e) => {
                          runUploader(e, (data: any) => {
                            updateSettingFields((draftState: any) => {
                              draftState.logo_url = data;
                            });
                          });
                        }}
                      >
                        Upload File
                      </span>
                    </div>
                  </div>
                  {showValidationError(errors, "logo_url")}
                </SettingsColWrapper>
              </SettingsRowWrapper>
            ) : null}
            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Enable Email Banners</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Toggle the inclusion of banners in review-related emails. This
                  feature helps highlight your brand and promotions in email
                  communications with customers.
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Switch
                  id="email-banners"
                  checked={settingsState.enable_email_banners}
                  onCheckedChange={(value: any) => {
                    updateSettingFields((draftState: any) => {
                      draftState.enable_email_banners = value;
                    });
                  }}
                />
                {showValidationError(errors, "enable_email_banners")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            {settingsState.enable_email_banners ? (
              <SettingsRowWrapper>
                <SettingsColWrapper>
                  <Label className="frt-w-full">Banner</Label>
                  <Label className={"frt-text-xs frt-text-grayprimary"}>
                    Customize the banner that appears in review emails. This
                    banner will be included in future email notifications sent
                    to customers.
                  </Label>
                </SettingsColWrapper>
                <SettingsColWrapper customClassName={"!frt-gap-0"}>
                  <div className="frt-w-full frt-flex frt-gap-3">
                    {settingsState.banner_src ? (
                      <div className={"frt-w-24 frt-relative"}>
                        <img src={settingsState.banner_src} alt="banner" />
                        <i
                          onClick={() => {
                            updateSettingFields((draftState: any) => {
                              draftState.banner_src = "";
                            });
                          }}
                          className={
                            "review review-cross-icon frt-cursor-pointer frt-bg-primary frt-text-white frt-rounded-xl frt-p-1 review frt-absolute -frt-top-2 -frt-right-2"
                          }
                        ></i>
                      </div>
                    ) : null}
                    <div className="frt-border frt-border-dashed frt-w-full frt-p-4 frt-grid frt-justify-center frt-items-center">
                      <span
                        className="frt-bg-primary frt-text-white frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                        onClick={(e: any) => {
                          runUploader(e, (data: any) => {
                            updateSettingFields((draftState: any) => {
                              draftState.banner_src = data;
                            });
                          });
                        }}
                      >
                        Upload File
                      </span>
                    </div>
                  </div>
                  {showValidationError(errors, "banner_src")}
                </SettingsColWrapper>
              </SettingsRowWrapper>
            ) : null}

            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Icon</Label>
                <Label className={"frt-text-xs frt-text-grayprimary"}>
                  Choose an icon style for review elements, to enhance the
                  visual appeal of all reviews. This selection will apply to
                  both past and future reviews
                </Label>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className={"frt-flex frt-items-center frt-gap-4"}>
                      {settingsState.rating_icon ? (
                        <span className={`frt-text-2xl`}>
                          <ReviewIcon
                            icon={settingsState.rating_icon}
                            color={settingsState.rating_rgb_color}
                          ></ReviewIcon>{" "}
                        </span>
                      ) : null}
                      <Button variant="outline">Choose</Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className={"frt-grid frt-grid-cols-3 frt-gap-4"}>
                      {Object.entries(reviewIcons).map(
                        ([iconName, iconData]: any, index: number) => {
                          return (
                            <span
                              key={index}
                              className={"frt-cursor-pointer frt-text-2xl"}
                              style={{ color: settingsState.rating_rgb_color }}
                              onClick={() => {
                                updateSettingFields((draftState: any) => {
                                  draftState.rating_icon = iconName;
                                });
                              }}
                            >
                              <ReviewIcon icon={iconData.filled} />
                            </span>
                          );
                        },
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                {showValidationError(errors, "rating_icon")}
              </SettingsColWrapper>
            </SettingsRowWrapper>

            <SettingsRowWrapper>
              <SettingsColWrapper>
                <Label>Email Appearance</Label>
                <p className={"frt-text-xs frt-text-grayprimary"}>
                  Modify the appearance of review emails by adjusting themes,
                  colors, and layout options to better align with your brand.
                  Changes will only apply to emails sent for new reviews.
                </p>
              </SettingsColWrapper>
              <SettingsColWrapper customClassName={"!frt-gap-0"}>
                <Select
                  value={settingsState.appearance}
                  onValueChange={(value: string) => {
                    updateSettingFields((draftState: any) => {
                      draftState.appearance = value;
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Appearance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showValidationError(errors, "appearance")}
              </SettingsColWrapper>
            </SettingsRowWrapper>
            {settingsState.appearance == "custom" ? (
              <>
                <h3 className={"frt-font-bold frt-text-lg"}>
                  Custom Appearance Options
                </h3>
                <>
                  <SettingsRowWrapper>
                    <SettingsColWrapper>
                      <Label>Email Background Color</Label>
                      <Label className={"frt-text-xs frt-text-grayprimary"}>
                        Select the overall background color for your email. This
                        change will apply to new reviews only.
                      </Label>
                    </SettingsColWrapper>
                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                      <PopOverColorPicker
                        color={
                          settingsState.appearance_options
                            .email_background_color
                        }
                        onChange={(color: string) => {
                          updateSettingFields((draftState: any) => {
                            draftState.appearance_options.email_background_color =
                              color;
                          });
                        }}
                      />
                      {showValidationError(
                        errors,
                        "appearance_options.email_background_color",
                      )}
                    </SettingsColWrapper>
                  </SettingsRowWrapper>
                  <SettingsRowWrapper>
                    <SettingsColWrapper>
                      <Label>Email Content Background Color</Label>
                      <Label className={"frt-text-xs frt-text-grayprimary"}>
                        Select the background color for the content area of your
                        email. This change will apply to new reviews only.
                      </Label>
                    </SettingsColWrapper>
                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                      <PopOverColorPicker
                        color={
                          settingsState.appearance_options
                            .content_background_color
                        }
                        onChange={(color: string) => {
                          updateSettingFields((draftState: any) => {
                            draftState.appearance_options.content_background_color =
                              color;
                          });
                        }}
                      />
                      {showValidationError(
                        errors,
                        "appearance_options.content_background_color",
                      )}
                    </SettingsColWrapper>
                  </SettingsRowWrapper>
                  <SettingsRowWrapper>
                    <SettingsColWrapper>
                      <Label>Email text color</Label>
                      <Label className={"frt-text-xs frt-text-grayprimary"}>
                        Select the text color for your email. This change will
                        apply to new reviews only.
                      </Label>
                    </SettingsColWrapper>
                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                      <PopOverColorPicker
                        color={
                          settingsState.appearance_options.email_text_color
                        }
                        onChange={(color: string) => {
                          updateSettingFields((draftState: any) => {
                            draftState.appearance_options.email_text_color =
                              color;
                          });
                        }}
                      />
                      {showValidationError(
                        errors,
                        "appearance_options.email_text_color",
                      )}
                    </SettingsColWrapper>
                  </SettingsRowWrapper>
                  <SettingsRowWrapper>
                    <SettingsColWrapper>
                      <Label>Button Background Color</Label>
                      <Label className={"frt-text-xs frt-text-grayprimary"}>
                        Select the background color for buttons in your email.
                        This change will apply to new reviews only.
                      </Label>
                    </SettingsColWrapper>
                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                      <PopOverColorPicker
                        color={settingsState.appearance_options.button_bg_color}
                        onChange={(color: string) => {
                          updateSettingFields((draftState: any) => {
                            draftState.appearance_options.button_bg_color =
                              color;
                          });
                        }}
                      />
                      {showValidationError(
                        errors,
                        "appearance_options.button_bg_color",
                      )}
                    </SettingsColWrapper>
                  </SettingsRowWrapper>
                  <SettingsRowWrapper>
                    <SettingsColWrapper>
                      <Label>Button Border Color</Label>
                      <Label className={"frt-text-xs frt-text-grayprimary"}>
                        Select the border color for buttons in your email. This
                        change will apply to new reviews only.
                      </Label>
                    </SettingsColWrapper>
                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                      <PopOverColorPicker
                        color={
                          settingsState.appearance_options.button_border_color
                        }
                        onChange={(color: string) => {
                          updateSettingFields((draftState: any) => {
                            draftState.appearance_options.button_border_color =
                              color;
                          });
                        }}
                      />
                      {showValidationError(
                        errors,
                        "appearance_options.button_border_color",
                      )}
                    </SettingsColWrapper>
                  </SettingsRowWrapper>
                  <SettingsRowWrapper>
                    <SettingsColWrapper>
                      <Label>Button Text Color</Label>
                      <Label className={"frt-text-xs frt-text-grayprimary"}>
                        Select the text color for buttons in your email. This
                        change will apply to new reviews only.
                      </Label>
                    </SettingsColWrapper>
                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                      <PopOverColorPicker
                        color={
                          settingsState.appearance_options.button_title_color
                        }
                        onChange={(color: string) => {
                          updateSettingFields((draftState: any) => {
                            draftState.appearance_options.button_title_color =
                              color;
                          });
                        }}
                      />
                      {showValidationError(
                        errors,
                        "appearance_options.button_title_color",
                      )}
                    </SettingsColWrapper>
                  </SettingsRowWrapper>
                </>
              </>
            ) : null}
            <Button onClick={saveBrandSettings} className={"frt-max-w-max"}>
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

export default BrandingSetting;
