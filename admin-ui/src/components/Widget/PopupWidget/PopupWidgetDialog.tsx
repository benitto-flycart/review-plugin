import React, {useContext} from "react";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import PreviewPopupWidget from "./PreviewPopupWidget";
import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import "@/src/styles/widgets/widget.css";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import { BracesIcon, PaletteIcon, SettingsIcon } from "lucide-react";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import CustomCss from "@/src/components/Widget/CustomCss";

const PopupWidgetDialog = ({show, toggle,currentLocale}: any) => {
    const context = useContext<any>(PopupWidgetContext)

    const settings = {
        title: 'Popup Widget Configuration',
        widget_slug: 'popup',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <PopupWidgetConfigSetting name={"Settings"}/>,
            },
            {
                key: 'colors',
                name: 'Colors',
                icon: <PaletteIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <PopupWidgetColorSetting name={"Colors"}/>
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
            settings={settings}
            context={context}
            currentLocale={currentLocale}
        >
            <PreviewPopupWidget/>
        </WidgetDialogWrapper>

    )
}

export default PopupWidgetDialog;