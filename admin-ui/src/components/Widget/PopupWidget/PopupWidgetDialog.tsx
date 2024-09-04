import React, {useContext} from "react";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import PreviewPopupWidget from "./PreviewPopupWidget";
import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import {ColorWheelIcon, LayoutIcon} from "@radix-ui/react-icons";
import "@/src/styles/widgets/widget.css";
import WidgetDialogWrapper from "../WidgetDialogWrapper";

const PopupWidgetDialog = ({show, toggle,currentLocale}: any) => {
    const context = useContext<any>(PopupWidgetContext)

    const settings = {
        title: 'Popup Widget Configuration',
        widget_slug: 'popup',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <PopupWidgetConfigSetting name={"Settings"}/>,
            },
            {
                key: 'colors',
                name: 'Colors',
                icon: <ColorWheelIcon/>,
                component: <PopupWidgetColorSetting name={"Colors"}/>
            }
        ]
    }

    return (
        <WidgetDialogWrapper
            show={show}
            toggle={toggle}
            currentLocale={currentLocale}
            settings={settings}
            context={context}
        >
            <PreviewPopupWidget/>
        </WidgetDialogWrapper>

    )
}

export default PopupWidgetDialog;