import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const RatingWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ReviewFormWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"Dialog"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Background Color </Label>
                        <PopOverColorPicker color={widget.general.dialog.bg_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.general.dialog.bg_color = color;
                            })
                        }}/>
                    </SidebarDetailField>
                </SidebarDetailSection>
                <SidebarDetailSection title={"Button"}>
                    <div className="frt-grid frt-grid-cols-2 frt-gap-2">
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background Color </Label>
                            <PopOverColorPicker color={widget.general.button.bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.button.bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                            <PopOverColorPicker color={widget.general.button.text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.button.text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>

                </SidebarDetailSection>
                <SidebarDetailSection title={"Input"}>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Border Color</Label>
                            <PopOverColorPicker color={widget.general.input.border_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.input.border_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Focus Border Color</Label>
                            <PopOverColorPicker color={widget.general.input.border_focus_color}
                                                onChange={(color: string) => {
                                                    updateWidgetFields((draftState: any) => {
                                                        draftState.general.input.border_focus_color = color;
                                                    })
                                                }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetConfigSetting;