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

const RatingWidgetPhotoSetting = ({title}: any) => {
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

                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="title_text_size"
                                min={16}
                                max={50}
                                step={1}
                                value={widget.photos.title_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.photos.title_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={16}
                                max={50}
                                value={widget.photos.title_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.photos.title_text_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Color</Label>
                        <PopOverColorPicker color={widget.photos.title_text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.photos.title_text_color = color;
                            })
                        }}/>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Description</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
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

                        <Label className={"frt-text-xs"} htmlFor="none">Description Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="description_text_size"
                                min={16}
                                max={50}
                                step={1}
                                value={widget.photos.description_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.photos.description_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={16}
                                max={50}
                                value={widget.photos.description_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.photos.description_text_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <div className={"frt-flex frt-flex-col frt-gap-2"}>
                            <Label className={"frt-text-xs"} htmlFor="none">Description Text Color</Label>
                            <PopOverColorPicker color={widget.photos.description_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.photos.description_color = color;
                                })
                            }}/>
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Button Text</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"text"}
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
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Button Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="button_text_size"
                                min={16}
                                max={30}
                                step={1}
                                value={widget.photos.button_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 30) value = 30;
                                        if (value < 16) value = 16;
                                        draftState.photos.button_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={16}
                                max={30}
                                value={widget.photos.button_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 30) value = 30;
                                        if (value < 16) value = 16;
                                        draftState.photos.button_text_size = value;
                                    })
                                }}/>
                        </div>
                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default RatingWidgetPhotoSetting;