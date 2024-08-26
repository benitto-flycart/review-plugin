import React, {useEffect, useState} from "react";
import {Card} from "../ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {useLocalState} from "../zustand/localState";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosClient} from "../../helpers/axios";
import {toastrError, toastrSuccess} from "../../helpers/ToastrHelper";
import {LoadingSpinner} from "../ui/loader";
import EmailSettingsHeader from "./EmailSettingsHeader";


type FormValues = {
    language: string;
    subject: string;
    body: string;
    button_text: string;
};
const UpdateReviewReminder = (props: any) => {

    const {locale} = props;

    const {localState} = useLocalState();

    const currentLanguage = localState.available_languages.find((item: any) => item.value === locale);


    const [updating, setUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const defaultValues: FormValues = {
        language: localState.current_locale,
        subject: "Reminder: Order #{order_number}, how did it go?",
        body: "Hello {name}, We would be grateful if you shared how things look and feel . Your reviews help us and the community that support us, and it only takes a few seconds",
        button_text: 'Write a Review',
    };

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        button_text: yup.string().required("Button Text is required"),
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: any) => {
        saveReviewRemainderRequest(data);
    };

    const fetchReviewRemainderRequest = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_review_remainder',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: locale,
        }).then((response: any) => {
            let data = response.data.data
            form.reset({
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

    const saveReviewRemainderRequest = (data: any) => {
        setUpdating(true)
        axiosClient.post('', {
            method: 'save_review_remainder',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: locale,
            body: data.body,
            subject: data.subject,
            button_text: data.button_text
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
    // const watchLanguage = useWatch<any>(form.control, 'language');

    useEffect(() => {
        fetchReviewRemainderRequest();
    }, []);

    return (
        <>
            {loading ? (<LoadingSpinner/>) : (<div>
                    <EmailSettingsHeader locale={locale}/>
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
                                                                   placeholder={"Reminder: Order #{order_number}, how did it go?"}
                                                                   value={values.subject}
                                                                   onChange={(e: any) => {
                                                                       form.setValue('subject', e.target.value)
                                                                   }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Notes:
                                                            <p>Use [order_number] for the customer's order number</p>
                                                            <p>Use [name] or [last_name] as a placeholder for the user's
                                                                first or last name</p>
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
                                                            <Textarea
                                                                onChange={(e: any) => {
                                                                    form.setValue('body', e.target.value)
                                                                }}
                                                                value={values.body}
                                                            ></Textarea>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="button_text"
                                        render={({field}) => (
                                            <FormItem className="frt-m-2 rwt-my-2">
                                                <div
                                                    className="frt-grid frt-gap-3">
                                                    <FormLabel>Button Text</FormLabel>
                                                    <div>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={values.button_text}
                                                                onChange={(e: any) => {
                                                                    form.setValue('button_text', e.target.value)
                                                                }}
                                                                placeholder={"Write a Review"}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </div>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type={"submit"} className={"frt-m-2"}>
                                        {updating ? (<span className="frt-mx-2">
                                           <LoadingSpinner/> </span>) : null}
                                        <span>Save Changes</span>
                                    </Button>
                                </Card>
                            </form>
                        </Form>
                    </div>
                )}
        </>);
}

export default UpdateReviewReminder;