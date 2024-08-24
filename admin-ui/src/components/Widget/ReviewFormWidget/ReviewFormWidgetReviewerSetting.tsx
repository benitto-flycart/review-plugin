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

                        <Label className={"frt-text-xs"} htmlFor="none">Title Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="title_text_size"
                                min={16}
                                max={50}
                                step={1}
                                value={widget.reviewer.title_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.reviewer.title_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={16}
                                max={50}
                                value={widget.reviewer.title_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 50) value = 50;
                                        if (value < 16) value = 16;
                                        draftState.reviewer.title_text_size = value;
                                    })
                                }}/>
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

                        <Label className={"frt-text-xs"} htmlFor="none">Label Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="label_text_size"
                                min={12}
                                max={20}
                                step={1}
                                value={widget.reviewer.label_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 20) value = 20;
                                        if (value < 12) value = 12;
                                        draftState.reviewer.label_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={12}
                                max={20}
                                value={widget.reviewer.label_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 20) value = 20;
                                        if (value < 12) value = 12;
                                        draftState.reviewer.label_text_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Description Color</Label>
                        <PopOverColorPicker color={widget.reviewer.description_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.reviewer.description_color = color;
                            })
                        }}/>

                    </SidebarDetailField>
                    <SidebarDetailField>

                        <Label className={"frt-text-xs"} htmlFor="none">Description Text Size</Label>
                        <div className={"frt-grid frg-gap-2"}>
                            <Input
                                className={"frt-grow-2 frt-bg-primary"}
                                type={"range"}
                                id="description_text_size"
                                min={12}
                                max={20}
                                step={1}
                                value={widget.reviewer.description_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 20) value = 20;
                                        if (value < 12) value = 12;
                                        draftState.reviewer.description_text_size = value;
                                    })
                                }}
                            />
                            <Input
                                className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                                min={12}
                                max={20}
                                value={widget.reviewer.description_text_size}
                                onChange={(e: any) => {
                                    updateWidgetFields((draftState: any) => {
                                        let value = e.target.value;
                                        if (value > 20) value = 20;
                                        if (value < 12) value = 12;
                                        draftState.reviewer.description_text_size = value;
                                    })
                                }}/>
                        </div>

                    </SidebarDetailField>
                </SidebarDetailSection>
            </SidebarDetail>
        </SidebarDetailWrapper>
    )
}

export default RatingWidgetRatingSetting;