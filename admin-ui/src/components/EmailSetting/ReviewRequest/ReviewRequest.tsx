import React, {useEffect, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import {Card, CardContent} from "@/src/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Input} from "../../ui/input";
import {Textarea} from "../../ui/textarea";
import {Tabs, TabsList, TabsTrigger} from "../../ui/tabs";
import {TabsContent} from "@radix-ui/react-tabs";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ClipLoader} from "react-spinners";
import {Button} from "../../ui/button";
import {axiosClient} from "../../../helpers/axios";
import {useLocalState} from "../../zustand/localState";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {Simulate} from "react-dom/test-utils";

type FormValues = {
    language: string;
    subject: string;
    body: string;
    button_text: string;
};
const ReviewRequest = () => {
    const [savedReviewRequests, setSavedReviewRequests] = useState<any>([])

    const {localState} = useLocalState();

    const defaultValues: FormValues = {
        language: localState.current_locale,
        subject: "Order #{order_number}, how did it go?",
        body: "Order #{order_number}, how did it go?",
        button_text: 'Write a Review',
    };

    const available_languages = localState.available_languages;

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        button_text: yup.string().required("Button Text is required"),
    });

    const form = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const fetchReviewRequest = (language: string) => {
        axiosClient.post('', {
            method: 'get_review_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: language,
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
        });
    }

    const saveReviewRequest = (data: any) => {
        axiosClient.post('', {
            method: 'save_review_request',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            language: data.language,
            body: data.body,
            subject: data.subject,
            button_text: data.button_text
        }).then((response: any) => {
            let data = response.data.data
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrSuccess('Server Error Occurred');
        });
    };

    const fetchReviewRequestEmailSettings = () => {
        axiosClient.post('', {
            method: 'get_review_request_email_settings_list',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data;
            setSavedReviewRequests(data.list);
        }).catch((error: any) => {
            toastrError("Server Error Occurred");
        });
    }



    const values = form.watch();
    // const watchLanguage = useWatch<any>(form.control, 'language');

    useEffect(() => {
        fetchReviewRequest(values.language);
        fetchReviewRequestEmailSettings();
    }, []);
    useEffect(() => {
        fetchReviewRequest(values.language);
    }, [values.language]);

    return (
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <Tabs defaultValue={'add'} className="frt-w-full  frt-gap-3">
                <TabsList className="frt-space-x-0">
                    <TabsTrigger className="tabs-trigger frt-w-full" value="add">
                        Add
                    </TabsTrigger>
                    <TabsTrigger className="tabs-trigger frt-w-full" value="list">
                        List
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="add" className="!frt-w-full frt-px-4">
                    <div>
                        <Card className="frt-my-4">
                            <CardContent
                                className="frt-my-4  !frt-p-2 frt-flex frt-flex-row frt-justify-between frt-cursor-pointer">
                                <div className="frt-flex-1">
                                    <h3>Review Request</h3>
                                    <span>Encourage your customers to leave a review with an automated email</span>
                                </div>
                                <span>&rarr;	</span>
                            </CardContent>
                        </Card>
                        <Card className="frt-p-4">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(saveReviewRequest)}>
                                    <FormField
                                        control={form.control}
                                        name="language"
                                        render={({field}) => (
                                            <FormItem className="frt-m-2 frt-my-2">
                                                <div
                                                    className="frt-grid frt-gap-3">
                                                    <FormLabel>Language</FormLabel>
                                                    <div>
                                                        <FormControl>
                                                            <Select value={values.language}
                                                                    onValueChange={(value: string) => {
                                                                        form.setValue('language', value);
                                                                    }}>
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select Type"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        {available_languages.map((item: any, index: number) => {
                                                                            return <SelectItem key={index}
                                                                                               value={item.value}>{item.label}</SelectItem>
                                                                        })}
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
                                            <FormItem className="frt-m-2 frt-my-2">
                                                <div
                                                    className="frt-grid frt-gap-3">
                                                    <FormLabel>Subject</FormLabel>
                                                    <div>
                                                        <FormControl>
                                                            <Input type="text"
                                                                   placeholder={"Subject"}
                                                                   value={values.subject}
                                                                   onChange={(e: any) => {
                                                                       form.setValue('subject', e.target.value);
                                                                   }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Notes:
                                                            <p>Use [order_number] for the customer's order number
                                                            </p>
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
                                            <FormItem className="frt-m-2 frt-my-2">
                                                <div
                                                    className="frt-grid frt-gap-3">
                                                    <FormLabel>Body</FormLabel>
                                                    <div>
                                                        <FormControl>
                                                            <Textarea onChange={(e: any) => {
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
                                            <FormItem className="frt-m-2 frt-my-2">
                                                <div
                                                    className="frt-grid frt-gap-3">
                                                    <FormLabel>Button Text</FormLabel>
                                                    <div>
                                                        <FormControl>
                                                            <Input type="text"
                                                                   value={values.button_text}
                                                                   onChange={(e: any) => {
                                                                       form.setValue('button_text', e.target.value);
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
                                        <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>
                                        <span>Save Changes</span>
                                    </Button>
                                </form>
                            </Form>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="list" className="!frt-w-full frt-py-4">
                    <div className="frt-h-full">
                        <div className='frt-flex frt-flex-col frt-gap-4'>
                            <div className='frt-flex frt-justify-between frt-mt-5 frt-w-full frt-px-4'>
                                <div
                                    className=' frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-2.5 frt-w-1/5 frt-text-2.5 frt-uppercase'>Language
                                </div>
                                <div
                                    className=' frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-2.5 frt-w-1/5 frt-text-2.5 frt-uppercase'>Subject
                                </div>
                                <div
                                    className=' frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-2.5 frt-w-1/5 frt-text-2.5 frt-uppercase'>Body
                                </div>
                                <div
                                    className=' frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-2.5 frt-w-1/5 frt-text-2.5 frt-uppercase'>Button
                                    Text
                                </div>
                                <div
                                    className=' frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-2.5 frt-w-1/5 frt-text-2.5 frt-uppercase'>Preview
                                </div>
                            </div>
                            <div className='frt-flex frt-flex-col frt-gap-4'>
                                {
                                    savedReviewRequests?.map((item: any, index: any) => {
                                        return (
                                            <Card key={index}
                                                  className='frt-flex frt-justify-between frt-p-4 !frt-shadow-md frt-items-center'>
                                                <div
                                                    className="frt-text-primary xl:frt-text-sm frt-font-bold lg:frt-text-xs md:frt-text-2.5  frt-text-2.5 frt-w-1/5 ">{item.language_label} </div>
                                                <div
                                                    className="frt-text-primary xl:frt-text-sm frt-font-bold lg:frt-text-xs md:frt-text-2.5  frt-text-2.5 frt-w-1/5 ">{item.settings.subject}</div>
                                                <div
                                                    className="frt-text-primary xl:frt-text-sm frt-font-bold lg:frt-text-xs md:frt-text-2.5  frt-text-2.5 frt-w-1/5">{item.settings.body}</div>
                                                <div
                                                    className='frt-text-primary xl:frt-text-sm frt-font-bold lg:frt-text-xs md:frt-text-2.5  frt-text-2.5 frt-w-1/5'>{item.settings.button_text}</div>
                                                <div
                                                    className='frt-text-primary xl:frt-text-sm frt-font-bold lg:frt-text-xs md:frt-text-2.5  frt-text-2.5 frt-w-1/5'>Preview
                                                </div>
                                            </Card>

                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>


        </div>
    );
};

export default ReviewRequest;
