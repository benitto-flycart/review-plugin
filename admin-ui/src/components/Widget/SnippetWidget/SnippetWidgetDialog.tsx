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
                component: <SnippetWidgetConfigSetting name={"Settings"}/>,
            },
            {
                key: 'style',
                name: 'Style',
                icon: <LayoutIcon/>,
                component: <SnippetWidgetStyleSetting name={"Style"}/>
            },
            {
                key: 'colors',
                name: 'Colors',
                icon: <LayoutIcon/>,
                component: <SnippetWidgetColorSetting name={"Colors"}/>
            }
        ]
    }

    return (
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
                        <PreviewSnippetWidget/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SnippetWidgetDialog;