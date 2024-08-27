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
                <SidebarDetailSection title={"General"}>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Title</Label>
                        <div className={"frt-flex frt-flex-row frt-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
                                id="title"
                                defaultValue={widget.reviewer.title}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.reviewer.title = e.target.value;
                                    })
                                }}
                            />
                        </div>

                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Color</Label>
                        <PopOverColorPicker color={widget.reviewer.title_text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.reviewer.title_text_color = color;
                            })
                        }}/>
                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Label Text Color</Label>
                        <PopOverColorPicker color={widget.reviewer.label_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.reviewer.label_color = color;
                            })
                        }}/>

                    </SidebarDetailField>
                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Description Color</Label>
                        <PopOverColorPicker color={widget.reviewer.description_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.reviewer.description_color = color;
                            })
                        }}/>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default RatingWidgetRatingSetting;