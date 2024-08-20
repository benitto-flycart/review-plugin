import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import PreviewSnippetWidget from "./SnippetWidgetPreview";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

import "@/src/styles/widgets/widget.css";
import "./mobile.css";
import './snippets-widget.css'
import WidgetSidebar from "../WidgetSidebar";
import SnippetWidgetConfigSetting from "./SnippetWidgetConfigSetting";
import SnippetWidgetColorSetting from "./SnippetWidgetColorSetting";
import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";
import {LayoutIcon} from "@radix-ui/react-icons";
import SnippetWidgetStyleSetting from "./SnippetWidgetStyleSetting";

const SnippetWidgetDialog = ({show, toggle}: any) => {

    const {widget, updateWidgetFields} = useContext<any>(SnippetWidgetContext)

    const settings = {
        title: 'Snippet Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <SnippetWidgetConfigSetting/>,
            },
            {
                key: 'style',
                name: 'Style',
                icon: <LayoutIcon/>,
                component: <SnippetWidgetStyleSetting/>
            },
            {
                key: 'colors',
                name: 'Colors',
                icon: <LayoutIcon/>,
                component: <SnippetWidgetColorSetting/>
            }
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
                        className={"wd_preview wd_snippet_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                        <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                        <div className={"preview-widget  wd_snippet_preview  frt-min-h-[100vh]"}>
                            <PreviewSnippetWidget/>
                        </div>
                    </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SnippetWidgetDialog;