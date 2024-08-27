import React from 'react';
import WidgetPreviewHeader from "./WidgetPreviewHeader";
import {Badge} from "../ui/badge";
import Frame from 'react-frame-component';

const WidgetMainContentWrapper = ({children, widget, updateWidgetFields, saving = false}: any) => {
    return (
        <div className={"wd_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
            <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
            <div className={"wd_preview__main_content preview-widget wd_review_form_preview frt-relative"}>
                {saving ?
                    <div className={"frt-sticky frt-top-[50%] widget-save-alert"}>
                        <Badge className={"frt-w-min frt-h-min frt-py-3"}>Saving...</Badge>
                    </div>
                    : null}
                <Frame className={"frt-h-full frt-w-full"} id={"widget_preview_iframe"}>
                    {children}
                </Frame>
            </div>
        </div>
    )
}

export default WidgetMainContentWrapper;