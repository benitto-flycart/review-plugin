import React from "react";
import WidgetSidebar from "../WidgetSidebar";

const WidgetSidebarWrapper = ({settings, widget, methods,updateWidgetFields} : any) => {
    return (
        <div
            className={"wd__sidebar frt-divide-black-400 frt-col-span-1 frt-relative frt-flex frt-flex-col frt-gap-2 frt-border-r frt-gap-y-56 frt-border-black-400"}>
            <WidgetSidebar settings={settings} methods={methods} widget={widget} updateWidgetFields={updateWidgetFields}/>
        </div>
    )
}

export default WidgetSidebarWrapper;