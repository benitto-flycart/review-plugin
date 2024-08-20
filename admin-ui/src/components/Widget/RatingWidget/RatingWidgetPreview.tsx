import React, {useContext} from "react";

import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import GemIcon from "../../icon-components/GemIcon";

const RatingWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(RatingWidgetContext)

    const ratingIconColor = widget.colors.rating_icon_color;

    return (
        <div
            className={`wd_preview_content review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}
        >
            <div className={'wd_rating__product_wrapper'}>
                <div>
                    <img src="http://localhost:8004/wp-content/uploads/2023/11/album-1.jpg" alt=""/>
                </div>
                <div className={'wd_rating__product_details'}>
                    <h2 className={'wd_rating__product_title'}>Album</h2>
                    <h2 className={'wd_rating__product_price'}>price</h2>
                    <p className={'wd_rating__product_description'}>This is a simple, Virtual Product</p>
                    <button className={`wd_rating__add_to_cart_button button wp-element-button`}>Add to Cart</button>
                    <div className={'wd_rating_preview_element'} style={methods.getRatingStyles()}>
                        {widget.layout == 'default' ? (
                            <div className="frt-flex frt-flex-row frt-justify-start frt-gap-2">
                                <GemIcon color={ratingIconColor} size={'small'}/>
                                <GemIcon color={ratingIconColor} size={'small'}/>
                                <GemIcon color={ratingIconColor} size={'small'}/>
                                <GemIcon color={"inherit"} size={'small'}/>
                                <GemIcon color={"inherit"} size={'small'}/>
                            </div>) : (
                            <div className="frt-flex frt-flex-row frt-justify-start frt-gap-2">
                                <GemIcon color={ratingIconColor} size={'small'}/>
                            </div>
                        )}

                        {!widget.hide_text_content ? (<div className={"wd_rating_preview_element__text"} style={methods.getTextStyles()}>
                            {methods.getWidgetTextContent()}
                        </div>) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingWidgetPreview;