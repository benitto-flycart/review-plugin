import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import FloatingProductWidgetConfigSetting from "./FloatingProductWidgetConfigSetting";
import FloatingProductWidgetPreview from "./FloatingProductWidgetPreview";

import './preview.css'
import './mobile.css'
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import { BracesIcon, SettingsIcon } from "lucide-react";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import CustomCss from "@/src/components/Widget/CustomCss";

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
            {
                key: "advanced_css",
                name: "Advanced CSS",
                icon: <BracesIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height} />,
                component: (
                  <CustomCss name={"Advanced CSS"} context={context} />
                ),
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