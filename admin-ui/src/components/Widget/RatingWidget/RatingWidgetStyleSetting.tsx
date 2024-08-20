import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Cross1Icon} from "@radix-ui/react-icons";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";

const RatingWidgetStyleSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(RatingWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-divide-y frt-divide-black-400 frt-gap-2"}>
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
            <div className={"frt-flex frt-flex-col frt-gap-3 frt-divide-y frt-divide-black-400"}>
                <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-4"}>
                    <div>
                        <span className={"frt-font-extrabold"}>General</span>
                    </div>

                    <div className={"frt-grid frt-grid-cols-1 frt-gap-2 frt-justify-center"}>
                        <div className={"frt-flex frt-flex-col frt-gap-2"}>
                            <Label className={"frt-text-xs"} htmlFor="none">Widget Alignment</Label>
                            <Select value={widget.widget_alignment} onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.widget_alignment = value;
                                })
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Alignment"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="left">Left</SelectItem>
                                        <SelectItem value="right">Right</SelectItem>
                                        <SelectItem value="center">Center</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className={"frt-flex frt-flex-col frt-gap-2"}>
                            <Label className={"frt-text-xs"} htmlFor="none">Layout</Label>
                            <Select value={widget.layout} onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.layout = value;
                                })
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Layout"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="single">Single</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
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
                            <Label className={"frt-text-xs"} htmlFor="none">Rating Icon Color</Label>
                            <PopOverColorPicker color={widget.colors.rating_icon_color} onChange={(color: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.colors.rating_icon_color = color;
                                })
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingWidgetStyleSetting;