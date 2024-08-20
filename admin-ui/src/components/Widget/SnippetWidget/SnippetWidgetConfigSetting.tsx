import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {Input} from "../../ui/input";
import {Cross1Icon} from "@radix-ui/react-icons";
import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";

const SnippetWidgetConfigSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(SnippetWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-gap-2 frt-py-4"}>
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
            <div className={"frt-flex frt-flex-col frt-gap-3 frt-px-4"}>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show Review Rating</Label>
                    <Switch
                        id="show_review_rating"
                        checked={widget.show_rating}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.show_rating = value;
                            })
                        }}
                    />
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show Review Image</Label>
                    <Switch
                        id="show_review_image"
                        checked={widget.show_review_image}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.show_review_image = value;
                            })
                        }}
                    />
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Hide Arrows on Mobile</Label>
                    <Switch
                        id="hide_arrows_on_mobile"
                        checked={widget.hide_arrows_on_mobile}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.hide_arrows_on_mobile = value;
                            })
                        }}
                    />
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Font Size</Label>
                    <div className={"frt-flex frt-flex-row frt-gap-2"}>
                        <Input
                            className={"frt-grow-2 frt-bg-primary"}
                            type={"range"}
                            id="font_size"
                            min={12}
                            max={16}
                            step={1}
                            onChange={(e: any) => {
                                updateWidgetFields((draftState: any) => {
                                    let value = e.target.value;
                                    if (value > 16) value = 16;
                                    if (value < 12) value = 12;
                                    draftState.font_size = value;
                                })
                            }}
                        />
                        <Input
                            className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                            min={12}
                            max={16}
                            value={widget.font_size}
                            onChange={(e: any) => {
                                updateWidgetFields((draftState: any) => {
                                    let value = e.target.value;
                                    if (value > 16) value = 16;
                                    if (value < 12) value = 12;
                                    draftState.font_size = value;
                                })
                            }}/>
                    </div>
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">No of Reviews to Display</Label>
                    <div className={"frt-flex frt-flex-row frt-gap-2"}>
                        <Input
                            className={"frt-grow-2"}
                            type={"range"}
                            id="no_of_reviews_display"
                        />
                        <Input
                            className={"frt-grow-1 frt-basis-1 frt-w-[50px]"}
                            min={2}
                            max={1}
                            value={widget.no_of_reviews_to_display}
                            onChange={(e: any) => {
                                updateWidgetFields((draftState: any) => {
                                    let value = e.target.value;
                                    if (value > 10) value = 10;
                                    if (value < 2) value = 2;
                                    draftState.no_of_reviews_to_display = value;
                                })
                            }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnippetWidgetConfigSetting;