import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";

const SnippetWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(SnippetWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Position to show</Label>
                        <Select value={widget.position_to_show}
                                onValueChange={(value: string) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.position_to_show = value;
                                    })
                                }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Widget Width"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="before_product">Before product name</SelectItem>
                                    <SelectItem value="after_product">After product name</SelectItem>
                                    <SelectItem value="after_product_desc">After product description</SelectItem>
                                    <SelectItem value="after_add_to_cart">After add to cart</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_rating"
                                checked={widget.show_rating}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.show_rating = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Show Review Rating</Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="show_review_image"
                                checked={widget.show_review_image}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.show_review_image = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Show Review Image</Label>
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <div className="frt-flex frt-flex-row  frt-items-center frt-space-x-2">
                            <Switch
                                id="hide_arrows_on_mobile"
                                checked={widget.hide_arrows_on_mobile}
                                onCheckedChange={(value: boolean) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.hide_arrows_on_mobile = value;
                                    })
                                }}
                            />
                            <Label className={"frt-text-xs"} htmlFor="none">Hide Arrows on Mobile</Label>
                        </div>
                        <p>Check store to view this change</p>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default SnippetWidgetConfigSetting;