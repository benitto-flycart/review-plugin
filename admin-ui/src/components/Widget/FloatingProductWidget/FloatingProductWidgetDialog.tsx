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
import PreviewPopupWidget from "../PopupWidget/PreviewPopupWidget";

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
                component: <FloatingProductWidgetConfigSetting name={"Settings"}/>,
            },
        ]
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <Dialog open={show} onOpenChange={toggle}>
                    <DialogContent
                        className={"wd_container widget_snippet review-widget-preview !frt-p-0"}>
                        <div
                            className={"wd__sidebar frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                            <WidgetSidebar settings={settings} widget={widget} updateWidgetFields={updateWidgetFields}/>
                        </div>
                        <div
                            className={"wd_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                            <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                            <div className={"wd_preview__main_content preview-widget wd_review_form_preview"}>
                                <FloatingProductWidgetPreview/>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </Dialog>
        </div>
    )
}

export default FloatingProductWidgetDialog;