import React, {useContext} from "react";
import {Label} from "../../ui/label";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";

const PopupWidgetColorSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(PopupWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-divide-y frt-divide-gray-500 frt-gap-2 "}>
            <div className={"frt-flex frt-justify-between frt-py-4"}>
                <span>Colors</span>
                <span className={"frt-cursor-pointer"} onClick={() => {
                    updateWidgetFields((draftState: any) => {
                        draftState.show_setting = ''
                    })
                }}>Close</span>
            </div>

            <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-4"}>
                <div>
                    <span className={"frt-font-extrabold"}>Review</span>
                </div>
                <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Text </Label>
                        <PopOverColorPicker color={widget.colors.review.text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.review.text_color = color;
                            })
                        }}/>
                    </div>

                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Background</Label>
                        <PopOverColorPicker color={widget.colors.review.bg_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.review.bg_color = color;
                            })
                        }}/>
                    </div>
                </div>
            </div>


            <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-4"}>
                <div>
                    <span className={"frt-font-extrabold"}>Product</span>
                </div>
                <div className={"frt-grid frt-grid-cols-2 frt-gap-2 frt-justify-center"}>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <Label className={"frt-text-xs"} htmlFor="none">Text</Label>
                        <PopOverColorPicker color={widget.colors.product.text_color} onChange={(color: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.colors.product.text_color = color;
                            })
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupWidgetColorSetting;