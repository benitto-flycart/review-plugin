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
                    <div className="frt-grid frt-grid-cols-2 frt-gap-2">
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background Color </Label>
                            <PopOverColorPicker color={widget.general.dialog_bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.dialog_bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Rating Icon Color</Label>
                            <PopOverColorPicker color={widget.general.rating_icon_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.rating_icon_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Title Color</Label>
                            <PopOverColorPicker color={widget.general.title_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.title_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Description Color</Label>
                            <PopOverColorPicker color={widget.general.description_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.description_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
                <SidebarDetailSection title={"Button"}>
                    <div className="frt-grid frt-grid-cols-2 frt-gap-2">
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Button Background Color </Label>
                            <PopOverColorPicker color={widget.general.button_bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.button_bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                            <PopOverColorPicker color={widget.general.button_text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.button_text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>

                </SidebarDetailSection>
                <SidebarDetailSection title={"Input"}>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Border Color</Label>
                            <PopOverColorPicker color={widget.general.input_border_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.input_border_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Label Color</Label>
                            <PopOverColorPicker color={widget.general.input_label_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.input_label_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Error Color</Label>
                            <PopOverColorPicker color={widget.general.input_error_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.general.input_error_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetConfigSetting;