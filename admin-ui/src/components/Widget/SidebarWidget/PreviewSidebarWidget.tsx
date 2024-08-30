import React, {useContext, useEffect, useState} from "react";

import "./sidebar.css";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import ReviewIcon from "../../ReviewIcon";
import {LoadingSpinner} from "../../ui/loader";

const PreviewSidebarWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(SidebarWidgetContext)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];


// Create a new link element
            let linkElement: any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/sidebar_widget.css'; // Replace with the URL of your stylesheet

            let head = iframe.contentDocument.head;
            head.appendChild(linkElement);

            let another = document.createElement('link');
            another.rel = 'stylesheet';
            another.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css'; // Replace with the URL of your stylesheet

            head.appendChild(another);

            setLoading(false)

        }, 2000)

    }, []);

    const getSidebarPosition = () => {
        switch (widget.position) {
            case 'right':
                return 'r_sbw__right'
            case 'left':
                return 'r_sbw__left'
        }
    }

    const getPositionAndOrientation = () => {
        if (widget.position == "left" && widget.orientation == "top_bottom") {
            return "r_sbw__pl_tb"
        } else if (widget.position == "right" && widget.orientation == "top_bottom") {
            return "r_sbw__pr_tb"
        } else if (widget.position == "left" && widget.orientation == "bottom_top") {
            return "r_sbw__pl_bt"
        } else {
            return "r_sbw__pr_bt"
        }
    }

    return (
        <>
            {!loading ? (
                <div
                    className={'r_sb_wrapper '}>
                    <div style={methods.getReviewSidebarPreviewStyles()}
                         className={`r_sbw__container ${getSidebarPosition()} ${getPositionAndOrientation()}`}>
               <span className={"r_sbw__btn_icon"}>
                   <ReviewIcon/>
               </span>
                        <span className={"r_sbw__btn_text"}>{widget.button_text}</span>
                    </div>
                </div>
            ) : (<div style={{width: "100%", height: "100%"}}><LoadingSpinner/></div>)}
        </>)
}

export default PreviewSidebarWidget;