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
import InputFontSize from "../utils/InputFontSize";

const ReviewFormWidgetThankyouSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ReviewFormWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Title</Label>
                        <div className={"frt-flex frt-flex-row frt-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
                                id="title"
                                defaultValue={widget.thank_you.title}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.thank_you.title = e.target.value;
                                    })
                                }}
                            />
                        </div>
                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Size</Label>
                        <InputFontSize
                            min={16}
                            max={50}
                            step={1}
                            value={widget.thank_you.title_text_size}
                            onChange={(value: number) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.thank_you.title_text_size = value;
                                })
                            }}
                        />
                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Color</Label>
                        <PopOverColorPicker color={widget.thank_you.title_text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.thank_you.title_text_color = color;
                            })
                        }}/>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Description</Label>
                        <div className={"frt-flex frt-flex-row frt-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
                                id="title"
                                defaultValue={widget.thank_you.description}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.thank_you.description = e.target.value;
                                    })
                                }}
                            />
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Description Text Size</Label>
                        <InputFontSize
                            value={widget.thank_you.description_text_size}
                            onChange={(value: number) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.thank_you.description_text_size = value;
                                })
                            }}/>
                    </SidebarDetailField>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Description Text Color</Label>
                        <PopOverColorPicker color={widget.thank_you.description_text_color}
                                            onChange={(color: string) => {
                                                updateWidgetFields((draftState: any) => {
                                                    draftState.thank_you.description_text_color = color;
                                                })
                                            }}/>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default ReviewFormWidgetThankyouSetting;