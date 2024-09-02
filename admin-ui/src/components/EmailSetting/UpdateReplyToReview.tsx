import React, {useState} from "react";
import {useLocalState} from "../zustand/localState";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosClient} from "../../helpers/axios";
import {toastrError, toastrSuccess} from "../../helpers/ToastrHelper";
import {Card} from "../ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "../ui/alert";
import EmailSettingsHeader from "./EmailSettingsHeader";
import {LoadingSpinner} from "../ui/loader";
import useLocale from "./utils/useLocale";
import EmailNavigation from "./utils/EmailNavigation";
import LanguageList from "./utils/LanguageList";


const UpdateReplyToReview = () => {
    const [updating, setUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const {localState} = useLocalState();

    const [currentLocale, setCurrentLocale, availableLanguages] = useLocale()

    const defaultValues = {
        language: localState.current_locale,
        subject: "",
        body: "",
    };

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });


    const onSubmit = (data: any) => {
        saveReviewReplyRequest(data);
    };

    const fetchReviewReplyRequest = (language: string) => {
        axiosClient.post('', {
            method: 'get_review_reply_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: language,
        }).then((response: any) => {
            let data = response.data.data
            form.reset({
                language: data.language,
                subject: data.settings.subject,
                body: data.settings.body,
            });
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        });
    }

    const saveReviewReplyRequest = (data: any) => {
        setUpdating(true)
        axiosClient.post('', {
            method: 'save_review_reply_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: data.language,
            body: data.body,
            subject: data.subject,
        }).then((response: any) => {
            let data = response.data.data
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrSuccess('Server Error Occurred');
        }).finally(() => {
            setUpdating(false)
        });
    };

    const values = form.watch();

    return (
        <div className={"frt-flex frt-flex-col frt-gap-4 frt-my-4 frt-mx-2"}>
            <EmailNavigation to={'/emails/review-request'} title={"Review Request"}/>
            <LanguageList currentLocale={currentLocale}
                          setCurrentLocale={setCurrentLocale}
                          availableLanguages={availableLanguages}/>
            {
                loading ? (<div className={"frt-m-auto frt-h-[50vh] frt-w-full"}><LoadingSpinner/></div>) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="frt-p-4">
                    <h3 className="frt-my-4 frt-font-extrabold frt-mx-2">Content</h3>
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({field}) => (
                            <FormItem className="frt-m-2 rwt-my-2">
                                <div
                                    className="frt-grid frt-gap-3">
                                    <FormLabel>Subject</FormLabel>
                                    <div>
                                        <FormControl>
                                            <Input type="text"
                                                   placeholder={"In response to your review of {product}"}
                                                   value={values.subject}
                                                   onChange={(e: any) => {
                                                       form.setValue('subject', e.target.value)
                                                   }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Notes:
                                            <p>{"Use {product_name} for the product name"}</p>
                                        </FormDescription>
                                        <FormMessage/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="body"
                        render={({field}) => (
                            <FormItem className="frt-m-2 rwt-my-2">
                                <div
                                    className="frt-grid frt-gap-3">
                                    <FormLabel>Body</FormLabel>
                                    <div>
                                        <FormControl>
                                            <Textarea rows={6}
                                                      onChange={(e: any) => {
                                                          form.setValue('body', e.target.value)
                                                      }}
                                                      value={values.body}
                                            ></Textarea>
                                        </FormControl>
                                        <FormDescription>
                                            Notes:
                                            <span>{"Use {reply_content} for your reply text"}</span>
                                        </FormDescription>
                                        <FormMessage/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type={"submit"}>
                        {updating ? (<span className="frt-mx-2">
                            <LoadingSpinner/>
                        </span>): null}
                        <span>Save Changes</span>
                    </Button>
                </Card>
            </form>
        </Form>
                )
            }
        </div>
    )
}

export default UpdateReplyToReview;