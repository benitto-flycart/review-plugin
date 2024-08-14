import React, {useContext} from "react";
import HeaderLayoutPreview from "./HeaderLayoutPreview";
import WidgetLayoutPreview from "./WidgetLayoutPreview";
import {ProductWidgetContext} from "../ProductReviewContextAPI";


const PreviewProductWidget = () => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    return (
        <div className={`review-preview-wrap frt-flex frt-flex-col frt-gap-2 ${widget.view == 'mobile' ? 'product-widget-preview-mobile' : 'product-widget-preview-desktop'}`}>
            <HeaderLayoutPreview/>
            <WidgetLayoutPreview/>
        </div>
    )
}

export default PreviewProductWidget;