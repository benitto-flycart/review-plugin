import React, {useState} from 'react';
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

const PopupWidget = () => {
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
                            <div className=" frt-flex frt-gap-x-2"><h4 className="frt-font-bold frt-text-lg">Pop-up
                                Widget</h4>
                                <Badge>Learn more</Badge></div>
                            <span className={"frt-text-grayprimary"}>Spotlight relevent reviews and drive visitors to your product pages with a subtle social proof pop-up.</span>
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
                                    name="widget_colors"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Position</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Select defaultValue={values.position}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Position"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="sharp">Bottom-left
                                                                        corner</SelectItem>
                                                                    <SelectItem value="slightly_rounded">Bottom-right
                                                                        corner</SelectItem>
                                                                    <SelectItem value="rounded">Custom</SelectItem>
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
                                                <FormLabel className="frt-w-full">Minimum rating to display</FormLabel>
                                                <div className="frt-w-full">
                                                    <FormControl>
                                                        <Select defaultValue={values.minimum_rating}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Header Layout"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="minimal">3 stars up</SelectItem>
                                                                    <SelectItem value="compact">4 stars up</SelectItem>
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
                                    name="write_a_review_button_text"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Initial Delay</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div className="frt-flex frt-justify-items-start">
                                                            <Input type="text" className={"!frt-rounded-e-none"}
                                                                   defaultValue={''}
                                                            />
                                                            <div
                                                                className="frt-border frt-border-l-0 frt-rounded-s-none frt-border-grayprimary frt-flex frt-items-center frt-px-3 frt-rounded frt-h-9">seconds
                                                            </div>
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
                                                <FormLabel>Delay between pop-ups</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div className="frt-flex frt-justify-items-start">
                                                            <Input type="text" className={"!frt-rounded-e-none"}
                                                                   defaultValue={''}
                                                            />
                                                            <div
                                                                className="frt-border frt-border-l-0 frt-rounded-s-none frt-border-grayprimary frt-flex frt-items-center frt-px-3 frt-rounded frt-h-9">seconds
                                                            </div>
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
                                                <FormLabel>Pop-up display time</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div className="frt-flex frt-justify-items-start">
                                                            <Input type="text" className={"!frt-rounded-e-none"}
                                                                   defaultValue={''}
                                                            />
                                                            <div
                                                                className="frt-border frt-border-l-0 frt-rounded-s-none frt-border-grayprimary frt-flex frt-items-center frt-px-3 frt-rounded frt-h-9">seconds
                                                            </div>
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
                                                <FormLabel>Maximum per page</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <div className="frt-flex frt-justify-items-start">
                                                            <Input type="text" className={"!frt-rounded-e-none"}
                                                                   defaultValue={''}
                                                            />
                                                            <div
                                                                className="frt-border frt-border-l-0 frt-rounded-s-none frt-border-grayprimary frt-flex frt-items-center frt-px-3 frt-rounded frt-h-9">pop-ups
                                                            </div>
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
                                    name="show_sorting_options"
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className="frt-grid frt-grid-cols-[30%_70%]">
                                                <FormLabel>Product thumbnail</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="review-branding"
                                                                defaultChecked={true}
                                                        />
                                                    </FormControl>
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
                                                <FormLabel>Hide on mobile</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="show_rating_distribution"
                                                                defaultChecked={true}
                                                        />
                                                    </FormControl>
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
                                                <FormLabel>Auto-play video preview</FormLabel>
                                                <div>
                                                    <FormControl>
                                                        <Switch id="show_rating_distribution"
                                                                defaultChecked={true}
                                                        />
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
                                <h4 className="frt-font-bold frt-text-sm">Activate Widget</h4>
                            </div>
                            <div className={"frt-flex frt-flex-col frt-gap-y-3"}>
                                <div className="frt-flex frt-gap-x-2">
                                    <Switch id="show_rating_distribution"
                                            defaultChecked={true}
                                    />
                                    <span>Home Page</span>
                                </div>
                                <div className="frt-flex frt-gap-x-2">
                                    <Switch id="show_rating_distribution"
                                            defaultChecked={true}
                                    />
                                    <span>Product Page</span>
                                </div>
                                <div className="frt-flex frt-gap-x-2">
                                    <Switch id="show_rating_distribution"
                                            defaultChecked={true}
                                    />
                                    <span>Cart Page</span>
                                </div>
                                <div className="frt-flex frt-gap-x-2">
                                    <Switch id="show_rating_distribution"
                                            defaultChecked={true}
                                    />
                                    <span>Other Page</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};

export default PopupWidget;