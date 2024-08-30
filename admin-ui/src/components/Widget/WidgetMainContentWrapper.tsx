import React from 'react';
import WidgetPreviewHeader from "./WidgetPreviewHeader";
import {Badge} from "../ui/badge";
import Frame from 'react-frame-component';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "../ui/resizable";

const WidgetMainContentWrapper = ({children, widget, updateWidgetFields, saving = false}: any) => {
    const sidePanelHeight = widget.view == 'mobile' ? 30 : 0;

    return (
        <div className={"wd_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
            <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
            <ResizablePanelGroup direction="horizontal" key={`side_panel_key_${100 - sidePanelHeight}`}>
                <ResizablePanel defaultSize={sidePanelHeight} className="frt-flex frt-items-center frt-justify-center"
                                style={{writingMode: "vertical-lr", transform: "rotateZ(180deg)"}}>Adjust the width to check
                    responsiveness</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={100 - (sidePanelHeight * 2)}>
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
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={sidePanelHeight} className="frt-flex frt-items-center frt-justify-center"
                                style={{writingMode: "vertical-lr"}}>Adjust the width to check responsiveness</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default WidgetMainContentWrapper;