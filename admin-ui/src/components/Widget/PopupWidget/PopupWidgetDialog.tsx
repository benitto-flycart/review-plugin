import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import PreviewPopupWidget from "./PreviewPopupWidget";
import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import {ColorWheelIcon, LayoutIcon} from "@radix-ui/react-icons";
import "@/src/styles/widgets/widget.css";
import WidgetSidebar from "../WidgetSidebar";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

const PopupWidgetDialog = ({show, toggle}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(PopupWidgetContext)


    const settings = {
        title: 'Popup Widget Configuration',
        widget_slug: 'popup',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <PopupWidgetConfigSetting/>,
            },
            {
                key: 'colors',
                name: 'Colors',
                icon: <ColorWheelIcon/>,
                component: <PopupWidgetColorSetting/>
            }
        ]
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <DialogContent
                    className={"review-widget-preview wd_container widget_snippet !frt-p-0 !frt-max-w-[98vw] frt-min-h-[90vh] frt-max-h-[90vh] !frt-z-[50000] frt-overflow-scroll"}>
                    <div className={"frt-grid frt-grid-cols-5 frt-border-collapse"}>
                        <div
                            className={"wd__sidebar widget_snippet__sidebar frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                            <WidgetSidebar settings={settings} widget={widget} updateWidgetFields={updateWidgetFields}/>
                        </div>
                        <div
                            className={"wd_preview wd_snippet_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                            <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                            <div
                                className={"wd_popup_preview preview-widget review-preview-popup-widget frt-min-h-[100vh]"}>
                                <PreviewPopupWidget/>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PopupWidgetDialog;