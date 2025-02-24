import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import ReviewDetailWidgetConfigSetting from "./ReviewDetailWidgetConfigSetting";
import ReviewDetailWidgetPreview from "./ReviewDetailWidgetPreview";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";
import { BracesIcon, SettingsIcon } from "lucide-react";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import CustomCss from "@/src/components/Widget/CustomCss";

const ReviewDetailDialogWidget = ({show, toggle, currentLocale}: any) => {

    const context = useContext<any>(ReviewDetailWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <ReviewDetailWidgetConfigSetting name={"Settings"}/>,
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
            <ReviewDetailWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default ReviewDetailDialogWidget;