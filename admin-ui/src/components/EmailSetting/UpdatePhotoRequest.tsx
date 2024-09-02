import React, {useEffect, useState} from "react";
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
import {LoadingSpinner} from "../ui/loader";
import EmailSettingsHeader from "./EmailSettingsHeader";
import EmailNavigation from "./utils/EmailNavigation";
import LanguageList from "./utils/LanguageList";
import useLocale from "./utils/useLocale";


const UpdatePhotoRequest = () => {
    const {localState} = useLocalState();

    const [currentLocale, setCurrentLocale, availableLanguages] = useLocale()

    const [updating, setUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    const defaultValues = {
        language: localState.current_locale,
        subject: '',
        minimum_star: '5_stars',
        body: '',
        button_text: '',
        discount_text: '',
    };

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        minimum_star: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        button_text: yup.string().required("Button Text is required"),
        discount_text: yup.string().required("Button Text is required"),
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: any) => {
        // Handle form data here
        saveReviewPhotoRequest(data)
    };

    const fetchReviewPhotoRequest = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_photo_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
        }).then((response: any) => {
            let data = response.data.data
            form.reset({
                language: data.language,
                subject: data.settings.subject,
                body: data.settings.body,
                minimum_star: data.settings.minimum_star,
                button_text: data.settings.button_text,
                discount_text: data.settings.discount_text
            });
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() =>{
            setLoading(false)
        });
    }

    const saveReviewPhotoRequest = (data: any) => {
        setUpdating(true)
        axiosClient.post('', {
            method: 'save_photo_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: currentLocale,
            body: data.body,
            minimum_star: data.minimum_star,
            subject: data.subject,
            discount_text: data.discount_text,
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

    useEffect(() => {
        fetchReviewPhotoRequest();
    }, []);

    return (
        <div className={"frt-flex frt-flex-col frt-gap-4 frt-my-4 frt-mx-2"}>
            <EmailNavigation to={'/emails/review-request'} title={"Review Request"}/>
            <LanguageList currentLocale={currentLocale}
                          setCurrentLocale={setCurrentLocale}
                          availableLanguages={availableLanguages}/>
            {
                loading ? (<div className={"frt-m-auto frt-h-[50vh] frt-w-full"}><LoadingSpinner/></div>) : (
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Card className={"frt-p-4"}>
                                <FormField
                                    control={form.control}
                                    name="minimum_star"
                                    render={({field}) => (
                                        <FormItem className="frt-m-2 rwt-my-2">
                                            <div
                                                className="frt-grid frt-gap-3">
                                                <FormLabel>Send Photo Reminder</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Select defaultValue={values.minimum_star}
                                                                onValueChange={(value: string) => {
                                                                    form.setValue('minimum_star', value);
                                                                }}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select Type"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="5_stars">For 5 star reviews
                                                                        only</SelectItem>
                                                                    <SelectItem value="4_stars">For Reviews 4 star
                                                                        and above</SelectItem>
                                                                    <SelectItem value="never">Never</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

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
                                                               defaultValue={values.subject}
                                                               onChange={(e: any) => {
                                                                   form.setValue('subject', e.target.value);
                                                               }}
                                                               placeholder={"Reminder: Order #{order_number}, how did it go?"}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className={"frt-flex frt-flex-col"}>
                                                            <span>
                                                            Notes:
                                                            Use [order_number] for the customer's order number
                                                            </span>
                                                        <span>Use [name] or [last_name] as a placeholder for the user's
                                                                first or last name</span>
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
                                                        <Textarea onChange={(e: any) => {
                                                            form.setValue('body', e.target.value);
                                                        }} value={values.body}></Textarea>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="discount_text"
                                    render={({field}) => (
                                        <FormItem className="frt-m-2 rwt-my-2">
                                            <div
                                                className="frt-grid frt-gap-3">
                                                <FormLabel>Discount Text</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Input type="text"
                                                               defaultValue={values.discount_text}
                                                               onChange={(e: any) => {
                                                                   form.setValue('discount_text', e.target.value)
                                                               }}
                                                               placeholder={"Add photo/Video review to get the discount off on next purchase"}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Note: Added when a text review is eligible for
                                                        a photo review discount</FormDescription>
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
                                                            placeholder={"Write a Review"}
                                                            defaultValue={values.button_text}
                                                            onChange={(e: any) => {
                                                                form.setValue('button_text', e.target.value)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <Button type={"submit"}>
                                    {updating ? (<span className="frt-mx-2">
                                        <LoadingSpinner/>
                                    </span>) : null}
                                    <span>Save Changes</span>
                                </Button>
                            </Card>
                        </form>
                    </Form>)
                        }
                    </div>
                )
}

export default UpdatePhotoRequest;