import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import {Cross1Icon} from "@radix-ui/react-icons";

const PopupWidgetConfigSetting = () => {
    const {widget, updateWidgetFields} = useContext<any>(PopupWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-gap-2 frt-py-4"}>
            <div className={"frt-flex frt-justify-between frt-p-4"}>
                <span>Settings</span>
                <span className={"frt-cursor-pointer"} onClick={() => {
                    updateWidgetFields((draftState: any) => {
                        draftState.show_setting = ''
                    })
                }}><Cross1Icon/></span>
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
                                <SelectItem value="bottom_left">Bottom-left corner</SelectItem>
                                <SelectItem value="bottom_right">Bottom-right corner</SelectItem>
                                <SelectItem value="top_left">Top-left corner</SelectItem>
                                <SelectItem value="top_right">Top-right corner</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Corner Radius</Label>
                    <Select value={widget.corner_radius}
                            onValueChange={(value: string) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.corner_radius = value;
                                })
                            }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Corner Radius"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="sharp">Sharp</SelectItem>
                                <SelectItem value="slightly_rounded">Slightly Rounded</SelectItem>
                                <SelectItem value="rounded">Rounded</SelectItem>
                                <SelectItem value="extra_rounded">Extra Rounded</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Minimum Rating to display</Label>
                    <Select
                        value={widget.minimum_rating}
                        onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.minimum_rating = value;
                            })
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Rating"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="3_stars">3 stars up</SelectItem>
                                <SelectItem value="4_stars">4 stars up</SelectItem>
                                <SelectItem value="5_stars">5 Stars</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label htmlFor="show_review_type">Initial Delay</Label>
                    <Select
                        value={widget.initial_delay}
                        onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.initial_delay = value;
                            })
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Initial Delay"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p>Check store to view this change</p>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Delay Between Popup</Label>
                    <Select
                        value={widget.delay_between_popup}
                        onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.delay_between_popup = value;
                            })
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Delay Between Popups"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p>Check store to view this change</p>
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Popup Display Time</Label>
                    <Select
                        value={widget.popup_display_time}
                        onValueChange={(value: string) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.popup_display_time = value;
                            })
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="PopUp Display Time"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Product Thumbnail</Label>
                    <Switch
                        id="show_product_thumbnail"
                        checked={widget.show_product_thumbnail}
                        onCheckedChange={(value: boolean) => {
                            updateWidgetFields((draftState: any) => {
                                draftState.show_product_thumbnail = value
                            })
                        }}
                    />
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
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="auto_play_video_review">Auto Play Video Review</Label>
                    <Switch id="auto_play_video_review"
                            checked={widget.auto_play_video}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.auto_play_video = value
                                })
                            }}
                    />
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show on Home Page</Label>
                    <Switch id="show_on_home_page"
                            checked={widget.show_on_home_page}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.show_on_home_page = value;
                                })
                            }}
                    />
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show on Cart Page</Label>
                    <Switch id="show_on_cart_page"
                            checked={widget.show_on_cart_page}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.show_on_cart_page = value;
                                })
                            }}
                    />
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="none">Show on Product Page</Label>
                    <Switch id="show_on_product_page"
                            checked={widget.show_on_product_page}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.show_on_product_page = value;
                                })
                            }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PopupWidgetConfigSetting;