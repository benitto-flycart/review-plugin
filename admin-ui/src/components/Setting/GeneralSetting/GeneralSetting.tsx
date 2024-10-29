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
    auto_publish_new_reviews: true,
    reviewers_name_format: "first_name",
    order_status: "",
  });

  useEffect(() => {
    setLoading(true);
  }, []);

  const schema = yup.object().shape({
    auto_publish_new_reviews: yup
      .boolean()
      .required("Auto publish Reviews is required"),
    reviewers_name_format: yup
      .string()
      .required("Reviewers Name format is required"),

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
        console.log(data);
        setSettingsState(settings);
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
