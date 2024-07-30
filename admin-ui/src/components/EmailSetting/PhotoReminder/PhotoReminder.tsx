import React from "react";
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

const PhotoReminder = () => {
    const defaultValues = {
        language: 'english',
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
        console.log("Validation Passed");
        console.log(data);
    };

    const values = form.watch();
    console.log('printing errors');
    console.log(form.formState.errors)

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
                                    <h3>Photo Reminder</h3>
                                    <span>Encourage your customers to leave a review with an automated email</span>
                                </div>
                                <span>&rarr;	</span>
                            </CardContent>
                        </Card>
                        <Card className="frt-p-4">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                                            <Select defaultValue={values.language}
                                                                    onValueChange={(value: string) => {
                                                                        form.setValue('language', value);
                                                                    }}>
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select Type"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="english">English</SelectItem>
                                                                        <SelectItem value="french">French</SelectItem>
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
                                            <FormItem className="frt-m-2 rwt-my-2">
                                                <div
                                                    className="frt-grid frt-gap-3">
                                                    <FormLabel>Body</FormLabel>
                                                    <div>
                                                        <FormControl>
                                                            <Textarea onChange={(e: any) => {
                                                                form.setValue('body', e.target.value);
                                                            }}>{"Hello {name}, " +
                                                                "We would be grateful if you shared how things look and feel . Your reviews help us and the community that support us, and it only takes a few seconds" +
                                                                ""}</Textarea>
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
                                                                   onChange={(e:any) => {
                                                                       form.setValue('discount_text', e.target.value)
                                                                   }}
                                                                   placeholder={"Add photo/Video review to get the discount off on next purchase"}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>Note: Added when a text review is eligible for a photo review discount</FormDescription>
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
                                                                onChange={(e:any) => {
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
                                        <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>
                                        <span>Save Changes</span>
                                    </Button>
                                </form>
                            </Form>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="list" className="!frt-w-full frt-px-4">
                    <p>Showing Previously Added List</p>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PhotoReminder;
