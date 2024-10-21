import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import FloatingProductWidgetConfigSetting from "./FloatingProductWidgetConfigSetting";
import FloatingProductWidgetPreview from "./FloatingProductWidgetPreview";

import './preview.css'
import './mobile.css'
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import {SettingsIcon} from "lucide-react";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";

const FloatingProductWidgetDialog = ({show, toggle,currentLocale}: any) => {

    const context = useContext<any>(FloatingProductWidgetContext)

    const settings = {
        title: ' Floating Product Widget',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <FloatingProductWidgetConfigSetting name={"Settings"}/>,
            },
        ]
    }

    return (
        <WidgetDialogWrapper
            show={show}
            toggle={toggle}
            context={context}
            settings={settings}
            currentLocale={currentLocale}
        >
            <FloatingProductWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default FloatingProductWidgetDialog;