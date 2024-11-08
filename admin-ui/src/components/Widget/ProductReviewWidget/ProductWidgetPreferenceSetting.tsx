import React, {useContext, useEffect} from "react";
import {ProductWidgetContext} from "./ProductReviewContextAPI";
import {Label} from "../../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import {Switch} from "../../ui/switch";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import {SampleReviewsContext} from "../SampleReviewsAPI";

const ProductWidgetPreferenceSetting = ({name}: { name: string }) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext);
    const {setEmptyReview} = useContext<any>(SampleReviewsContext);

    useEffect(() => {
       return ()=>{
           setEmptyReview(false)
       }
    }, []);

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>

            <SidebarDetail>
                <SidebarDetailSection title={"Display"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">
                            Product Reviews Widget
                        </Label>
                        <Select
                            defaultValue={widget.preferences.product_review_widget}
                            onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.preferences.product_review_widget = value;
                                });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent className={"!frt-z-10000000"}>
                                <SelectGroup>
                                    <SelectItem value="always_shown">Always Shown</SelectItem>
                                    <SelectItem value="hidden_when_empty">
                                        Hidden when empty
                                    </SelectItem>
                                    <SelectItem value="always_hidden">Always Hidden</SelectItem>
                                    <SelectItem value="all_reviews_when_empty">
                                        All Reviews when empty
                                    </SelectItem>
                                    <SelectItem value="all_reviews_always">
                                        All Reviews Always
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_date"
                                defaultChecked={widget.preferences.toggle_loading_screen}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.toggle_loading_screen = value;
                                    });
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">
                                Toggle loading screen
                            </Label>
                        </div>
                        <p>Enable to show a loading screen in the widget area.</p>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_date"
                                defaultChecked={widget.preferences.toggle_empty_review}
                                onCheckedChange={(value: boolean) => {
                                    setEmptyReview(value);
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.toggle_empty_review = value;
                                    });
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">
                                Toggle empty review
                            </Label>
                        </div>
                        <p>Enable to show an empty review screen in the widget area.</p>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_write_a_review_button"
                                defaultChecked={widget.preferences.show_write_a_review}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.show_write_a_review = value;
                                    });
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="show_write_a_review_button">
                                Show a "Write a review button"
                            </Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_date"
                                defaultChecked={widget.preferences.show_review_date}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.show_review_date = value;
                                    });
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="show_review_date">Show review date</Label>
                        </div>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">
                            Thumbnail Size
                        </Label>
                        <Select
                            defaultValue={widget.preferences.thumbnail_size}
                            onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.preferences.thumbnail_size = value;
                                });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="small">Small</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="large">Large</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">
                            Reviews Per Page
                        </Label>
                        <Select
                            defaultValue={widget.preferences.reviews_per_page}
                            onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.preferences.reviews_per_page = value;
                                });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>
                </SidebarDetailSection>

                <SidebarDetailSection title={"Sorting"}>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_sorting_options"
                                defaultChecked={widget.preferences.show_sorting_options}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.show_sorting_options = value;
                                    });
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="show_sorting_options">Show Sorting Options</Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">
                            Default Sorting
                        </Label>
                        <Select
                            defaultValue={widget.preferences.default_sorting}
                            onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.preferences.default_sorting = value;
                                });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="highest">Highest</SelectItem>
                                    <SelectItem value="lowest">Lowest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>
                </SidebarDetailSection>

                <SidebarDetailSection title={"Filtering"}>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_sorting_options"
                                defaultChecked={widget.preferences.show_rating_options}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.show_rating_options = value;
                                    });
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="show_sorting_options">Show rating Options</Label>
                        </div>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    );
};

export default ProductWidgetPreferenceSetting;
