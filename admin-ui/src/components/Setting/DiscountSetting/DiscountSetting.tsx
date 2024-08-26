import React, {useEffect, useState} from "react";
import {useLocalState} from "@/src/components/zustand/localState";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {useForm} from "react-hook-form";
import {Input} from "../../ui/input";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {LoadingSpinner} from "../../ui/loader";

const DiscountSetting = () => {
    const [loading, setLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState, setLocalState} = useLocalState();
    const [errors, setErrors] = useState<any>();

    const defaultValues = {
        enable_photo_discount: true,
        photo_discount_type: 'fixed',
        photo_discount_value: '',
        enable_video_discount: true,
        video_discount_type: 'fixed',
        video_discount_value: '',
    };

    const schema = yup.object().shape({
        enable_photo_discount: yup.boolean().required('Enable Photo Discount is required'),
        photo_discount_type: yup.string().required('Photo Discount Type is required'),
        photo_discount_value: yup.string().required('Photo Discount Value is required'),
        enable_video_discount: yup.boolean().required('Enable Video Discount is required'),
        video_discount_type: yup.string().required('Enable Video Type is required'),
        video_discount_value: yup.string().required('Video Discount Value is required'),
    });

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: any) => {
        saveDiscountSettings(data)
    };

    const values = form.watch();

    const getDiscountSettings = () => {
        axiosClient.post('', {
            method: 'get_discount_settings',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            console.log(settings)
            form.reset(settings);
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    };

    const saveDiscountSettings = (data: any) => {
        setSaveChangesLoading(true)
        axiosClient.post('', {
            method: 'save_discount_settings',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            ...data
        }).then((response: any) => {
            let data = response.data.data
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setSaveChangesLoading(false)
        });
    };

    useEffect(() => {
        setLoading(true);
        getDiscountSettings()
    }, []);

    return (
        <Card>
            {loading ? (
                <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}>
                    <LoadingSpinner/>
                </div>
            ) : (
                <CardContent className="frt-my-4 frt-grid !frt-p-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="frt-m-2 rwt-my-2">
                                <FormField
                                    control={form.control}
                                    name="enable_photo_discount"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Enable Photo Discount</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch
                                                            id="enable_photo_discount"
                                                            checked={values.enable_photo_discount}
                                                            onCheckedChange={(value: boolean) => {
                                                                form.setValue('enable_photo_discount', value)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Incentivize customers to leave a photo review by
                                                        offering a
                                                        discount for their next purchase</FormDescription>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {values.enable_photo_discount ? (
                                <>
                                    <div className="frt-m-2 rwt-my-2">
                                        <FormField
                                            control={form.control}
                                            name="photo_discount_type"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div
                                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                                        <FormLabel>Photo Discount Type</FormLabel>
                                                        <div>
                                                            <FormControl>
                                                                <Select value={values.photo_discount_type}>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Select Type"/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem
                                                                                value="percentage">Percentage</SelectItem>
                                                                            <SelectItem value="fixed">Fixed</SelectItem>
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
                                    </div>

                                    <div className="frt-m-2 rwt-my-2">
                                        <FormField
                                            control={form.control}
                                            name="photo_discount_value"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div
                                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                                        <FormLabel>Value</FormLabel>
                                                        <div>
                                                            <FormControl>
                                                                <Input type="number" placeholder="Value"
                                                                       value={values.photo_discount_value}
                                                                       onChange={(e: any) => {
                                                                           form.setValue('photo_discount_value', e.target.value);
                                                                       }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>
                            ) : null}


                            {/*//Video Discounts*/}

                            <div className="frt-m-2 rwt-my-2">
                                <FormField
                                    control={form.control}
                                    name="enable_video_discount"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Enable Video Discount</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="enable_video_discount"
                                                                checked={values.enable_video_discount}
                                                                onCheckedChange={(value: boolean) => {
                                                                    form.setValue('enable_video_discount', value)
                                                                }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Incentivize customers to leave a Video review by
                                                        offering a
                                                        discount for their next purchase</FormDescription>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {values.enable_video_discount ? (
                                <>
                                    <div className="frt-m-2 rwt-my-2">
                                        <FormField
                                            control={form.control}
                                            name="video_discount_type"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div
                                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                                        <FormLabel>Video Discount Type</FormLabel>
                                                        <div>
                                                            <FormControl>
                                                                <Select
                                                                    value={values.video_discount_type}
                                                                    onValueChange={(value: string) => {
                                                                        form.setValue('video_discount_type', value);
                                                                    }}
                                                                >
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Select Type"/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem
                                                                                value="percentage">Percentage</SelectItem>
                                                                            <SelectItem value="fixed">Fixed</SelectItem>
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
                                    </div>

                                    <div className="frt-m-2 rwt-my-2">
                                        <FormField
                                            control={form.control}
                                            name="video_discount_value"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div
                                                        className="frt-grid frt-grid-cols-[30%_70%]">
                                                        <FormLabel>Value</FormLabel>
                                                        <div>
                                                            <FormControl>
                                                                <Input type="number"
                                                                       value={values.video_discount_value}
                                                                       placeholder="Value"
                                                                       onChange={(e: any) => {
                                                                           form.setValue('video_discount_value', e.target.value);
                                                                       }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>
                            ) : null}

                            <Button type={"submit"}>
                                {saveChangesLoading && (
                                    <span className="frt-mx-2">
                                        <LoadingSpinner/>
                                    </span>)}
                                <span>Save Changes</span>
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            )}
        </Card>
    );
};

export default DiscountSetting;
