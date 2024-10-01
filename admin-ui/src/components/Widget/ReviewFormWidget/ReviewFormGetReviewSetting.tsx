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
                        <Label className={"frt-text-xs"} htmlFor="none">Placeholder</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
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