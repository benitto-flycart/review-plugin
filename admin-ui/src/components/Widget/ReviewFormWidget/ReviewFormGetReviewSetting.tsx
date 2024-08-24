import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import {Input} from "../../ui/input";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const ReviewFormGetReviewSetting = ({name}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ReviewFormWidgetContext)

    return (
        <SidebarDetailWrapper>
            <DetailHeading name={name} updateWidgetFields={updateWidgetFields}/>
            <SidebarDetail>
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Title</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
                                id="title"
                                value={widget.review_content.title}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.review_content.title = e.target.value;
                                    })
                                }}
                            />
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="title_text_size"
                                min={16}
                                max={50}
                                step={1}
                                value={widget.review_content.title_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.review_content.title_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={16}
                                max={50}
                                value={widget.review_content.title_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.review_content.title_text_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <div className={"frt-flex frt-flex-col frt-gap-2"}>
                            <Label className={"frt-text-xs"} htmlFor="none">Title Text Color</Label>
                            <PopOverColorPicker color={widget.review_content.title_text_color}
                                                onChange={(color: string) => {
                                                    updateWidgetFields((draftState: any) => {
                                                        draftState.review_content.title_text_color = color;
                                                    })
                                                }}/>
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Placeholder</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
                                id="title"
                                value={widget.review_content.placeholder}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.review_content.placeholder = e.target.value;
                                    })
                                }}
                            />
                        </div>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default ReviewFormGetReviewSetting;