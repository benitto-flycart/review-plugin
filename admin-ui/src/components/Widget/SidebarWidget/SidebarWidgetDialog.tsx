import React, {useContext} from "react";
// import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
// import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import "@/src/styles/widgets/widget.css";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import SidebarWidgetConfigSetting from "./SidebarWidgetConfigSetting";
import SidebarWidgetConfigPages from "./SidebarWidgetConfigPages";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import PreviewSidebarWidget from "./PreviewSidebarWidget";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import { BookOpenIcon, BracesIcon, SettingsIcon } from "lucide-react";
import CustomCss from "@/src/components/Widget/CustomCss";

const SidebarWidgetDialog = ({show, toggle,currentLocale}: any) => {
    const context = useContext<any>(SidebarWidgetContext)

    const settings = {
        title: 'Sidebar Widget Configuration',
        widget_slug: 'sidebar',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <SidebarWidgetConfigSetting name={'Settings'}/>,
            },
            {
                key: 'pages',
                name: 'Pages',
                icon: <BookOpenIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <SidebarWidgetConfigPages name={"Pages"}/>
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