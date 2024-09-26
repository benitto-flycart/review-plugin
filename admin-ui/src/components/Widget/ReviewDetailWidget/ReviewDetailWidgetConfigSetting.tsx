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
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default RatingWidgetConfigSetting;