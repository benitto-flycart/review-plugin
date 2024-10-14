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
import PreviewEmailDialog from "./PreviewEmailDialog";


const UpdateReplyToReview = () => {
    const [updating, setUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const {localState} = useLocalState();
    const [state, setState] = useState({
        language: localState.current_locale,
        subject: "",
        body: "",
    })
    const [showEmailDialog,setShowEmailDialog] = useState<boolean>(false);
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
    const [emailPreviewContent, setEmailPreviewContent] = useState<any>();
    const [errors, setErrors] = useState<any>()
    const [currentLocale, setCurrentLocale, availableLanguages] = useLocale()


    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
    });

    const fetchReviewReplyRequest = () => {
        axiosClient.post('', {
            method: 'get_review_reply_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
        }).then((response: any) => {
            let data = response.data.data
            setState({
                language: data.language,
                subject: data.settings.subject,
                body: data.settings.body,
            });
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        });
    }

    const updateReplyToReviewState = (cb: (state: any) => void) => {
        setState(prevState => produce(prevState, cb));
    };

    const saveReviewReplyRequest = (event: React.MouseEvent) => {
        event.preventDefault()
        setUpdating(true)
        schema.validate(state, {abortEarly: false}).then(() => {
            axiosClient.post('', {
                method: 'save_review_reply_request',
                _wp_nonce_key: 'flycart_review_nonce',
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                language: state.language,
                body: state.body,
                subject: state.subject,
            }).then((response: any) => {
                let data = response.data.data
                toastrSuccess(data.message);
            }).catch((error: any) => {
                toastrSuccess('Server Error Occurred');
                setErrors(error)
            }).finally(() => {
                setUpdating(false)
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

    const loadPreview = (e: any) => {
        e.preventDefault();
        setLoadingPreview(true);
        axiosClient
            .post("", {
                method: "get_email_preview",
                email_type: "reply_to_review",
                _wp_nonce_key: "flycart_review_nonce",
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                language: currentLocale,
            })
            .then((response: any) => {
                let data = response.data.data;
                setEmailPreviewContent(data.content)
            })
            .catch((error: any) => {
                toastrError("Server Error Occurred");
            })
            .finally(() => {
                setLoadingPreview(false);
            });
    };

    useEffect(() => {
        fetchReviewReplyRequest()
    }, [currentLocale]);

    return (
        <div className={"frt-flex frt-flex-col frt-gap-4 frt-my-4 frt-mx-2"}>
            <EmailNavigation to={'/emails/reply-to-review'} title={"Reply to review"}/>
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
                                        <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                                            <Input
                                                type="text"
                                                placeholder={"In response to your review of {product}"}
                                                value={state.subject}
                                                onChange={(e: any) => {
                                                    updateReplyToReviewState((emailState) => {
                                                        emailState.subject = e.target.value;
                                                    })
                                                }}
                                            />
                                            {showValidationError(errors, "subject")}
                                        </div>
                                        <div>
                                            Notes:
                                            <p>{"Use {product_name} for the product name"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="frt-grid frt-gap-3">
                                    <label>Body</label>
                                    <div className={"frt-flex frt-flex-col frt-gap-y-2"}>
                                        <div className={"frt-flex frt-flex-col frt-gap-y-1"}>
                                            <Textarea rows={6}
                                                      onChange={(e: any) => {
                                                          updateReplyToReviewState((emailState) => {
                                                              emailState.body = e.target.value;
                                                          })
                                                      }}
                                                      value={state.body}
                                            ></Textarea>
                                            {showValidationError(errors, "body")}
                                        </div>
                                        <div>
                                            Notes:
                                            <span>{"Use {reply_content} for your reply text"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"frt-flex frt-gap-x-5   frt-my-4"}>
                                <Button
                                    onClick={saveReviewReplyRequest}
                                    className={"frt-flex frt-justify-between frt-gap-2  "}>
                                    {updating ? (<span><LoadingSpinner/></span>) : null}
                                    <span>Save Changes</span>
                                </Button>
                                <Button  onClick={(event:React.MouseEvent)=>{
                                    setShowEmailDialog(true)
                                    loadPreview(event)
                                }}
                                        className={"frt-flex frt-justify-between frt-gap-2  "}>
                                    <span>Preview</span>
                                </Button>
                            </div>
                        </Card>
                    </form>)
            }
            <PreviewEmailDialog show={showEmailDialog} previewContent={emailPreviewContent} toggle={setShowEmailDialog} loadingPreview={loadingPreview} title={"Reply to review"} />
        </div>
    )
}

export default UpdateReplyToReview;