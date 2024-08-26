import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

import "@/src/styles/widgets/widget.css";
import WidgetSidebar from "../WidgetSidebar";
import {LayoutIcon} from "@radix-ui/react-icons";
import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import FloatingProductWidgetConfigSetting from "./FloatingProductWidgetConfigSetting";
import FloatingProductWidgetPreview from "./FloatingProductWidgetPreview";

import './preview.css'
import './mobile.css'
import PreviewPopupWidget from "../PopupWidget/PreviewPopupWidget";
import WidgetDialogWrapper from "../WidgetDialogWrapper";

const FloatingProductWidgetDialog = ({show, toggle}: any) => {

    const context = useContext<any>(FloatingProductWidgetContext)

    const settings = {
        title: ' Floating Product Widget',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
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
        >
            <FloatingProductWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default FloatingProductWidgetDialog;