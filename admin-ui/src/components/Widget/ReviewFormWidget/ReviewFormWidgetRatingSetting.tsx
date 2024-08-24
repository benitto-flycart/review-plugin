import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import {Input} from "../../ui/input";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const RatingWidgetRatingSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ReviewFormWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"Rating"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Rating</Label>
                        <div className={"frt-flex frt-flex-row frt-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
                                id="title"
                                value={widget.rating.title}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.rating.title = e.target.value;
                                    })
                                }}
                            />
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                        <PopOverColorPicker color={widget.rating.text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.rating.text_color = color;
                            })
                        }}/>
                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Font Size</Label>
                        <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                            <Input
                                className={"frt-bg-primary"}
                                type={"range"}
                                id="font_size"
                                min={16}
                                max={50}
                                step={1}
                                value={widget.rating.font_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.rating.font_size = value;
                                    })
                                }}
                            />
                            <Input
                                min={16}
                                max={50}
                                value={widget.rating.font_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.rating.font_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Icon Color</Label>
                        <PopOverColorPicker color={widget.rating.icon_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.rating.icon_color = color;
                            })
                        }}/>
                    </SidebarDetailField>

                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Icon Size</Label>
                        <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                            <Input
                                className={"frt-bg-primary"}
                                type={"range"}
                                id="rating_icon_size"
                                min={30}
                                max={60}
                                step={1}
                                value={widget.rating.icon_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 60) value = 60;
                                        if (value < 30) value = 30;
                                        draftState.rating.icon_size = value;
                                    })
                                }}
                            />
                            <Input
                                min={30}
                                max={60}
                                value={widget.rating.icon_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 60) value = 60;
                                        if (value < 30) value = 30;
                                        draftState.rating.icon_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetRatingSetting;