import React, {useContext} from "react";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import PreviewPopupWidget from "./PreviewPopupWidget";
import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import "@/src/styles/widgets/widget.css";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import {PaletteIcon, SettingsIcon} from "lucide-react";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";

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
            }
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