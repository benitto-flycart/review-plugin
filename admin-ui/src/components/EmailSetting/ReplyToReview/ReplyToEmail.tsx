import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
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
import EmailSettingEmpty from "../EmailSettingEmpty";
import {useLocalState} from "../../zustand/localState";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";

const ReplyToEmail = () => {
    const [savedReplyToEmails, setSavedReplyToEmails] = useState<any>([])

    const [listLoading, setListLoading] = useState<boolean>(false)

    const [updating, setUpdating] = useState<boolean>(false)

    const {localState} = useLocalState();

    const available_languages = localState.available_languages;

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
        }).finally(()=> {
            setUpdating(false)
        });
    };

    const fetchReviewReplyEmailSettings = () => {
        setListLoading(true)
        axiosClient.post('', {
            method: 'get_review_reply_review_email_settings_list',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data;
            setSavedReplyToEmails(data.list);
        }).catch((error: any) => {
            toastrError("Server Error Occurred");
        }).finally(() => {
            setListLoading(false)
        });
    }

    const values = form.watch();

    useEffect(() => {
        fetchReviewReplyRequest(values.language);
        fetchReviewReplyEmailSettings();
    }, []);

    useEffect(() => {
        fetchReviewReplyRequest(values.language);
    }, [values.language]);

    return (
        <div className="frt-mx-auto frt-my-4">
            <Tabs defaultValue={'list'} className="frt-w-full frt-gap-3">
                <TabsList className="frt-space-x-0">
                    <TabsTrigger className="tabs-trigger frt-w-full" value="list">
                        List
                    </TabsTrigger>
                    <TabsTrigger className="tabs-trigger frt-w-full" value="add">
                        Add
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="add" className="!frt-w-full frt-px-4">
                    <div>
                        <Card className="frt-my-4">
                            <CardContent
                                className="frt-my-4  !frt-p-2 frt-flex frt-flex-row frt-justify-between frt-cursor-pointer">
                                <div className="frt-flex-1">
                                    <h3>Reply To Email</h3>
                                    <span>Reply To Emails</span>
                                </div>
                                <span>&rarr;	</span>
                            </CardContent>
                        </Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Card className="frt-p-4">
                                    <FormField
                                        control={form.control}
                                        name="language"
                                        render={({field}) => (
                                            <FormItem className="frt-m-2 rwt-my-2">
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
                                </Card>
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
                                        {updating ? (<span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>): null}
                                        <span>Save Changes</span>
                                    </Button>
                                </Card>
                            </form>
                        </Form>
                    </div>
                </TabsContent>
                <TabsContent value="list" className="!frt-w-full frt-px-4">


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
                                    className='frt-text-grayprimary frt-font-bold xl:frt-text-xs md:frt-text-2.5 frt-w-1/5 frt-text-2.5 frt-uppercase'>Preview
                                </div>
                            </div>
                            {listLoading ? (
                                <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}>
                                    <ClipLoader
                                        color="black"
                                        size={"20px"}
                                    />
                                </div>) : (
                                <div className='frt-flex frt-flex-col frt-gap-4'>
                                    {savedReplyToEmails?.length > 0 ? (
                                        savedReplyToEmails?.map((item: any, index: any) => {
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
                                                        className='frt-text-primary xl:frt-text-sm frt-font-bold lg:frt-text-xs md:frt-text-2.5  frt-text-2.5 frt-w-1/5'>Preview
                                                    </div>
                                                </Card>
                                            )
                                        })
                                    ) : <EmailSettingEmpty/>}
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>


        </div>
    );
};

export default ReplyToEmail;
