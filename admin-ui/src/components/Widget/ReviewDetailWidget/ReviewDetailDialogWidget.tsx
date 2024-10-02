import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
import {LayoutIcon} from "@radix-ui/react-icons";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import ReviewDetailWidgetConfigSetting from "./ReviewDetailWidgetConfigSetting";
import ReviewDetailWidgetPreview from "./ReviewDetailWidgetPreview";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";

const ReviewDetailDialogWidget = ({show, toggle, currentLocale}: any) => {

    const context = useContext<any>(ReviewDetailWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <ReviewDetailWidgetConfigSetting name={"Settings"}/>,
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