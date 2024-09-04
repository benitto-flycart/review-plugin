import React, {useContext} from "react";
// import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
// import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import {ColorWheelIcon, LayoutIcon} from "@radix-ui/react-icons";
import "@/src/styles/widgets/widget.css";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import SidebarWidgetConfigSetting from "./SidebarWidgetConfigSetting";
import SidebarWidgetConfigPages from "./SidebarWidgetConfigPages";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import PreviewSidebarWidget from "./PreviewSidebarWidget";

const SidebarWidgetDialog = ({show, toggle,currentLocale}: any) => {
    const context = useContext<any>(SidebarWidgetContext)

    const settings = {
        title: 'Popup Widget Configuration',
        widget_slug: 'sidebar',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <SidebarWidgetConfigSetting name={'Settings'}/>,
            },
            {
                key: 'pages',
                name: 'Pages',
                icon: <ColorWheelIcon/>,
                component: <SidebarWidgetConfigPages name={"Pages"}/>
            }
        ]
    };
    return (
        <WidgetDialogWrapper
            show={show}
            toggle={toggle}
            settings={settings}
            context={context}
            currentLocale={currentLocale}
        >
            <PreviewSidebarWidget/>
        </WidgetDialogWrapper>
    )
}

export default SidebarWidgetDialog;