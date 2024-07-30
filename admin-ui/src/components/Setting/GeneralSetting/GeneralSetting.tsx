import React, {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import {useLocalState} from "@/src/components/zustand/localState";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {useForm} from "react-hook-form";
import {Input} from "../../ui/input";
import {Textarea} from "../../ui/textarea";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const GeneralSetting = () => {
    const [loading, setLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState, setLocalState} = useLocalState();
    const [errors, setErrors] = useState<any>();

    useEffect(() => {
        setLoading(true);
    }, []);

    const defaultValues = {
        send_replies_to: '',
        enable_email_footer: true,
        footer_text: '',
        auto_publish_new_reviews: true,
        enable_review_notification: true,
        reviewers_name_format: 'first_name',
        review_notification_to: '',
        review_request_timing: 'immediate',
        order_status: 'completed'
    };

    const schema = yup.object().shape({
        send_replies_to: yup.string().email('Must be a valid email address').optional(),
        enable_email_footer: yup.boolean().required("Enable Email Footer is required"),
        footer_text: yup.string().required("Footer text is required"),
        auto_publish_new_reviews: yup.boolean().required("Auto publish Reviews is required"),
        enable_review_notification: yup.boolean().required("Enable Review Notification is enabled"),
        reviewers_name_format: yup.string().required("Reviewers Name format is required"),
        review_notification_to: yup.string().email('Must be a valid email address').optional(),
        review_request_timing: yup.string().required('Review Request timing is required'),
        order_status: yup.string().required('Order Status is required')
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: any) => {
        // Handle form data here
        console.log("Validation Passed");

        console.log(data);
    };

    const values = form.watch();
    console.log('printing errors');
    console.log(form.formState.errors);

    return (
        <Card>
            <CardContent className="frt-my-4 frt-grid !frt-p-2">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="send_replies_to"
                            defaultValue={values.send_replies_to}
                            render={({field}) => (
                                <FormItem className="frt-m-2 frt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel className="frt-w-full">Send Email Replies To</FormLabel>
                                        <div className="frt-w-full">
                                            <FormControl>
                                                <Input placeholder="Reply To"
                                                       type={"email"}
                                                       onChange={(e: any) => {
                                                           form.setValue('send_replies_to', e.target.value);
                                                       }}/>
                                            </FormControl>
                                            <FormDescription>Leave Empty to have email replies to default admin
                                                email</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="enable_email_footer"
                            render={({field}) => (
                                <FormItem className="frt-m-2 rwt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel>Enable Email Footer</FormLabel>
                                        <div>
                                            <FormControl>
                                                <Switch
                                                    id="enable_email_footer"
                                                    defaultChecked={values.enable_email_footer}
                                                    onCheckedChange={(value: boolean) => {
                                                        form.setValue('enable_email_footer', value)
                                                    }}/>
                                            </FormControl>
                                            <FormDescription>Display text in the footer of review
                                                emails</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="footer_text"
                            render={({field}) => (
                                <FormItem className="frt-m-2 frt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel className="frt-w-full">Footer Text</FormLabel>
                                        <div className="frt-w-full">
                                            <FormControl>
                                                <Textarea onChange={(e: any) => {
                                                    form.setValue("footer_text", e.target.value);
                                                }}>{values.footer_text}</Textarea>
                                            </FormControl>
                                            <FormDescription>Your Footer Text</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reviewers_name_format"
                            render={({field}) => (
                                <FormItem className="frt-m-2 rwt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel>Reviewers Name Format</FormLabel>
                                        <div>
                                            <FormControl>
                                                <Select defaultValue={values.reviewers_name_format}
                                                        onValueChange={(value: string) => {
                                                            form.setValue('reviewers_name_format', value);
                                                        }}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Reviewers Name format"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="first_name">First Name
                                                                (John)</SelectItem>
                                                            <SelectItem value="last_name">Last Name (Doe)</SelectItem>
                                                            <SelectItem value="first_last_name">First Name Last Name
                                                                (John Doe)</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>Customize how the reviewer name is displayed on Review
                                                Widgets</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />


                        {/*//Managing New Reviews*/}
                        <FormField
                            control={form.control}
                            name="auto_publish_new_reviews"
                            render={({field}) => (
                                <FormItem className="frt-m-2 rwt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel>Auto Publish new Reviews</FormLabel>
                                        <div>
                                            <FormControl>
                                                <Switch defaultChecked={values.auto_publish_new_reviews}
                                                        onCheckedChange={(value: boolean) => {
                                                            form.setValue('auto_publish_new_reviews', value);
                                                        }}/>
                                            </FormControl>
                                            <FormDescription>select which reviews you want to auto-publish, Any changes
                                                will
                                                only affect new reviews</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="enable_review_notification"
                            render={({field}) => (
                                <FormItem className="frt-m-2 rwt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel>Enable Review Notification</FormLabel>
                                        <div>
                                            <FormControl>
                                                <Switch
                                                    defaultChecked={values.enable_review_notification}
                                                    onCheckedChange={(value: boolean) => {
                                                        form.setValue('enable_review_notification', value);
                                                    }}/>
                                            </FormControl>
                                            <FormDescription>Enable Review Notification to remind the admin after a
                                                customer
                                                has submitted a review.</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="review_notification_to"
                            render={({field}) => (
                                <FormItem className="frt-m-2 frt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel className="frt-w-full">Review Notification to</FormLabel>
                                        <div className="frt-w-full">
                                            <FormControl>
                                                <Input placeholder="Review Notification To"
                                                       defaultValue={values.review_notification_to}
                                                       onChange={(e: any) => {
                                                           form.setValue('review_notification_to', e.target.value);
                                                       }}/>
                                            </FormControl>
                                            <FormDescription>Leave empty to have notifications sent to admin
                                                email</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/*Review Request Timing*/}

                        <FormField
                            control={form.control}
                            name="review_request_timing"
                            render={({field}) => (
                                <FormItem className="frt-m-2 frt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel className="frt-w-full">Review Request Timing</FormLabel>
                                        <div className="frt-w-full">
                                            <FormControl>
                                                <Select defaultValue={values.review_request_timing}
                                                        onValueChange={(value: string) => {
                                                            form.setValue('review_request_timing', value)
                                                        }}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Review Request Timing"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="immediate">Immediate</SelectItem>
                                                            <SelectItem value="1_day">1 Day</SelectItem>
                                                            <SelectItem value="3_days">3 Day</SelectItem>
                                                            <SelectItem value="5_days">5 Day</SelectItem>
                                                            <SelectItem value="7_days">7 Day</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>Select the Option in which day you want to send review request email</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="order_status"
                            render={({field}) => (
                                <FormItem className="frt-m-2 frt-my-2">
                                    <div
                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                        <FormLabel className="frt-w-full">Order Status</FormLabel>
                                        <div className="frt-w-full">
                                            <FormControl>
                                                <Select defaultValue={values.order_status} onValueChange={(value:string) => {
                                                   form.setValue('order_status', value)
                                                }}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Order Status"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="completed">Completed</SelectItem>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>Send Review Request Email based on Order Status</FormDescription>
                                            <FormMessage/>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button type={"submit"}>
                            {saveChangesLoading && (
                                <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>)}
                            <span>Save Changes</span>
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default GeneralSetting;
