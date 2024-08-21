import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

import "@/src/styles/widgets/widget.css";
import WidgetSidebar from "../WidgetSidebar";
import {LayoutIcon} from "@radix-ui/react-icons";
import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import FloatingProductWidgetConfigSetting from "./FloatingProductWidgetConfigSetting";
import FloatingProductWidgetPreview from "./FloatingProductWidgetPreview";

import './preview.css'
import './mobile.css'

const FloatingProductWidgetDialog = ({show, toggle}: any) => {

    const {widget, updateWidgetFields} = useContext<any>(FloatingProductWidgetContext)

    const settings = {
        title: ' Floating Product Widget',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <FloatingProductWidgetConfigSetting/>,
            },
        ]
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <DialogContent
                    className={"review-widget-preview wd_container widget_snippet review-widget-preview !frt-p-0 !frt-max-w-[98vw] frt-min-h-[90vh] frt-max-h-[90vh] !frt-z-[50000] frt-overflow-scroll"}>
                    <div className={"frt-grid frt-grid-cols-5 frt-border-collapse"}>
                    <div
                        className={"wd__sidebar widget_snippet__sidebar frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                        <WidgetSidebar settings={settings} widget={widget} updateWidgetFields={updateWidgetFields}/>
                    </div>
                    <div
                        className={"wd_preview wd_floating_product_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                        <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                        <div className={"preview-widget  wd_floating_product_preview  frt-min-h-[100vh]"}>
                            <FloatingProductWidgetPreview/>
                        </div>
                    </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FloatingProductWidgetDialog;