import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const FloatingProductWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(FloatingProductWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Title</Label>
                        <Input
                            onChange={(e: any) => {
                                let value = e.target.value;
                                if (!value) value = 'Reviews';
                                updateWidgetFields((draftState: any) => {
                                    draftState.text_content = value;
                                })
                            }}
                            value={widget.text_content}
                        />
                    </SidebarDetailField>
                </SidebarDetailSection>
                <SidebarDetailSection title={"Colors"}>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background Color</Label>
                            <PopOverColorPicker color={widget.bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                            <PopOverColorPicker color={widget.text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default FloatingProductWidgetConfigSetting;