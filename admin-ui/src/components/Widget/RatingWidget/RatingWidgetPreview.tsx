import React, {useContext, useEffect, useState} from "react";

import {RatingWidgetContext} from "./RatingWidgetContextAPI";
import ReviewIcon from "../../ReviewIcon";
import {LoadingSpinner} from "../../ui/loader";

const RatingWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(RatingWidgetContext)
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];

// Create a new link element
            let linkElement: any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/rating_widget.css'; // Replace with the URL of your stylesheet

            let head = iframe.contentDocument.head;
            head.appendChild(linkElement);

            let another = document.createElement('link');
            another.rel = 'stylesheet';
            another.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css'; // Replace with the URL of your stylesheet

            head.appendChild(another);

            setLoading(false)

        }, 2000)

    }, []);

    return (
        <>
            {!loading ? (
                <div
                    className={`wd_preview_content wd_rating_preview review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}
                >
                    <div className={'r_rw__product_wrapper'}>
                        <div className={"r_rw__product_image_wrapper"}>
                            <img src="http://localhost:8004/wp-content/uploads/2023/11/album-1.jpg" alt=""/>
                        </div>
                        <div className={'r_rw__product_details'}>
                            <h2 className={'r_rw__product_title'}>Album</h2>
                            <h2 className={'r_rw__product_price'}>price</h2>
                            <p className={'r_rw__product_description'}>This is a simple, Virtual Product</p>
                            <button className={`r_rw__add_to_cart_button button wp-element-button`}>Add to Cart</button>
                            <div className={'r_rw_rating_details'} style={methods.getRatingContainerStyle()}>
                                {widget.layout == 'default' ? (
                                    <div className="r_rw_rating_icons"
                                         style={methods.getRatingStyles()}>
                                        <ReviewIcon/>
                                        <ReviewIcon/>
                                        <ReviewIcon/>
                                        <ReviewIcon/>
                                        <ReviewIcon/>
                                    </div>) : (
                                    <div className="r_rw_single_rating_icon"
                                         style={methods.getRatingStyles()}>
                                        <ReviewIcon/>
                                    </div>
                                )}

                                {!widget.hide_text_content ? (
                                    <div className={"r_rw_preview_element__text"} style={methods.getTextStyles()}>
                                        {methods.getWidgetTextContent()}
                                    </div>) : null}
                            </div>
                        </div>
                    </div>
                </div>) : (<div style={{width: "100%", height: "100%"}}><LoadingSpinner/></div>)}
        </>)
}

export default RatingWidgetPreview;