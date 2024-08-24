import React, {useContext} from "react";
import {ProductWidgetContext} from "./ProductReviewContextAPI";
import {Label} from "../../ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";

const ProductWidgetPreferenceSetting = ({name}: { name: string }) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>

            <SidebarDetail>
                <SidebarDetailSection title={'Display'}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Product Reviews Widget</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent className={"!frt-z-10000000"}>
                                <SelectGroup>
                                    <SelectItem value="always_shown">Always Shown</SelectItem>
                                    <SelectItem value="hidden_when_empty">Hidden when empty</SelectItem>
                                    <SelectItem value="always_hidden">Always Hidden</SelectItem>
                                    <SelectItem value="all_reviews_when_empty">All Reviews when
                                        empty</SelectItem>
                                    <SelectItem value="all_reviews_always">All Reviews Always</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_write_a_review_button"
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.preferences.show_write_a_review = value;
                                    })
                                }}
                            />
                            <Label htmlFor="show_write_a_review_button">Show a "Write a review button"</Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch id="show_review_date"
                                    onCheckedChange={(value: boolean) => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.preferences.show_review_date = value;
                                        })
                                    }}
                            />
                            <Label htmlFor="show_review_date">Show review date</Label>
                        </div>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch id="show_review_type" onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.preferences.show_item_type = value;
                                })
                            }}/>
                            <Label htmlFor="show_review_type">Show item type</Label>
                        </div>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Thumbnail Size</Label>
                        <Select>
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

                        <Label className={"frt-text-xs"} htmlFor="none">Reviews Per Page</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="small">20</SelectItem>
                                    <SelectItem value="medium">25</SelectItem>
                                    <SelectItem value="large">30</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>
                </SidebarDetailSection>

                <SidebarDetailSection title={'Sorting'}>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch id="show_sorting_options"
                                    onCheckedChange={(value: boolean) => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.preferences.show_sorting_options = value;
                                        })
                                    }}
                            />
                            <Label htmlFor="show_sorting_options">Show Sorting Options</Label>
                        </div>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Default Sorting</Label>
                        <Select>
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

                <SidebarDetailSection title={'Filtering'}>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch id="show_sorting_options"
                                    onCheckedChange={(value: boolean) => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.preferences.show_rating_options = value;
                                        })
                                    }}/>
                            <Label htmlFor="show_sorting_options">Show rating Options</Label>
                        </div>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    );
}

export default ProductWidgetPreferenceSetting
