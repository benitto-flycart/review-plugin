import React, {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "../../ui/form"
import {Input} from "../../ui/input";
import {useForm} from "react-hook-form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";

const BrandingSetting = () => {
    const [loading, setLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState} = useLocalState();

    let frame: any;
    const runUploader = (event: any) => {
        event.preventDefault()

        // If the media frame already exists, reopen it.
        if (frame) {
            frame.open()
            return
        }

        // Create a new media frame
        //@ts-ignore
        frame = wp.media({
            title: 'Select or Upload Media Of Your Chosen Persuasion',
            button: {
                text: 'Use this media',
            },
            multiple: false, // Set to true to allow multiple files to be selected
        })
        // Finally, open the modal on click
        frame.open()
    }


    const schema = yup.object().shape({
        enable_logo: yup.boolean().required("Enable logo is required"),
        logo: yup.string().optional(),
        corner_radius: yup.string().required("Corner Radius is required"),
        rating_icon_style: yup.string().required("Rating Icon Style is required"),
        rating_rgb_color: yup.string().required("Rating color is required"),
        enable_review_branding: yup.boolean().required("Enable Review Branding is required"),
        enable_email_banners: yup.boolean().required("Enable email Banners is required"),
        banner_src: yup.string().optional(),
        appearance: yup.string().required("Appearance is required"),
        appearance_options: yup.object().shape({
            email_background_color: yup.string().required('Email Background color is required'),
            content_background_color: yup.string().required("Content Background color is required"),
            email_text_color: yup.string().required("Email text color is required"),
            button_bg_color: yup.string().required("Button Background color is required"),
            button_border_color: yup.string().required("Button Border color is required"),
            button_title_color: yup.string().required("Button title color is required"),
            font_type: yup.string().required("Font type is required"),
            font_size: yup.number()
                .min(5, 'Minimum it should be 5')
                .max(20, 'Maximum it should be 5')
                .required("Font size is required"),
        })
    });

    const defaultValues = {
        corner_radius: 'rounded',
        enable_logo: true,
        logo: '',
        rating_icon_style: 'rounded',
        enable_review_branding: true,
        enable_email_banners: false,
        banner_src: '',
        rating_rgb_color: '#ff224f',
        appearance: 'default',
        appearance_options: {
            email_background_color: '#fffff',
            content_background_color: '#fffff',
            email_text_color: '#fffff',
            button_bg_color: '#fffff',
            button_border_color: '#fffff',
            button_title_color: '#fffff',
            font_type: 'arial',
            font_size: 10,
        },
    };

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: any) => {
        // Handle form data here
        console.log(data);
        saveBrandSettings(data)

    };

    const getBrandSettings = () => {
        axiosClient.post('', {
            method: 'get_brand_settings',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            form.reset(settings);
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    };

    const saveBrandSettings = (data: any) => {
        setSaveChangesLoading(true)
        axiosClient.post('', {
            method: 'save_brand_settings',
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

    const values = form.watch();

    console.log('printing errors');
    console.log(form.formState.errors);

    useEffect(() => {
        setLoading(true);
        getBrandSettings();
    }, []);

    return (
        <Card>
            <CardContent className="frt-my-4 frt-grid !frt-p-2">
                {loading ? (
                    <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}><ClipLoader color="black" size={"20px"}/></div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <FormField
                                control={form.control}
                                name="enable_logo"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Enable Logo</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <Switch id="enable-logo"
                                                            defaultChecked={values.enable_logo}
                                                            onCheckedChange={(value: any) => {
                                                                form.setValue('enable_logo', value)
                                                            }}
                                                    />
                                                </FormControl>
                                                <FormDescription>Enable Logo</FormDescription>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="logo"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 frt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel className="frt-w-full">Logo</FormLabel>
                                            <div className="frt-w-full">
                                                <div
                                                    className="frt-border frt-border-dashed  frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={runUploader}>Upload File</span>
                                                </div>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="corner_radius"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 frt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel className="frt-w-full">Corner Radius</FormLabel>
                                            <div className="frt-w-full">
                                                <FormControl>
                                                    <Select value={values.corner_radius}
                                                            onValueChange={(value: string) => {
                                                                form.setValue('corner_radius', value);
                                                            }}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Corner Radius"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="sharp">Sharp</SelectItem>
                                                                <SelectItem value="slightly_rounded">Slightly
                                                                    Rounded</SelectItem>
                                                                <SelectItem value="rounded">Rounded</SelectItem>
                                                                <SelectItem value="extra_rounded">Extra
                                                                    Rounded</SelectItem>
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

                            <div className="frt-m-2 frt-my-2 frt-grid frt-grid-cols-[30%_70%]">
                                <h3 className="frt-font-bold">Rating Icon</h3>
                                <div className="frt-grid frt-grid-cols-[30%_70%]">
                                    <FormField
                                        control={form.control}
                                        name="rating_icon_style"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button variant="outline">Rating Icon</Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80" side={'right'}>
                                                            <div className="frt-grid frt-gap-4">
                                                                <div className="frt-space-y-2">
                                                                    <h4 className="frt-font-medium frt-leading-none">Dimensions</h4>
                                                                    <p className="frt-text-sm frt-text-muted-foreground">
                                                                        Set the dimensions for the layer.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormDescription>Icon Style</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="rating_rgb_color"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl className="frt-w-1/4">
                                                    <Input type={"color"}
                                                           value={values.rating_rgb_color}
                                                           className={"!frt-w-[50px]"}
                                                           onChange={(e: any) => {
                                                               form.setValue('rating_rgb_color', e.target.value)
                                                           }}/>
                                                </FormControl>
                                                <FormDescription>RGB color (e.g. 1A2B3C)</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="enable_review_branding"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Review Branding</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <Switch id="review-branding"
                                                            checked={values.enable_review_branding}
                                                            onCheckedChange={(value: any) => {
                                                                console.log(value);
                                                                form.setValue('enable_review_branding', value)
                                                            }}
                                                    />
                                                </FormControl>
                                                <FormDescription>Option for Review Branding</FormDescription>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="enable_email_banners"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Enable Email Banners</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <Switch
                                                        id="email-banners"
                                                        checked={values.enable_email_banners}
                                                        onCheckedChange={(value: any) => {
                                                            form.setValue('enable_email_banners', value)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormDescription>Enable Email Banners</FormDescription>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="banner_src"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 frt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel className="frt-w-full">Banner</FormLabel>
                                            <div className="frt-w-full">
                                                <div
                                                    className="frt-border frt-border-dashed  frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={runUploader}>Upload File</span>
                                                </div>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="appearance"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Appearance</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <Select value={values.appearance}
                                                            onValueChange={(value: string) => {
                                                                console.log(value)
                                                                form.setValue('appearance', value)
                                                            }}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Appearance"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="default">Default</SelectItem>
                                                                <SelectItem value="custom">Custom</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormDescription>Enable Email Appearance</FormDescription>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/*Custom Fields*/}

                            <FormField
                                control={form.control}
                                name="appearance_options.email_background_color"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Email Background Color</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                        <span>#</span>
                                                        <Input type="color"
                                                               className={"!frt-w-[50px]"}
                                                               value={values.appearance_options.email_background_color}
                                                               onChange={(e: any) => {
                                                                   form.setValue('appearance_options.email_background_color', e.target.value)
                                                               }}
                                                        />
                                                        <span>show</span>
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
                                name="appearance_options.content_background_color"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Content Background Color</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                        <span>#</span>
                                                        <Input type="color"
                                                               className={"!frt-w-[50px]"}
                                                               value={values.appearance_options.content_background_color}
                                                               onChange={(e: any) => {
                                                                   form.setValue('appearance_options.content_background_color', e.target.value)
                                                               }}
                                                        />
                                                        <span>show</span>
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
                                name="appearance_options.email_text_color"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Email text color</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                        <span>#</span>
                                                        <Input type="color"
                                                               value={values.appearance_options.email_text_color}
                                                               className={"!frt-w-[50px]"}
                                                               onChange={(e: any) => {
                                                                   form.setValue('appearance_options.email_text_color', e.target.value)
                                                               }}
                                                        />
                                                        <span>show</span>
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
                                name="appearance_options.button_bg_color"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Button Background Color</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                        <span>#</span>
                                                        <Input type="color"
                                                               className={"!frt-w-[50px]"}
                                                               value={values.appearance_options.button_bg_color}
                                                               onChange={(e: any) => {
                                                                   form.setValue('appearance_options.button_bg_color', e.target.value)
                                                               }}
                                                        />
                                                        <span>show</span>
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
                                name="appearance_options.button_border_color"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Button Border Color</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                        <span>#</span>
                                                        <Input type="color"
                                                               value={values.appearance_options.button_border_color}
                                                               className={"!frt-w-[50px]"}
                                                               onChange={(e: any) => {
                                                                   form.setValue('appearance_options.button_border_color', e.target.value)
                                                               }}
                                                        />
                                                        <span>show</span>
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
                                name="appearance_options.button_title_color"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Button Title Color</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                        <span>#</span>
                                                        <Input type="color"
                                                               className={"!frt-w-[50px]"}
                                                               value={values.appearance_options.button_title_color}
                                                               onChange={(e: any) => {
                                                                   form.setValue('appearance_options.button_title_color', e.target.value)
                                                               }}
                                                        />
                                                        <span>show</span>
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
                                name="appearance_options.font_type"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Font Type</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <Select
                                                        value={values.appearance_options.font_type}
                                                        onValueChange={(value: string) => {
                                                            form.setValue('appearance_options.font_type', value)
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Corner Radius"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="arial">Arial</SelectItem>
                                                                <SelectItem value="times_new_roman">Times New
                                                                    Roman</SelectItem>
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
                                name="appearance_options.font_size"
                                render={({field}) => (
                                    <FormItem className="frt-m-2 rwt-my-2">
                                        <div
                                            className="frt-grid frt-grid-cols-[30%_70%]">
                                            <FormLabel>Font Size</FormLabel>
                                            <div>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Font size"
                                                        value={values.appearance_options.font_size}
                                                        onChange={(e) => {
                                                            let value = e.target.value ? parseInt(e.target.value) : 0;
                                                            form.setValue("appearance_options.font_size", value);
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
                                {saveChangesLoading && (
                                    <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>)}
                                <span>Save Changes</span>
                            </Button>
                        </form>
                    </Form>
                )}

            </CardContent>
        </Card>
    )
        ;
};

export default BrandingSetting;
