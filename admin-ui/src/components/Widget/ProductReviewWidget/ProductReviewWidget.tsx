import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Input} from "../../ui/input";
import {ClipLoader} from "react-spinners";
import {useLocalState} from "../../zustand/localState";
import {Card, CardContent} from "../../ui/card";
import {Switch} from "../../ui/switch";
import {Button} from "../../ui/button";
import {Badge} from "../../ui/badge";

const ProductReviewWidget = () => {
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
                    <div>
                        <Form {...form}>
                            <form className={"frt-flex frt-flex-col frt-gap-y-4 frt-my-6"}>
                                <FormField
                                    control={form.control}
                                    name="widget_colors"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Widget Colors</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Select defaultValue={values.corner_radius}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Corner Radius"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="sharp">Black Text</SelectItem>
                                                                    <SelectItem value="slightly_rounded">White
                                                                        Text</SelectItem>
                                                                    <SelectItem value="rounded">Custom</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>Widget Colors</FormDescription>
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
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Corner Radius</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Select defaultValue={values.corner_radius}
                                                        >
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
                                                    <FormDescription>Widget Colors</FormDescription>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="header_layout"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel className="frt-w-full">Header Layout</FormLabel>
                                                <div className="frt-w-full">
                                                    <FormControl>
                                                        <Select defaultValue={values.header_layout}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Header Layout"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="minimal">Minimal</SelectItem>
                                                                    <SelectItem value="compact">Compact</SelectItem>
                                                                    <SelectItem value="rounded">Expand</SelectItem>
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
                                    name="enable_product_review"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Review Branding</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="review-branding"
                                                                defaultChecked={values.enable_product_review}
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
                                    name="write_a_review_button_text"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Write a Review Button Text</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div className="frt-flex frt-justify-items-start frt-gap-2">
                                                            <Input type="text"
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
                                    name="reviews_per_page"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Reviews Per Page</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Select defaultValue={"5"}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Header Layout"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="5">5</SelectItem>
                                                                    <SelectItem value="10">10</SelectItem>
                                                                    <SelectItem value="20">20</SelectItem>
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
                                    name="default_sorting"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Default Sorting</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Select defaultValue={"featured"}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Header Layout"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="featured">Featured</SelectItem>
                                                                    <SelectItem value="newest">Newest</SelectItem>
                                                                    <SelectItem value="highest">Highest
                                                                        Rating</SelectItem>
                                                                    <SelectItem value="lowest">Lowest
                                                                        Rating</SelectItem>
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
                                    name="show_sorting_options"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Show Sorting Options</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="review-branding"
                                                                defaultChecked={true}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Show Sorting Options</FormDescription>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="show_rating_distribution"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Show Rating Distribution</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="show_rating_distribution"
                                                                defaultChecked={true}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Show Rating Distribution</FormDescription>
                                                    <FormMessage/>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <div className="frt-flex frt-flex-col frt-gap-y-4">
                                    <h4 className="frt-font-bold frt-text-base">Content</h4>
                                    <div>
                                        <div className="frt-flex frt-flex-col frt-gap-y-4">
                                            <FormField
                                                control={form.control}
                                                name="review"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-gap-3">
                                                            <FormLabel>Review</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Input type={"text"}
                                                                           placeholder={"Review(s)"}></Input>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="write_a_review_button_title"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-gap-3">
                                                            <FormLabel>Write a Review Button Title</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Input type={"text"}
                                                                           placeholder={"Write a Review"}></Input>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="no_reviews_title"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-gap-3">
                                                            <FormLabel>No Reviews Title</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Input type={"text"}
                                                                           placeholder={"Be the first to"}></Input>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="show_more_reviews_title"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-gap-3">
                                                            <FormLabel>Show More Reviews Title</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Input type={"text"}
                                                                           placeholder={"Show More Reviews Title"}></Input>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="link_to_product_button_text"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-gap-3">
                                                            <FormLabel>Link To Product Page Button Title</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Input type={"text"}
                                                                           placeholder={"View Product"}></Input>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="item_type_title"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div
                                                            className="frt-grid frt-gap-3">
                                                            <FormLabel>Item Type Title</FormLabel>
                                                            <div>
                                                                <FormControl>
                                                                    <Input type={"text"}
                                                                           placeholder={"Item Type"}></Input>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button type={"submit"} className="frt-w-36">
                                    <span className="frt-mx-2"><ClipLoader color="white" size={"20px"}/></span>
                                    <span>Save Changes</span>
                                </Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};

export default ProductReviewWidget;