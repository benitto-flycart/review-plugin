import React, {useContext} from "react";

import {FloatingProductWidgetContext} from "./FloatingProductWidgetContextAPI";
import ProductWidgetContextAPI from "../ProductReviewWidget/ProductReviewContextAPI";
import PreviewProductWidget from "../ProductReviewWidget/Preview/PreviewProductWidget";
import {Cross1Icon} from "@radix-ui/react-icons";
import ProductWidget from "../ProductReviewWidget/ProductWidget";

const FloatingProductWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(FloatingProductWidgetContext)

    return (
        <div
            className={`wd_preview_content review-preview-wrap frt-flex frt-flex-col frt-min-h-[90vh] frt-relative ${widget.view == 'mobile' ? 'floating_product_widget_preview_mobile' : 'floating_product_widget_preview_desktop'}`}>
            <div className={"wd_fp_header_container"} style={methods.getFPStyles()}>
                <div className={'wd_fp_header_container__close_icon'}>
                    <Cross1Icon/>
                </div>
                <div className={"wd_fp_header_container__text"}>
                    <span>
                        {widget.text_content}
                    </span>
                </div>
            </div>
            <ProductWidgetContextAPI>
                <PreviewProductWidget view={widget.view} current_widget={'floating_product'}/>
            </ProductWidgetContextAPI>
        </div>
    )
}

export default FloatingProductWidgetPreview;