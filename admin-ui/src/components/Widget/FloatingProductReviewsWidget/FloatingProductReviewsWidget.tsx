import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";
import {ClipLoader} from "react-spinners";
import {useLocalState} from "../../zustand/localState";
import {Card, CardContent} from "../../ui/card";
import {Switch} from "../../ui/switch";
import {Button} from "../../ui/button";
import {Badge} from "../../ui/badge";

export const FloatingProductReviewsWidget = () => {
    const [savedReviewRequests, setSavedReviewRequests] = useState<any>([])

    const {localState} = useLocalState();

    const defaultValues: any = {
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

    const form = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });


    const values = form.watch();
    // const watchLanguage = useWatch<any>(form.control, 'language');

    return (
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <Card>
                <CardContent className="frt-grid !frt-p-4">
                    <div className=" frt-flex frt-flex-col frt-gap-y-2 frt-border-b frt-border-gray-300 frt-pb-4">
                        <div className=" frt-flex frt-flex-col frt-gap-y-2">
                            <div className=" frt-flex frt-gap-x-2"><h4 className="frt-font-bold frt-text-lg">Floating
                                Product Reviews Widget
                            </h4>
                                <Badge>Learn more</Badge></div>
                            <span className={"frt-text-grayprimary"}>Present your reviews on a floating display so users can browse through reviews without leaving the page they are currently on.</span>
                        </div>
                        <div className={"frt-grid frt-justify-between frt-grid-cols-[30%_70%]"}>
                            <h4 className="frt-font-bold frt-text-sm">Activate Widget</h4>
                            <Switch id="activate-widget"
                                    defaultChecked={values.enable_product_review}
                            />
                        </div>
                    </div>
                    <div className="frt-flex frt-gap-x-6">
                        <Form {...form}>
                            <form className={"frt-flex frt-w-70% frt-flex-col frt-gap-y-4 frt-my-6"}>
                                <FormField
                                    control={form.control}
                                    name="write_a_review_button_text"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Title</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div className="frt-flex frt-justify-items-start">
                                                            <Input type="text"
                                                                   placeholder={"Reviews"}
                                                                   defaultValue={''}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="write_a_review_button_text"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Title background color</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div
                                                            className={"frt-grid frt-grid-flow-col frt-grid-cols-[85%_15%]"}>
                                                            <Input
                                                                className="!rwt-w-3/4 !rwt-rounded-e-none "
                                                                type="text"
                                                                // value={generalSettings?.color_settings?.primary_color}
                                                                readOnly={true}
                                                            />
                                                            <Input
                                                                id="primary-color"
                                                                className="!rwt-w-1/4 !rwt-p-0 !rwt-rounded-none rwt-cursor-pointer"
                                                                type={"color"}
                                                                placeholder="Primary Color"
                                                                // value={generalSettings?.color_settings?.primary_color}
                                                                // onChange={(e: any) => {
                                                                //     setGeneralSettings(
                                                                //         (prevSettings: GeneralSettingsType | null) => ({
                                                                //             ...prevSettings!,
                                                                //             color_settings: {
                                                                //                 ...prevSettings!.color_settings,
                                                                //                 primary_color: e.target.value,
                                                                //             },
                                                                //         })
                                                                //     );
                                                                // }}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="write_a_review_button_text"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Title text color</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div
                                                            className={" frt-grid frt-grid-flow-col frt-grid-cols-[85%_15%]"}>
                                                            <Input
                                                                className="!rwt-w-3/4 !rwt-rounded-e-none "
                                                                type="text"
                                                                // value={generalSettings?.color_settings?.primary_color}
                                                                readOnly={true}
                                                            />
                                                            <Input
                                                                id="primary-color"
                                                                className="!rwt-w-1/4 !rwt-p-0 !rwt-rounded-none rwt-cursor-pointer"
                                                                type={"color"}
                                                                placeholder="Primary Color"
                                                                // value={generalSettings?.color_settings?.primary_color}
                                                                // onChange={(e: any) => {
                                                                //     setGeneralSettings(
                                                                //         (prevSettings: GeneralSettingsType | null) => ({
                                                                //             ...prevSettings!,
                                                                //             color_settings: {
                                                                //                 ...prevSettings!.color_settings,
                                                                //                 primary_color: e.target.value,
                                                                //             },
                                                                //         })
                                                                //     );
                                                                // }}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button type={"submit"} className="frt-w-36">
                                    <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>
                                    <span>Save Changes</span>
                                </Button>
                            </form>
                        </Form>
                        <div className="frt-w-30% frt-my-6 frt-flex frt-flex-col frt-gap-y-4">
                            <div>
                                <h4 className="frt-font-bold frt-text-sm">Display</h4>
                            </div>
                            <div className={"frt-flex frt-flex-col frt-gap-y-3"}>
                                <div className="frt-flex frt-gap-x-2">
                                    <Switch id="show_rating_distribution"
                                            defaultChecked={true}
                                    />
                                    <span>Product thumbnails</span>
                                </div>
                                <div className="frt-flex frt-gap-x-2">
                                    <Switch id="show_rating_distribution"
                                            defaultChecked={true}
                                    />
                                    <span>Link to product page</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

}