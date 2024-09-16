import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "../ui/dialog";
import WidgetSidebarWrapper from "./Sidebar/WidgetSidebarWrapper";
import WidgetMainContentWrapper from "./WidgetMainContentWrapper";
import {LoadingSpinner} from "../ui/loader";
import "@/src/styles/widgets/widget.css";
import {Button} from "../ui/button";

const WidgetDialogWrapper = ({children, show, toggle, settings, context,currentLocale}: any) => {
    const {loading} = context;

    return (
        <Dialog open={show} onOpenChange={toggle}>
            <DialogContent
                className={"wd_container widget_snippet review-widget-preview !frt-p-0 !frt-gap-0"}
                onInteractOutside={(e: any) => {
                    e.preventDefault();
                }}>
                <DialogTitle/>
                <DialogDescription/>
                {loading ? <LoadingSpinner/> : (<>
                    <WidgetSidebarWrapper widget={context.widget}
                                          settings={settings}
                                          updateWidgetFields={context.updateWidgetFields}
                    />
                        <WidgetMainContentWrapper
                            saving={context.saving}
                            currentLocale={currentLocale}
                            widget={context.widget}
                            updateWidgetFields={context.updateWidgetFields}
                        >
                            {children}
                        </WidgetMainContentWrapper>
                </>)}
                <Button className={"frt-absolute frt-flex frt-gap-x-1 frt-right-10 frt-bottom-10"} onClick={context.methods.saveSettings}>
                    {context.saving ? <LoadingSpinner className={"!frt-w-4"}/> : null}
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default WidgetDialogWrapper;