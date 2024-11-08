import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import RatingWidgetConfigSetting from "./RatingWidgetConfigSetting";
import RatingWidgetPreview from "./RatingWidgetPreview";

import "./preview.css"
import "./mobile.css"
import RatingWidgetStyleSetting from "./RatingWidgetStyleSetting";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import { BracesIcon, SettingsIcon } from "lucide-react";
import {FontStyleIcon} from "@radix-ui/react-icons";
import CustomCss from "@/src/components/Widget/CustomCss";

const RatingWidgetDialog = ({show, toggle,currentLocale}: any) => {

    const context = useContext<any>(RatingWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <RatingWidgetConfigSetting name={"Title"}/>,
            },
            {
                key: 'styles',
                name: 'Styles',
                icon: <FontStyleIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <RatingWidgetStyleSetting name={"Styles"}/>,
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
            <RatingWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default RatingWidgetDialog;