import React, {ChangeEvent, useEffect, useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Input} from "../../ui/input";
import {useLocalState} from "../../zustand/localState";
import {Card, CardContent} from "../../ui/card";
import {Switch} from "../../ui/switch";
import {Button} from "../../ui/button";
import {Badge} from "../../ui/badge";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {LoadingSpinner} from "../../ui/loader";

export const FloatingProductReviewsWidget = () => {
    const [savedReviewRequests, setSavedReviewRequests] = useState<any>([])
    const [updating, setUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const {localState} = useLocalState();

    const defaultValues: any = {
        is_active: true,
        title: "Reviews",
        title_bg_color: "#22edff",
        title_text_color: "#5efdfb",
        product_thumbnail_enabled: true,
        link_to_product_page_enabled: false
    };

    const available_languages = localState.available_languages;

    const schema = yup.object().shape({
        is_active: yup.boolean().required("is active is required"),
        title: yup.string().required("Title is required"),
        title_bg_color: yup.string().required("Title bg color is required"),
        title_text_color: yup.string().required("title text color is required"),
        button_text: yup.string().required("Button Text is required"),
        product_thumbnail_enabled: yup.boolean().required("Product thumbnail enabled is required"),
        link_to_product_page_enabled: yup.boolean().required("Link to product enabled is required"),
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });


    const values = form.watch();

    useEffect(() => {
        getFloatingProductWidget();
    }, []);
    // const watchLanguage = useWatch<any>(form.control, 'language');


    const getFloatingProductWidget = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_floating_product_review_widget',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            is_active: values.is_active,
            title: values.title,
            title_bg_color: values.title_bg_color,
            title_text_color: values.title_text_color,
            button_text: values.button_text,
            product_thumbnail_enabled: values.product_thumbnail_enabled,
            link_to_product_page_enabled: values.link_to_product_page_enabled,
        }).then((response: any) => {
            let data = response.data.data
            form.reset(data);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    }
    const saveFloatingProductReview = (e: any) => {
        e.preventDefault();
        setUpdating(true)
        axiosClient.post('', {
            method: 'save_floating_product_review_widget',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            is_active: values.is_active,
            title: values.title,
            title_bg_color: values.title_bg_color,
            title_text_color: values.title_text_color,
            button_text: values.button_text,
            product_thumbnail_enabled: values.product_thumbnail_enabled,
            link_to_product_page_enabled: values.link_to_product_page_enabled,
        }).then((response: any) => {
            let data = response.data.data
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setUpdating(false)
        });
    }

    return (
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <Card>
                <Form {...form}>
                    <form>
                        <CardContent className="frt-grid !frt-p-4">
                            {loading ? (
                                <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}>
                                    <LoadingSpinner/>
                                </div>) : (
                                <>
                                    <div
                                        className=" frt-flex frt-flex-col frt-gap-y-2 frt-border-b frt-border-gray-300 frt-pb-4">
                                        <div className=" frt-flex frt-flex-col frt-gap-y-2">
                                            <div className=" frt-flex frt-gap-x-2"><h4
                                                className="frt-font-bold frt-text-lg">Floating Product Reviews Widget
                                            </h4>
                                                <Badge>Learn more</Badge></div>
                                            <span className={"frt-text-grayprimary"}>Present your reviews on a floating display so users can browse through reviews without leaving the page they are currently on.</span>
                                        </div>
                                        <div className={"frt-grid frt-justify-between frt-grid-cols-[30%_70%]"}>
                                            <h4 className="frt-font-bold frt-text-sm">Activate Widget</h4>
                                            <Switch id="activate-widget"
                                                    defaultChecked={values.is_active}
                                                    onCheckedChange={(value: boolean) => {
                                                        form.setValue('is_active', value);
                                                    }}/>
                                        </div>
                                    </div>
                                    <div className="frt-flex frt-gap-x-6">
                                        <div className={"frt-flex frt-w-70% frt-flex-col frt-gap-y-4 frt-my-6"}>
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
                                                                               defaultValue={values.title}
                                                                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                   form.setValue('title', event.target.value)
                                                                               }}
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
                                                name="title_bg_color"
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
                                                                            value={values.title_bg_color}
                                                                            readOnly={true}
                                                                        />
                                                                        <Input
                                                                            id="title-bg-color"
                                                                            className="!rwt-w-1/4 !rwt-p-0 !rwt-rounded-none rwt-cursor-pointer"
                                                                            type={"color"}
                                                                            value={values.title_bg_color}
                                                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                form.setValue('title_bg_color', event.target.value)
                                                                            }}
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
                                                                            value={values.title_text_color}
                                                                            readOnly={true}
                                                                        />
                                                                        <Input
                                                                            id="primary-color"
                                                                            className="!rwt-w-1/4 !rwt-p-0 !rwt-rounded-none rwt-cursor-pointer"
                                                                            type={"color"}
                                                                            value={values.title_text_color}
                                                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                form.setValue('title_text_color', event.target.value)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type={"submit"} className="frt-w-36"
                                                    onClick={saveFloatingProductReview}>
                                                {updating ?
                                                    <span className="frt-mx-2">
                                                        <LoadingSpinner/>
                                                    </span> : null}
                                                <span>Save Changes</span>
                                            </Button>
                                        </div>
                                        <div className="frt-w-30% frt-my-6 frt-flex frt-flex-col frt-gap-y-4">
                                            <div>
                                                <h4 className="frt-font-bold frt-text-sm">Display</h4>
                                            </div>
                                            <div className={"frt-flex frt-flex-col frt-gap-y-3"}>
                                                <div className="frt-flex frt-gap-x-2">
                                                    <Switch id="product_thumbnail_enabled"
                                                            checked={values.product_thumbnail_enabled}
                                                            onCheckedChange={(value: boolean) => {
                                                                form.setValue('product_thumbnail_enabled', value)
                                                            }}
                                                    />
                                                    <span>Product thumbnails</span>
                                                </div>
                                                <div className="frt-flex frt-gap-x-2">
                                                    <Switch id="link_to_product_page_enabled"
                                                            checked={values.link_to_product_page_enabled}
                                                            onCheckedChange={(value: boolean) => {
                                                                form.setValue('link_to_product_page_enabled', value)
                                                            }}
                                                    />
                                                    <span>Link to product page</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </div>
    );
}