import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import SidebarDetail from "../Sidebar/SidebarDetail";
import InputFontSize from "../utils/InputFontSize";

const RatingWidgetStyleSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(RatingWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Widget Alignment</Label>
                            <Select value={widget.widget_alignment} onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.widget_alignment = value;
                                })
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Alignment"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="left">Left</SelectItem>
                                        <SelectItem value="right">Right</SelectItem>
                                        <SelectItem value="center">Center</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Layout</Label>
                            <Select value={widget.layout} onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.layout = value;
                                })
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Layout"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="single">Single</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </SidebarDetailField>
                    </div>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Direction</Label>
                        <Select value={widget.direction} onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.direction = value;
                            })
                        }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Direction"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="icon_first">Icon First</SelectItem>
                                    <SelectItem value="text_first">Text First</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SidebarDetailField>


                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                            <PopOverColorPicker color={widget.colors.text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Rating Icon Color</Label>
                            <PopOverColorPicker color={widget.colors.rating_icon_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.rating_icon_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetStyleSetting;