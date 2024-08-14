import React, {ChangeEvent, useEffect, useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Input} from "../../ui/input";
import {ClipLoader} from "react-spinners";
import {useLocalState} from "../../zustand/localState";
import {Card, CardContent} from "../../ui/card";
import {Switch} from "../../ui/switch";
import {Button} from "../../ui/button";
import {Badge} from "../../ui/badge";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";

export const ReviewSidebarWidget = () => {
    const [savedReviewRequests, setSavedReviewRequests] = useState<any>([])

    const [updating, setUpdating] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const {localState} = useLocalState();

    const defaultValues = {
        is_active: true,
        button_text: "Reviews",
        position: "left",
        orientation: 'top_to_bottom',
        button_bg_color: "#5efdfb",
        button_text_color: "#22edff",
        hide_on_mobile: false,
        show_in_home_page: false,
        show_in_product_page: false,
        show_in_cart_page: false,
    };

    const schema = yup.object().shape({
        is_active: yup.boolean().required("is active is required"),
        position: yup.string().required('position is required'),
        button_text: yup.string().required('button text is required'),
        orientation: yup.string().required('orientation is required'),
        button_bg_color: yup.string().required('button bg color is required'),
        button_text_color: yup.string().required('button text color is required'),
        hide_on_mobile: yup.boolean().required('hidden on mobile is required'),
        show_in_home_page: yup.boolean().required('show in home page required'),
        show_in_product_page: yup.boolean().required('Show in product page is required'),
        show_in_cart_page: yup.boolean().required('show in cart page is required')
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });


    const values = form.watch();

    useEffect(() => {
        getReviewSidebarWidget();
    }, []);

    const getReviewSidebarWidget = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_sidebar_product_review_widget',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            form.reset(data);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    }

    const saveSidebarWidget = (e: any) => {
        e.preventDefault();
        setUpdating(true)
        axiosClient.post('', {
            method: 'save_sidebar_product_review_widget',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            is_active: values.is_active,
            position: values.position,
            button_text: values.button_text,
            orientation: values.orientation,
            button_bg_color: values.button_bg_color,
            button_text_color: values.button_text_color,
            hide_on_mobile: values.hide_on_mobile,
            show_in_home_page: values.show_in_home_page,
            show_in_product_page: values.show_in_product_page,
            show_in_cart_page: values.show_in_cart_page,
        }).then((response: any) => {
            let data = response.data.data
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setUpdating(false)
        });
    }
    // const watchLanguage = useWatch<any>(form.control, 'language');

    return (
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <Card>
                <Form {...form}>
                    <form>
                        <CardContent className="frt-grid !frt-p-4">
                            {loading ? (
                                <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}><ClipLoader
                                    color="black" size={"20px"}/></div>) : (
                                <>
                                    <div
                                        className=" frt-flex frt-flex-col frt-gap-y-2 frt-border-b frt-border-gray-300 frt-pb-4">
                                        <div className=" frt-flex frt-flex-col frt-gap-y-2">
                                            <div className=" frt-flex frt-gap-x-2"><h4
                                                className="frt-font-bold frt-text-lg">Reviews Sidebar Widget
                                            </h4>
                                                <Badge>Learn more</Badge></div>
                                            <span className={"frt-text-grayprimary"}>Give your visitors easy access to all of your store's reviews by clicking a tab on the side of their screen.</span>
                                        </div>
                                        <div className={"frt-grid frt-justify-between frt-grid-cols-[30%_70%]"}>
                                            <h4 className="frt-font-bold frt-text-sm">Activate Widget</h4>
                                            <Switch id="activate-widget"
                                                    checked={values.is_active}
                                                    onCheckedChange={(value: boolean) => {
                                                        form.setValue('is_active', value);
                                                    }}
                                            />
                                        </div>
                                    </div>
                                    <div className="frt-flex frt-gap-x-6">
                                        <div className={"frt-flex frt-w-70% frt-flex-col frt-gap-y-4 frt-my-6"}>
                                            <FormField
                                                control={form.control}
                                                name="position"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                                            <FormLabel>Position</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Select value={values.position}
                                                                            onValueChange={(value: string) => {
                                                                                form.setValue('position', value);
                                                                            }}>
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="position"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectItem
                                                                                    value="left">Left</SelectItem>
                                                                                <SelectItem
                                                                                    value="right">Right</SelectItem>
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
                                                name="orientation"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                                            <FormLabel>Orientation</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Select value={values.orientation}
                                                                            onValueChange={(value: string) => {
                                                                                form.setValue('orientation', value)
                                                                            }}
                                                                    >
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="Position"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectItem value="top_to_bottom">Top to
                                                                                    bottom</SelectItem>
                                                                                <SelectItem
                                                                                    value="bottom_to_top">Bottom to
                                                                                    top</SelectItem>
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
                                                name="button_text"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                                            <FormLabel>Button text</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <div className="frt-flex frt-justify-items-start">
                                                                        <Input type="text"
                                                                               value={values.button_text}
                                                                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                   form.setValue('button_text', event.target.value)
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
                                                name="button_bg_color"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                                            <FormLabel>Button background color</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <div
                                                                        className={"frt-grid frt-grid-flow-col frt-grid-cols-[85%_15%]"}>
                                                                        <Input
                                                                            className="!rwt-w-3/4 !rwt-rounded-e-none "
                                                                            type="text"
                                                                            value={values.button_bg_color}
                                                                            readOnly={true}
                                                                        />
                                                                        <Input
                                                                            id="primary-color"
                                                                            className="!rwt-w-1/4 !rwt-p-0 !rwt-rounded-none rwt-cursor-pointer"
                                                                            value={values.button_bg_color}
                                                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                form.setValue('button_bg_color', event.target.value)
                                                                            }}
                                                                            type={"color"}
                                                                            placeholder="Primary Color"
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
                                                name="button_text_color"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                                            <FormLabel>Button text color</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <div
                                                                        className={" frt-grid frt-grid-flow-col frt-grid-cols-[85%_15%]"}>
                                                                        <Input
                                                                            className="!rwt-w-3/4 !rwt-rounded-e-none "
                                                                            type="text"
                                                                            value={values?.button_text_color}
                                                                            readOnly={true}
                                                                        />
                                                                        <Input
                                                                            id="primary-color"
                                                                            className="!rwt-w-1/4 !rwt-p-0 !rwt-rounded-none rwt-cursor-pointer"
                                                                            type={"color"}
                                                                            value={values.button_text_color}
                                                                            placeholder="Button Text Color"
                                                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                                                form.setValue('button_text_color', event.target.value)
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
                                                name="hide_on_mobile"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                                            <FormLabel>Hide on mobile</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Switch id="show_rating_distribution"
                                                                            checked={values.hide_on_mobile}
                                                                            onCheckedChange={(value: boolean) => {
                                                                                form.setValue('hide_on_mobile', value);
                                                                            }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type={"submit"} className="frt-w-36" onClick={saveSidebarWidget}>
                                                {updating ?
                                                    <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span> : null}
                                                <span>Save Changes</span>
                                            </Button>
                                        </div>

                                        <div className="frt-w-30% frt-my-6 frt-flex frt-flex-col frt-gap-y-4">
                                            <div>
                                                <h4 className="frt-font-bold frt-text-sm">Additional Widget</h4>
                                            </div>
                                            <div className={"frt-flex frt-flex-col frt-gap-y-3"}>
                                                <div className="frt-flex frt-gap-x-2">
                                                    <Switch id="activate_widget"
                                                            checked={values.show_in_home_page}
                                                            onCheckedChange={(value: boolean) => {
                                                                form.setValue('show_in_home_page', value)
                                                            }}
                                                    />
                                                    <span>Home Page</span>
                                                </div>
                                                <div className="frt-flex frt-gap-x-2">
                                                    <Switch id="show_in_product_page"
                                                            checked={values.show_in_product_page}
                                                            onCheckedChange={(value: boolean) => {
                                                                form.setValue('show_in_product_page', value)
                                                            }}
                                                    />
                                                    <span>Product Page</span>
                                                </div>
                                                <div className="frt-flex frt-gap-x-2">
                                                    <Switch id="show_in_cart_page"
                                                            checked={values.show_in_cart_page}
                                                            onCheckedChange={(value: boolean) => {
                                                                form.setValue('show_in_cart_page', value)
                                                            }}
                                                    />
                                                    <span>Cart Page</span>
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