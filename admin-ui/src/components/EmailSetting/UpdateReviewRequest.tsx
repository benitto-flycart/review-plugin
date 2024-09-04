import {Card} from "../ui/card";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {axiosClient} from "../../helpers/axios";
import {toastrError, toastrSuccess} from "../../helpers/ToastrHelper";
import {useLocalState} from "../zustand/localState";
import {LoadingSpinner} from "../ui/loader";
import useLocale from "./utils/useLocale";
import LanguageList from "./utils/LanguageList";
import EmailNavigation from "./utils/EmailNavigation";
import {produce} from "immer";
import {showValidationError} from "../../helpers/html";

type FormValues = {
    language: string;
    subject: string;
    body: string;
    button_text: string;
};

const UpdateReviewRequest = () => {

    const {localState} = useLocalState();

    const [updating, setUpdating] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)
    const [currentLocale, setCurrentLocale, availableLanguages] = useLocale()
    const [state,setState]=useState({
        language: currentLocale,
        subject: "Order #{order_number}, how did it go?",
        body: "Order #{order_number}, how did it go?",
        button_text: 'Write a Review',
    })
    const [errors,setErrors]=useState<any>()

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        button_text: yup.string().required("Button Text is required"),
    });

    const fetchReviewRequest = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_review_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
        }).then((response: any) => {
            let data = response.data.data
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
            setLoading(false)
        });
    }

    const saveReviewRequest = () => {
        setUpdating(true)
        schema.validate(state,{abortEarly:false}).then(()=>{
            axiosClient.post('', {
                method: 'save_review_request',
                _wp_nonce_key: 'flycart_review_nonce',
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                language: currentLocale,
                body: state.body,
                subject: state.subject,
                button_text: state.button_text
            }).then((response: any) => {
                let data = response.data.data
                toastrSuccess(data.message);
            }).catch((error: any) => {
                toastrSuccess('Server Error Occurred');
                setErrors(error)
            }).finally(() => {
                setUpdating(false)
            });
        }).catch((validationError: any) => {
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

    const updateReviewRequestState = (cb: (state: any) => void) => {
        setState(prevState => produce(prevState, cb));
    };

    useEffect(() => {
        fetchReviewRequest();
    }, [currentLocale])
    return (
        <div className={"frt-flex frt-flex-col frt-gap-4 frt-my-4 frt-mx-2"}>
            <EmailNavigation to={'/emails/review-request'} title={"Review Request"}/>
            <LanguageList currentLocale={currentLocale}
                          setCurrentLocale={setCurrentLocale}
                          availableLanguages={availableLanguages}/>
            {
                loading ? (<div className={"frt-m-auto frt-h-[50vh] frt-w-full"}><LoadingSpinner/></div>) : (
                        <form>
                            <Card className="frt-p-4 frt-flex frt-flex-col frt-gap-y-2">
                                <h3 className="frt-font-extrabold">Content</h3>
                                <div className={"frt-flex frt-flex-col frt-gap-y-5"}>
                                    <div
                                        className="frt-grid frt-gap-3">
                                        <label>Subject</label>
                                        <div className={"frt-flex frt-flex-col frt-gap-y-2"}>
                                            <div className={"frt-flexf frt-flex-col frt-gap-y-1"}>
                                                <Input type="text"
                                                       placeholder={"Subject"}
                                                       value={state.subject}
                                                       onChange={(e: any) => {
                                                           updateReviewRequestState((emailState) => {
                                                               emailState.subject = e.target.value;
                                                           });
                                                       }}
                                                />
                                                {showValidationError(errors,"subject")}
                                            </div>
                                            <div>
                                                Notes:
                                                <p>Use [order_number] for the customer's order
                                                    number
                                                </p>
                                                <p>Use [name] or [last_name] as a placeholder for
                                                    the user's
                                                    first or last name</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="frt-grid frt-gap-3">
                                        <label>Body</label>
                                            <div className={"frt-flexf frt-flex-col frt-gap-y-1"}>
                                                <Textarea onChange={(e: any) => {
                                                    updateReviewRequestState((emailState) => {
                                                        emailState.body = e.target.value;
                                                    });
                                                }}
                                                value={state.body}
                                                ></Textarea>
                                                {showValidationError(errors,"body")}
                                            </div>
                                    </div>
                                    <div
                                        className="frt-grid frt-gap-3">
                                        <label>Button Text</label>
                                        <div>
                                            <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                                                <Input type="text"
                                                       value={state.button_text}
                                                       onChange={(e: any) => {
                                                           updateReviewRequestState((emailState) => {
                                                               emailState.button_text = e.target.value;
                                                           })
                                                       }}
                                                />
                                                {showValidationError(errors,"button_text")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"frt-flex frt-gap-x-5  frt-my-4"}>
                                    <Button onClick={saveReviewRequest}
                                            className={"frt-flex frt-justify-between frt-gap-2  "}>
                                        {updating ? (<span><LoadingSpinner/></span>) : null}
                                        <span>Save Changes</span>
                                    </Button>
                                    <Button type={"submit"}
                                            className={"frt-flex frt-justify-between frt-gap-2  "}>
                                        {updating ? (<span><LoadingSpinner/></span>) : null}
                                        <span>Preview</span>
                                    </Button>
                                </div>
                            </Card>
                        </form>)
            }
        </div>
    )
}

export default UpdateReviewRequest;
