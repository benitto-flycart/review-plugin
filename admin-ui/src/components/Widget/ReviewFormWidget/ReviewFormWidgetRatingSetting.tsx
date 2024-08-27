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
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                            <PopOverColorPicker color={widget.rating.text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.rating.text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Icon Color</Label>
                            <PopOverColorPicker color={widget.rating.icon_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.rating.icon_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetRatingSetting;