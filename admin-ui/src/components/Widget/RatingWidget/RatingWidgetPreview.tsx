import React, {useContext, useEffect} from "react";

import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import ReviewIcon from "../../ReviewIcon";
import {useLocalState} from "../../zustand/localState";
import { applyStylesToIframe } from "../../../helpers/utils";

const RatingWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(RatingWidgetContext)
    const {localState} = useLocalState()

    useEffect(() => {
            updateWidgetFields((draftState: any) => {
                draftState.widget_loading = true
            })
      console.log(localState.iframe_styles)
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];
            applyStylesToIframe(iframe, localState.iframe_styles?.rating_widget,localState.iframe_styles?.font_css)
            updateWidgetFields((draftState: any) => {
                draftState.widget_loading = false
            })

    }, []);

    return (
        <div
            className={`wd_preview_content wd_rating_preview review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}
        >
            <div className={'r_rw__product_wrapper'}>
                <div className={"r_rw__product_image_wrapper"}>
                    <img src="https://unsplash.it/200/200" alt=""/>
                </div>
                <div className={'r_rw__product_details'}>
                    <h2 className={'r_rw__product_title'}>Album</h2>
                    <h2 className={'r_rw__product_price'}>price</h2>
                    <p className={'r_rw__product_description'}>This is a simple, Virtual Product</p>
                    <button className={`r_rw__add_to_cart_button button wp-element-button`}>Add to Cart</button>
                    <div className={'r_rw_rating_details'} style={methods.getWidgetVars()}>
                        {widget.layout == 'default' ? (
                            <div className="r_rw_rating_icons">
                                <ReviewIcon/>
                                <ReviewIcon/>
                                <ReviewIcon/>
                                <ReviewIcon/>
                                <ReviewIcon/>
                            </div>) : (
                            <div className="r_rw_single_rating_icon">
                                <ReviewIcon/>
                            </div>
                        )}

                        {!widget.hide_text_content ? (
                            <div className={"r_rw_preview_element__text"}>
                                {methods.getWidgetTextContent()}
                            </div>) : null}
                    </div>
                </div>
            </div>
        </div>)
}

export default RatingWidgetPreview;