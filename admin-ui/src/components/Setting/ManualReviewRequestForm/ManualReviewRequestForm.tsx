import React, {useEffect, useState} from "react";
import {useLocalState} from "@/src/components/zustand/localState";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Input} from "../../ui/input";
import {LoadingSpinner} from "../../ui/loader";
import SettingsColWrapper from "../SettingsColWrapper";
import {Label} from "../../ui/label";
import SettingsRowWrapper from "../SettingsRowWrapper";
import {produce} from "immer";
import {Checkbox} from "../../ui/checkbox";
import * as yup from "yup";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {showValidationError} from "../../../helpers/html";
import {runUploader} from "../../../helpers/utils";

const ManualReviewRequestForm = () => {
    const [loading, setLoading] = useState(false);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState, setLocalState} = useLocalState();
    const [errors, setErrors] = useState<any>();
    const [settingsState, setSettingsState] = useState<any>({
        email_address: "",
        logo_url: '',
        terms_is_accepted: false,
        email_subject: '',
    })
    const schema = yup.object().shape({
        email_address: yup.string().email('Must be a valid email address').required("Email id is required"),
        logo: yup.string().required(),
        terms_is_accepted: yup.boolean().required("Terms is required"),
        email_subject: yup.string().required("Email subject is required"),
    });

    const updateSettingFields = (cb: any) => {
        const newState = produce(settingsState, (draft: any) => {
            cb(draft)
        })
        setSettingsState(newState)
    }

    const getManualReviewRequestFormSettings = () => {
        axiosClient.post('', {
            method: 'get_manual_review_request_settings',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            setSettingsState(settings)
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    };

    const saveManualReviewRequestFormSettings = () => {
        setSaveChangesLoading(true)
        schema.validate(settingsState,{abortEarly:false}).then(()=>{
            axiosClient.post('', {
                method: 'save_general_settings',
                _wp_nonce_key: 'flycart_review_nonce',
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                ...settingsState
            }).then((response: any) => {
                let data = response.data.data
                toastrSuccess(data.message);
            }).catch((error: any) => {
                toastrError('Server Error Occurred');
                setErrors(error)
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
        getManualReviewRequestFormSettings();
    }, []);

    return (
        <Card>
            <CardHeader>
                <h3>Send manual review requests</h3>
                <h5>Collect reviews from people who have tried your products</h5>
            </CardHeader>
            <CardContent className="frt-grid !frt-p-2">
                {loading ? (
                    <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}>
                        <LoadingSpinner/>
                    </div>
                ) : (
                    <div className={"frt-flex frt-flex-col frt-gap-8 frt-p-6"}>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Email Address
                                </Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>
                                    Incentivize customers to leave a photo review by offering a discount for their next
                                    purchase
                                </Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Input value={settingsState.email_address} onChange={(e: any) => {
                                    updateSettingFields((draftState: any) => {
                                        draftState.email_address = e.target.value;
                                    })
                                }} type="email" placeholder="Enter Email"/>
                                {showValidationError(errors,"email_address")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Logo
                                </Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>
                                    Incentivize customers to leave a photo review by offering a discount for their next
                                    purchase
                                </Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <div className="frt-w-full frt-flex frt-gap-3">
                                    {
                                        settingsState.logo_url ? <div className={"frt-w-24 frt-relative"}>
                                            <img src={settingsState.logo_url} alt="logo"/>
                                            <i onClick={() => {
                                                updateSettingFields((draftState: any) => {
                                                    draftState.logo_url = ""
                                                })
                                            }}
                                               className={"review-icon frt-cursor-pointer review review-Heart frt-absolute frt-top-0 frt-right-0"}></i>
                                        </div> : null
                                    }
                                    <div
                                        className="frt-border frt-border-dashed frt-w-full frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={(e) => {
                                                    runUploader(e, (data: any) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.logo_url = data
                                                        })
                                                    })
                                                }}>Select Products</span>
                                    </div>
                                </div>
                                {showValidationError(errors,"logo_url")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Email Subject
                                </Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>
                                    Incentivize customers to leave a photo review by offering a discount for their next
                                    purchase
                                </Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Input type="text" placeholder="Please let us know what you think!"
                                       onChange={(e: any) => {
                                           updateSettingFields((draftState: any) => {
                                               draftState.email_subject = e.target.value;
                                           })
                                       }}
                                       value={settingsState.email_subject}/>
                                {showValidationError(errors,"email_subject")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                    </div>
                )
                }
            </CardContent>
            <CardFooter className="frt-flex frt-flex-col !frt-items-start frt-gap-y-4 !frt-py-4 !frt-px-6">
                <div className={"frt-flex frt-gap-2"}>
                    <Checkbox checked={settingsState.terms_is_accepted} onCheckedChange={(value) => {
                        updateSettingFields((draftState: any) => {
                            draftState.terms_is_accepted = value;
                        })
                    }}/>
                    <span>By sending this email, I confirm that the recipients have given consent</span>
                </div>
                {showValidationError(errors,"terms_is_accepted")}
                <Button  onClick={saveManualReviewRequestFormSettings}>
                    {saveChangesLoading && (
                        <span className="frt-mx-2"><LoadingSpinner/></span>
                    )}
                    <span>Send Email</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ManualReviewRequestForm;
