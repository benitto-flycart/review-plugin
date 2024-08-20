import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {Input} from "../../ui/input";
import {Cross1Icon} from "@radix-ui/react-icons";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import {Textarea} from "../../ui/textarea";

const RatingWidgetConfigSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(RatingWidgetContext)

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
            <div className={"frt-flex frt-flex-col frt-gap-3 frt-py-4 frt-divide-y frt-divide-black-400"}>
                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show All Reviews</Label>
                    <Switch
                        checked={widget.show_all_reviews}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.show_all_reviews = value;
                            })
                        }}
                    />
                    <p>When selected, shows combined store reviews</p>
                </div>

                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Text</Label>
                    <Textarea value={widget.text_content} onChange={(e:any) => {
                        updateWidgetFields((draftState: any) => {
                            draftState.text_content = e.target.value;
                        })
                    }}></Textarea>
                    <p>{`Use the following placeholders: {{count}} - Displays the total number of reviews. {{rating}} - Displays the average rating`}</p>
                </div>

                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Hide Text</Label>
                    <Switch
                        checked={widget.hide_text_content}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.hide_text_content = value;
                            })
                        }}
                    />
                    <p>Hide the Text Content</p>
                </div>


                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Open Floating Product Review</Label>
                    <Switch
                        checked={widget.open_floating_product_review}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.open_floating_product_review = value;
                            })
                        }}
                    />
                    <p>Open Floating Product Review on click</p>
                </div>

                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show Empty Stars</Label>
                    <Switch
                        checked={widget.show_empty_stars}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.show_empty_stars = value;
                            })
                        }}
                    />
                    <p>Show empty stars when there are no reviews</p>
                </div>

                <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-2"}>
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
            </div>
        </div>
    )
}

export default RatingWidgetConfigSetting;