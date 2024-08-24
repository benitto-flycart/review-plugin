import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

import "@/src/styles/widgets/widget.css";
import WidgetSidebar from "../WidgetSidebar";
import {LayoutIcon} from "@radix-ui/react-icons";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import RatingWidgetConfigSetting from "./RatingWidgetConfigSetting";
import RatingWidgetPreview from "./RatingWidgetPreview";

import "./preview.css"
import "./mobile.css"
import RatingWidgetStyleSetting from "./RatingWidgetStyleSetting";

const RatingWidgetDialog = ({show, toggle}: any) => {

    const {widget, updateWidgetFields} = useContext<any>(RatingWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <RatingWidgetConfigSetting name={"Title"}/>,
            },
            {
                key: 'styles',
                name: 'Styles',
                icon: <LayoutIcon/>,
                component: <RatingWidgetStyleSetting name={"Styles"}/>,
            }
        ]
    }

    return (
        <div>
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
                            <RatingWidgetPreview/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RatingWidgetDialog;