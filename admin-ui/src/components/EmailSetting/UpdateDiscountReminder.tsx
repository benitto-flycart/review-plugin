import React, {useEffect, useState} from "react";
import {useLocalState} from "../zustand/localState";
import * as yup from "yup";
import {axiosClient} from "../api/axios";
import {toastrError, toastrSuccess} from "../../helpers/ToastrHelper";
import {Card} from "../ui/card";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {LoadingSpinner} from "../ui/loader";
import useLocale from "./utils/useLocale";
import EmailNavigation from "./utils/EmailNavigation";
import LanguageList from "./utils/LanguageList";
import {produce} from "immer";
import {showValidationError} from "../../helpers/html";

const UpdateDiscountReminder = () => {
    const {localState} = useLocalState();
    const [currentLocale, setCurrentLocale, availableLanguages] = useLocale();

    const [updating, setUpdating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>();
    const [state, setState] = useState({
        language: localState.current_locale,
        subject: "Reminder: Order #{order_number}, how did it go?",
        body: "Hello {name}, We would be grateful if you shared how things look and feel. Your reviews help us and the community that support us, and it only takes a few seconds.",
        button_text: 'Write a Review',
    });

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        button_text: yup.string().required("Button Text is required"),
    });

    const fetchReviewDiscountRequest = () => {
        setLoading(true);
        axiosClient.post('', {
            method: 'get_review_discount_remainder',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
        }).then((response: any) => {
            let data = response.data.data;
            setState({
                language: data.language,
                subject: data.settings.subject,
                body: data.settings.body,
                button_text: data.settings.button_text
            });
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false);
        });
    };

    const saveReviewDiscountRequest = (event: React.MouseEvent) => {
        event.preventDefault()
        setUpdating(true);
        schema.validate(state, {abortEarly: false}).then(() => {
            axiosClient.post('', {
                method: 'save_review_discount_remainder',
                _wp_nonce_key: 'flycart_review_nonce',
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                language: currentLocale,
                body: state.body,
                subject: state.subject,
                button_text: state.button_text
            }).then((response: any) => {
                let data = response.data.data;
                toastrSuccess(data.message);
            }).catch((error: any) => {
                toastrError('Server Error Occurred');
                setErrors(error)
            }).finally(() => {
                setUpdating(false);
            });
        }).catch((validationError) => {
            setUpdating(false)
            toastrError('Validation Failed')
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            setErrors(validationErrors)
        })
    };

    const updateDiscountReminderState = (cb: (state: any) => void) => {
        setState(prevState => produce(prevState, cb));
    };

    const handlePreviewAction = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    useEffect(() => {
        fetchReviewDiscountRequest();
    }, [currentLocale]);

    return (
        <div className={"frt-flex frt-flex-col frt-gap-4 frt-my-4 frt-mx-2"}>
            <EmailNavigation to={'/emails/discount-reminder'} title={"Discount reminder"}/>
            <LanguageList currentLocale={currentLocale}
                          setCurrentLocale={setCurrentLocale}
                          availableLanguages={availableLanguages}/>
            {
                loading ? (
                    <div className={"frt-m-auto frt-h-[50vh] frt-w-full"}>
                        <LoadingSpinner/>
                    </div>
                ) : (
                    <form>
                        <Card className="frt-p-4 frt-flex frt-flex-col frt-gap-y-2">
                            <h3 className="frt-font-extrabold">Content</h3>
                            <div className={"frt-flex frt-flex-col frt-gap-y-5"}>
                                <div className="frt-grid frt-gap-3">
                                    <label>Subject</label>
                                    <div className={"frt-flex frt-flex-col frt-gap-y-2"}>
                                        <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                                            <Input
                                                type="text"
                                                onChange={(e: any) => {
                                                    updateDiscountReminderState((emailState) => {
                                                        emailState.subject = e.target.value;
                                                    });
                                                }}
                                                value={state.subject}
                                                placeholder={"Reminder: Your Discount Code at {client}"}
                                            />
                                            {showValidationError(errors, "subject")}
                                        </div>
                                        <div>
                                            <span>Notes:</span>
                                            <span>{"Use {order_number} for the customer's order number"}</span>
                                            <span>{"Use {name} or {last_name} as a placeholder for the user's first or last name"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="frt-grid frt-gap-3">
                                    <label>Body</label>
                                    <div className={"frt-flex frt-flex-col frt-gap-y-2"}>
                                        <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                                            <Textarea
                                                onChange={(e: any) => {
                                                    updateDiscountReminderState((emailState) => {
                                                        emailState.body = e.target.value;
                                                    });
                                                }}
                                                value={state.body}
                                            ></Textarea>
                                            {showValidationError(errors, "body")}
                                        </div>
                                        <div>
                                            <span>Notes:</span>
                                            <span>{"Use {client} for your store name"}</span>
                                            <span>{"Use {discount} for the discount amount"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="frt-grid frt-gap-3">
                                    <label>Button Text</label>
                                    <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                                        <Input
                                            type="text
                                            "
                                            placeholder={"Shop Now"}
                                            onChange={(e: any) => {
                                                updateDiscountReminderState((emailState) => {
                                                    emailState.button_text = e.target.value;
                                                });
                                            }}
                                            value={state.button_text}
                                        />
                                        {showValidationError(errors, "button_text")}
                                    </div>
                                </div>
                            </div>
                            <div className={"frt-flex frt-gap-x-5 frt-my-4"}>
                                <Button onClick={saveReviewDiscountRequest}
                                        className={"frt-flex frt-justify-between frt-gap-2"}>
                                    {updating ? (<span><LoadingSpinner/></span>) : null}
                                    <span>Save Changes</span>
                                </Button>
                                <Button type={"button"} className={"frt-flex frt-justify-between frt-gap-2"}
                                        onClick={handlePreviewAction}>
                                    <span>Preview</span>
                                </Button>
                            </div>
                        </Card>
                    </form>
                )
            }
        </div>
    );
};

export default UpdateDiscountReminder;
