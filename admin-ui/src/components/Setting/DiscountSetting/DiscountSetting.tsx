import React, {useEffect, useState} from "react";
import {useLocalState} from "@/src/components/zustand/localState";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {Input} from "../../ui/input";
import * as yup from "yup";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {LoadingSpinner} from "../../ui/loader";
import SettingsRowWrapper from "../SettingsRowWrapper";
import SettingsColWrapper from "../SettingsColWrapper";
import {Label} from "../../ui/label";
import {produce} from "immer";
import {showValidationError} from "../../../helpers/html";

const DiscountSetting = () => {
    const [loading, setLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState, setLocalState} = useLocalState();
    const [errors, setErrors] = useState<any>();
    const [settingsState, setSettingsState] = useState<any>({
        enable_photo_discount: true,
        photo_discount_type: 'fixed',
        photo_discount_value: '',
        enable_video_discount: true,
        video_discount_type: 'fixed',
        video_discount_value: '',
    })

    const schema = yup.object().shape({
        enable_photo_discount: yup.boolean().required('Enable Photo Discount is required'),
        photo_discount_type: yup.string().required('Photo Discount Type is required'),
        photo_discount_value: yup.string().required('Photo Discount Value is required'),
        enable_video_discount: yup.boolean().required('Enable Video Discount is required'),
        video_discount_type: yup.string().required('Enable Video Type is required'),
        video_discount_value: yup.string().required('Video Discount Value is required'),
    });

    const getDiscountSettings = () => {
        axiosClient.post('', {
            method: 'get_discount_settings',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            setSettingsState(settings);
            console.log(data);
            toastrSuccess("Saved Successfully");
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    };

    const updateSettingFields = (cb: any) => {
        const newState = produce(settingsState, (draft: any) => {
            cb(draft)
        })
        setSettingsState(newState)
    }

    const saveDiscountSettings = () => {
        setSaveChangesLoading(true)
        schema.validate(settingsState,{abortEarly:false}).then(()=>{
            axiosClient.post('', {
                method: 'save_discount_settings',
                _wp_nonce_key: 'flycart_review_nonce',
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                ...settingsState
            }).then((response: any) => {
                let data = response.data.data
                toastrSuccess(data.message);
            }).catch((error: any) => {
                setErrors(error)
                toastrError('Server Error Occurred');
            }).finally(() => {
                setSaveChangesLoading(false)
            });
        }).catch((validationError: any) => {
            setSaveChangesLoading(false)
            toastrError('Validation Failed')
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            setErrors(validationErrors)
        })
    };

    useEffect(() => {
        setLoading(true);
        getDiscountSettings()
    }, []);

    return (
        <Card>
            <CardContent>
                {loading ? (
                    <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}>
                        <LoadingSpinner/>
                    </div>
                ) : (
                    <div className={"frt-flex frt-flex-col frt-gap-8 frt-p-6"}>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Enable Photo Discount
                                </Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>
                                    Incentivize customers to leave a photo review by offering a discount for their next
                                    purchase
                                </Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Switch
                                    id="enable_photo_discount"
                                    checked={settingsState.enable_photo_discount}
                                    onCheckedChange={(value: boolean) => {
                                        updateSettingFields((draftState: any) => {
                                            draftState.enable_photo_discount = value;
                                        })
                                    }}
                                />
                                {showValidationError(errors,"enable_photo_discount")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        {
                            settingsState.enable_photo_discount ? <>
                                <SettingsRowWrapper>
                                    <SettingsColWrapper>
                                        <Label>Photo Discount Type
                                        </Label>
                                        <Label className={"frt-text-xs frt-text-grayprimary"}>
                                            Incentivize customers to leave a Video review by offering a discount for
                                            their next
                                            purchase</Label>
                                    </SettingsColWrapper>
                                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                        <Select value={settingsState.photo_discount_type}
                                                onValueChange={(value: any) => {
                                                    updateSettingFields((draftState: any) => {
                                                        draftState.photo_discount_type = value;
                                                    })
                                                }}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem
                                                        value="percentage">Percentage</SelectItem>
                                                    <SelectItem
                                                        value="fixed">Fixed</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {showValidationError(errors,"photo_discount_type")}
                                    </SettingsColWrapper>
                                </SettingsRowWrapper>

                                <SettingsRowWrapper>
                                    <SettingsColWrapper>
                                        <Label>Value
                                        </Label>
                                        <Label className={"frt-text-xs frt-text-grayprimary"}>
                                            Incentivize customers to leave a Video review by offering a discount for
                                            their next
                                            purchase</Label>
                                    </SettingsColWrapper>
                                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                        <Input type={"number"} placeholder="Value"
                                               value={settingsState.photo_discount_value}
                                               onChange={(e: any) => {
                                                   updateSettingFields((draftState: any) => {
                                                       draftState.photo_discount_value = e.target.value;
                                                   })
                                               }}
                                        />
                                        {showValidationError(errors,"photo_discount_value")}
                                    </SettingsColWrapper>
                                </SettingsRowWrapper>
                            </> : null
                        }
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Enable Video Discount
                                </Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>
                                    Incentivize customers to leave a Video review by offering a discount for their next
                                    purchase</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Switch id="enable_video_discount"
                                        checked={settingsState.enable_video_discount}
                                        onCheckedChange={(value: boolean) => {
                                            updateSettingFields((draftState: any) => {
                                                draftState.enable_video_discount = value;
                                            })
                                        }}
                                />
                                {showValidationError(errors,"enable_video_discount")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        {
                            settingsState.enable_video_discount ? <>
                                <SettingsRowWrapper>
                                    <SettingsColWrapper>
                                        <Label>Video Discount Type
                                        </Label>
                                        <Label className={"frt-text-xs frt-text-grayprimary"}>
                                            Incentivize customers to leave a Video review by offering a discount for
                                            their next
                                            purchase</Label>
                                    </SettingsColWrapper>
                                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                        <Select
                                            value={settingsState.video_discount_type}
                                            onValueChange={(value: string) => {
                                                updateSettingFields((draftState: any) => {
                                                    draftState.video_discount_type = value;
                                                })
                                            }}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem
                                                        value="percentage">Percentage</SelectItem>
                                                    <SelectItem
                                                        value="fixed">Fixed</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {showValidationError(errors,"video_discount_type")}
                                    </SettingsColWrapper>
                                </SettingsRowWrapper>
                                <SettingsRowWrapper>
                                    <SettingsColWrapper>
                                        <Label>Value
                                        </Label>
                                        <Label className={"frt-text-xs frt-text-grayprimary"}>
                                            Incentivize customers to leave a Video review by offering a discount for
                                            their next
                                            purchase</Label>
                                    </SettingsColWrapper>
                                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                        <Input
                                               type={"number"}
                                               value={settingsState.video_discount_value}
                                               placeholder="Value"
                                               onChange={(e: any) => {
                                                   updateSettingFields((draftState: any) => {
                                                       draftState.video_discount_value = e.target.value;
                                                   })
                                               }}
                                        />
                                        {showValidationError(errors,"video_discount_value")}
                                    </SettingsColWrapper>
                                </SettingsRowWrapper>
                            </> : null
                        }
                        <Button onClick={saveDiscountSettings} className={"frt-max-w-max"}>
                            {saveChangesLoading && (
                                <span className="frt-mx-2">
                                        <LoadingSpinner/>
                                    </span>)}
                            <span>Save Changes</span>
                        </Button>
                    </div>
                )}
            </CardContent>

        </Card>
    );
};

export default DiscountSetting;
