import React, {useContext} from "react";
import {Label} from "../../ui/label";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const PopupWidgetColorSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(PopupWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"Review"}>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Text </Label>
                            <PopOverColorPicker color={widget.colors.review.text_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.review.text_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background</Label>
                            <PopOverColorPicker color={widget.colors.review.bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.review.bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>

                    </div>
                </SidebarDetailSection>

                <SidebarDetailSection title={"Product"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Text</Label>
                        <PopOverColorPicker color={widget.colors.product.text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.product.text_color = color;
                            })
                        }}/>

                    </SidebarDetailField>
                </SidebarDetailSection>
                <SidebarDetailSection title={"Close Icon"}>
                    <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                        <SidebarDetailField>

                            <Label className={"frt-text-xs"} htmlFor="none">Color</Label>
                            <PopOverColorPicker color={widget.colors.close_icon.text_color}
                                                onChange={(color: string) => {
                                                    updateWidgetFields((draftState: any) => {
                                                        draftState.colors.close_icon.text_color = color;
                                                    })
                                                }}/>

                        </SidebarDetailField>

                        <SidebarDetailField>
                            <Label className={"frt-text-xs"} htmlFor="none">Background Color</Label>
                            <PopOverColorPicker color={widget.colors.close_icon.bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.close_icon.bg_color = color;
                                })
                            }}/>
                        </SidebarDetailField>
                    </div>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>)
}

export default PopupWidgetColorSetting;