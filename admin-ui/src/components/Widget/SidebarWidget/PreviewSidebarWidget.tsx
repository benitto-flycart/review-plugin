import React, {useContext, useEffect, useState} from "react";

import "./sidebar.css";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import ReviewIcon from "../../ReviewIcon";
import {useLocalState} from "../../zustand/localState";

const PreviewSidebarWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(SidebarWidgetContext)

    const [loading, setLoading] = useState(true)
    const {localState} = useLocalState()
    useEffect(() => {

        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = true;
        })

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];

            let linkElement: any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = localState.iframe_styles?.sidebar_widget?.widget_css; // Replace with the URL of your stylesheet

            let head = iframe.contentDocument.head;
            let body = iframe.contentDocument.body;
            head.appendChild(linkElement);


            let another = document.createElement('link');
            another.rel = 'stylesheet';
            another.href = localState.iframe_styles?.font_css; // Replace with the URL of your stylesheet
            head.appendChild(another);

            updateWidgetFields((draftState: any) => {
                draftState.widget_loading = false;
            })

        }, 2000)

    }, [widget.layout]);

    return (

        <div
            className={'r_sb_wrapper'}>
            <div style={methods.getReviewSidebarPreviewStyles()}
                 className={`r_sbw__container ${methods.getSidebarPosition()} ${methods.getPositionAndOrientation()}`}>
               <span className={"r_sbw__btn_icon"}>
                   <ReviewIcon/>
               </span>
                <span className={"r_sbw__btn_text"}>{widget.button_text}</span>
            </div>
        </div>)

}

export default PreviewSidebarWidget;