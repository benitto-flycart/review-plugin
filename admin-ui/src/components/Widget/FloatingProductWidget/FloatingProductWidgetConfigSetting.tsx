import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {Cross1Icon} from "@radix-ui/react-icons";
import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";

const FloatingProductWidgetConfigSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(FloatingProductWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-gap-2 frt-py-4 frt-divide-y frt-divide-black-400"}>
            <div className={"frt-flex frt-justify-between frt-items-center widget-header-title"}>
                <span>Settings</span>
                <span className={"frt-cursor-pointer hover:frt-border-gray-100 frt-p-1"} onClick={() => {
                    updateWidgetFields((draftState: any) => {
                        draftState.show_setting = ''
                    })
                }}>
                   <Cross1Icon/>
                </span>
            </div>
            <div className={"frt-flex frt-flex-col frt-gap-3 frt-py-4 frt-divide-y frt-divide-black-400"}>
                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Title</Label>
                    <Input
                        onChange={(e: any) => {
                            let value = e.target.value;
                            if (!value) value = 'Reviews';
                            updateWidgetFields((draftState: any) => {
                                draftState.text_content = value;
                            })
                        }}
                        type={"text"}
                        value={widget.text_content}
                    />
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-4"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Background Color</Label>
                    <PopOverColorPicker color={widget.bg_color} onChange={(color: string) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.bg_color = color;
                        })
                    }}/>
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-4"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Text Color</Label>
                    <PopOverColorPicker color={widget.text_color} onChange={(color: string) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.text_color = color;
                        })
                    }}/>
                </div>

            </div>
        </div>
    )
}

export default FloatingProductWidgetConfigSetting;