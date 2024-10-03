import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const RatingWidgetConfigSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ReviewDetailWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <div className="frt-grid frt-grid-cols-2 frt-gap-2">
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background Color </Label>
                            <PopOverColorPicker color={widget.colors.dialog_bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.dialog_bg_color = color;
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
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                            <PopOverColorPicker color={widget.colors.rating_icon_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
                <SidebarDetailSection title={"Button"}>
                    <div className="frt-grid frt-grid-cols-2 frt-gap-2">
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Color</Label>
                            <PopOverColorPicker color={widget.colors.button_text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.button_text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background Color </Label>
                            <PopOverColorPicker color={widget.colors.button_bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.button_bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetConfigSetting;