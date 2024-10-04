import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import {Input} from "../../ui/input";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const RatingWidgetPhotoSetting = ({name}: any) => {
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
                                type={'text'}
                                id="photos_title"
                                value={widget.photos.title}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.photos.title = e.target.value;
                                    })
                                }}
                            />
                        </div>
                    </SidebarDetailField>


                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Description</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                type={"text"}
                                className={"frt-grow-2 frt-bg-primary"}
                                id="photos_description"
                                value={widget.photos.description}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.photos.description = e.target.value;
                                    })
                                }}
                            />
                        </div>
                    </SidebarDetailField>

                    <SidebarDetailField>
                        <Label className={"frt-text-xs"} htmlFor="none">Discount text</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                type={"text"}
                                className={"frt-grow-2 frt-bg-primary"}
                                id="discount_text"
                                value={widget.photos.discount_text}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.photos.discount_text = e.target.value;
                                    })
                                }}
                            />
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Button Text</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                type={"text"}
                                className={"frt-grow-2 frt-bg-primary"}
                                id="button_text"
                                value={widget.photos.button_text}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        draftState.photos.button_text = e.target.value;
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

export default RatingWidgetPhotoSetting;