import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

import "@/src/styles/widgets/widget.css";
import WidgetSidebar from "../WidgetSidebar";
import {LayoutIcon} from "@radix-ui/react-icons";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import RatingWidgetConfigSetting from "./RatingWidgetConfigSetting";
import RatingWidgetPreview from "./RatingWidgetPreview";

import "./preview.css"
import "./mobile.css"
import RatingWidgetStyleSetting from "./RatingWidgetStyleSetting";
import PreviewSnippetWidget from "../SnippetWidget/SnippetWidgetPreview";
import WidgetDialogWrapper from "../WidgetDialogWrapper";

const RatingWidgetDialog = ({show, toggle,currentLocale}: any) => {

    const context = useContext<any>(RatingWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <RatingWidgetConfigSetting name={"Title"}/>,
            },
            {
                key: 'styles',
                name: 'Styles',
                icon: <LayoutIcon/>,
                component: <RatingWidgetStyleSetting name={"Styles"}/>,
            }
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
            <RatingWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default RatingWidgetDialog;