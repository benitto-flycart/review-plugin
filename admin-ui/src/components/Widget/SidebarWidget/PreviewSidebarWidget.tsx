import React, {useContext} from "react";

import "./sidebar.css";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import GemIcon from "../../icon-components/GemIcon";


const PreviewSidebarWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(SidebarWidgetContext)

    const getSidebarPosition = () => {
        switch (widget.position) {
            case 'right':
                return 'sidebar_widget_right'
            case 'left':
                return 'sidebar_widget_left'
        }
    }

    const getPositionAndOrientation = () => {
        if (widget.position == "left" && widget.orientation == "top_bottom") {
            return "sidebar_widget_pl_tb"
        } else if (widget.position == "right" && widget.orientation == "top_bottom") {
            return "sidebar_widget_pr_tb"
        } else if (widget.position == "left" && widget.orientation == "bottom_top") {
            return "sidebar_widget_pl_bt"
        } else {
            return "sidebar_widget_pr_bt"
        }
    }

    return (
        <div
            className={`review-preview-wrap sidebar-widget-main frt-flex frt-flex-col frt-gap-2 frt-min-h-[50vh] frt-relative ${widget.view == 'mobile' ? 'sidebar-widget-preview-mobile' : 'sidebar-widget-preview-desktop'}`}>
            <div style={methods.getReviewSidebarPreviewStyles()}
                 className={`sidebar_widget ${getSidebarPosition()} ${getPositionAndOrientation()}`}>
               <span className={"sidebar_button_icon"}>
                    <GemIcon size={'medium'} color={'inherit'}/>
               </span>
                <span className={"sidebar_button_text"}>{widget.button_text}</span>
            </div>
        </div>
    )
}

export default PreviewSidebarWidget;