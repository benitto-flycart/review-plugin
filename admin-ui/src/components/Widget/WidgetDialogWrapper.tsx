import React from "react";
import {Dialog, DialogContent} from "../ui/dialog";
import WidgetSidebarWrapper from "./Sidebar/WidgetSidebarWrapper";
import WidgetMainContentWrapper from "./WidgetMainContentWrapper";
import {LoadingSpinner} from "../ui/loader";

const WidgetDialogWrapper = ({children, show, toggle, settings, context}: any) => {
    const {loading} = context;

    return (
        <Dialog open={show} onOpenChange={toggle}>
            <DialogContent
                className={"wd_container widget_snippet review-widget-preview !frt-p-0"}
                onInteractOutside={(e: any) => {
                    e.preventDefault();
                }}>
                {loading ? <LoadingSpinner/> : (<>
                    <WidgetSidebarWrapper widget={context.widget}
                                          settings={settings}
                                          updateWidgetFields={context.updateWidgetFields}
                    />
                    <WidgetMainContentWrapper
                        widget={context.widget}
                        updateWidgetFields={context.updateWidgetFields}
                    >
                        {children}
                    </WidgetMainContentWrapper>
                </>)}
            </DialogContent>
        </Dialog>
    )
}

export default WidgetDialogWrapper;