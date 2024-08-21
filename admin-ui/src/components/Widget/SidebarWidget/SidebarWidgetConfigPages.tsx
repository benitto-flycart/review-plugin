import React, {useContext} from "react";
import {Label} from "../../ui/label";
import {Switch} from "../../ui/switch";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";


const SidebarWidgetConfigPages = () => {
    const {widget, updateWidgetFields} = useContext<any>(SidebarWidgetContext)

    return (
        <div className={"frt-flex frt-flex-col frt-gap-2 frt-py-4"}>
            <div className={"frt-flex frt-justify-between frt-p-4"}>
                <span>Pages</span>
                <span className={"frt-cursor-pointer"} onClick={() => {
                    updateWidgetFields((draftState: any) => {
                        draftState.show_setting = ''
                    })
                }}>Close</span>
            </div>
            <div className={"frt-flex frt-flex-col frt-gap-3 frt-px-4"}>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="home_page">Home Page</Label>
                    <Switch id="home_page"
                            checked={widget.show_on_home_page}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.show_on_home_page = value
                                })
                            }}
                    />
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="product_page">Product Page</Label>
                    <Switch id="product_page"
                            checked={widget.show_on_product_page}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.show_on_product_page = value
                                })
                            }}
                    />
                </div>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <Label className={"frt-text-xs"} htmlFor="cart_page">Cart Page</Label>
                    <Switch id="cart_page"
                            checked={widget.show_on_cart_page}
                            onCheckedChange={(value: boolean) => {
                                updateWidgetFields((draftState: any) => {
                                    draftState.show_on_cart_page = value
                                })
                            }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SidebarWidgetConfigPages;