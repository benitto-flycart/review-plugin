import React, {useContext} from "react";
import {Label} from "../../ui/label";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import {Cross1Icon} from "@radix-ui/react-icons";
import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";

const SnippetWidgetColorSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(SnippetWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-divide-y frt-divide-gray-500 frt-gap-2 "}>
            <div className={"frt-flex frt-justify-between frt-items-center widget-header-title"}>
                <span>Colors</span>
                <span className={"frt-cursor-pointer hover:frt-border-gray-100 frt-p-1"} onClick={() => {
                    updateWidgetFields((draftState: any) => {
                        draftState.show_setting = ''
                    })
                }}>
                   <Cross1Icon/>
                </span>
            </div>

            <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-4"}>
                <div>
                    <span className={"frt-font-extrabold"}>Review</span>
                </div>
                <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                        <PopOverColorPicker color={widget.colors.text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.text_color = color;
                            })
                        }}/>
                    </div>

                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Background Color</Label>
                        <PopOverColorPicker color={widget.colors.bg_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.bg_color = color;
                                })
                        }}/>
                    </div>
                </div>

                <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Name Color</Label>
                        <PopOverColorPicker color={widget.colors.name_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.name_color = color;
                            })
                        }}/>
                    </div>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Rating Icon Color</Label>
                        <PopOverColorPicker color={widget.colors.rating_icon_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.rating_icon_color = color;
                            })
                        }}/>
                    </div>
                </div>

                <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Border Color</Label>
                        <PopOverColorPicker color={widget.colors.border_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.border_color = color;
                            })
                        }}/>
                    </div>

                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Shadow Color</Label>
                        <PopOverColorPicker color={widget.colors.shadow_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.shadow_color = color;
                            })
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnippetWidgetColorSetting;