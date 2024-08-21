import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import {Input} from "../../ui/input";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";


const SidebarWidgetConfigSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(SidebarWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-gap-2 frt-py-4"}>
            <div className={"frt-flex frt-justify-between frt-p-4"}>
                <span>Settings</span>
                <span className={"frt-cursor-pointer"} onClick={() => {
                    updateWidgetFields((draftState: any) => {
                        draftState.show_setting = ''
                    })
                }}>Close</span>
            </div>
            <div className={"frt-flex frt-flex-col frt-gap-3 frt-px-4"}>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Position</Label>
                    <Select value={widget.position} onValueChange={(value: string) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.position = value;
                        })
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Position"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Orientation</Label>
                    <Select value={widget.orientation} onValueChange={(value: string) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.orientation = value;
                        })
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Position"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="top_bottom">Top-bottom</SelectItem>
                                <SelectItem value="bottom_top">Bottom-top</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="hide_on_mobile">Button text</Label>
                    <Input
                        defaultValue={widget.button_text}
                        onChange={(e: any) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.button_text = e.target.value;
                            })
                        }}
                    />
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Button background color </Label>
                    <PopOverColorPicker color={widget.button_bg_color} onChange={(color: string) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.button_bg_color = color;
                        })
                    }}/>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Text </Label>
                    <PopOverColorPicker color={widget.button_text_color} onChange={(color: string) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.button_text_color = color;
                        })
                    }}/>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="hide_on_mobile">Hide on Mobile</Label>
                    <Switch
                        id="hide_on_mobile"
                        checked={widget.hide_on_mobile}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.hide_on_mobile = value
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SidebarWidgetConfigSetting;