import React, {useState} from "react";
import {useLocalState} from "@/src/components/zustand/localState";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader,} from "@/src/components/ui/card";
import "@/src/main.css";
import {useForm} from "react-hook-form";
import {Input} from "../../ui/input";
import {LoadingSpinner} from "../../ui/loader";
import SettingsColWrapper from "../SettingsColWrapper";
import {Label} from "../../ui/label";
import SettingsRowWrapper from "../SettingsRowWrapper";
import {produce} from "immer";
import {Checkbox} from "../../ui/checkbox";

const ManualReviewRequestForm = () => {
    const [loading, setLoading] = useState(false);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState, setLocalState} = useLocalState();
    const [errors, setErrors] = useState<any>();
    const [settingsState, setSettingsState] = useState<any>({
        email_address: "",
        logo: 'fixed',
        terms_is_accepted: false,
        email_subject: '',
    })
    // useEffect(() => {
    //     setLoading(true);
    // }, []);

    const updateSettingFields = (cb: any) => {
        const newState = produce(settingsState, (draft: any) => {
            cb(draft)
        })
        setSettingsState(newState)
    }

    const form = useForm();

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
                            <SettingsColWrapper>
                                <Input value={settingsState.email_address} onChange={(e: any) => {
                                    updateSettingFields((draftState: any) => {
                                        draftState.email_address = e.target.value;
                                    })
                                }} type="email" placeholder="Enter Email"/>
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
                            <SettingsColWrapper>
                                <div
                                    className="frt-border frt-border-dashed  frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={() => {
                                                    console.log('open product select model with latest 10 products');
                                                    alert('select upto 5 products in model popup');
                                                }}>Select Products</span>
                                </div>
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
                            <SettingsColWrapper>
                                <Input type="text" placeholder="Please let us know what you think!"
                                       onChange={(e: any) => {
                                           updateSettingFields((draftState: any) => {
                                               draftState.email_subject = e.target.value;
                                           })
                                       }}
                                       value={settingsState.email_subject}/>
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
                <Button>
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
