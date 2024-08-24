import React, {useContext} from "react";

import  "./popup.css";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import GemIcon from "../../icon-components/GemIcon";
import {Cross1Icon} from "@radix-ui/react-icons";
import ReviewIcon from "../../ReviewIcon";


const PreviewPopupWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(PopupWidgetContext)

    const getPopupPosition = () => {
        switch (widget.position) {
            case 'top_right':
                return 'top_right popup_right_slide_in'
            case 'top_left':
                return 'top_left popup_left_slide_in'
            case 'bottom_right':
                return 'bottom_right popup_right_slide_in'
            case 'bottom_left':
                return 'bottom_left popup_left_slide_in'
        }
    }

    const getCornerRadius = () => {
        switch (widget.corner_radius) {
            case 'sharp':
                return 'sharp'
            case 'slightly_rounded':
                return 'popup_slightly_rounded'
            case 'rounded':
                return 'popup_rounded'
            case 'extra_rounded':
                return 'popup_extra_rounded'
            case 'none':
                return 'popup_none'
        }
    }
    return (
        <div
            className={`review-preview-wrap popup-widget frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative ${widget.view == 'mobile' ? 'popup-widget-preview-mobile' : 'popup-widget-preview-desktop'}`}>
            <div className={`popup_container ${getPopupPosition()} ${getCornerRadius()}`}
                 style={methods.getPopupPreviewStyles()}
                 key={widget.position}
            >
                <span className="close_icon"
                      style={methods.getCloseIconStyles()}
                ><Cross1Icon/></span>
                <div className="review_wrapper">
                    <div className="review_image_wrapper">
                        <img
                            src={"https://images.loox.io/uploads/2024/7/18/ZF-ve1-el.jpg"}
                            className={`review_image`}
                            // style={{backgroundImage: 'url("")'}}
                            onError={(e) => {
                                console.log('Image Loading Error');
                                //@ts-ignore
                                e.target?.parentElement.remove();
                            }}
                        ></img>

                    </div>
                    <div className={'review_body'}>
                        <div className={'reviewer_name'}>Edward</div>
                        <div className={'review_icon_wrapper'}>
                            <ReviewIcon/>
                            <ReviewIcon/>
                            <ReviewIcon/>
                            <ReviewIcon/>
                            <ReviewIcon/>
                        </div>
                        <div title="nice snowboard, awesome" className={'review_content'}>
                            nice snowboard, awesome
                        </div>
                    </div>
                    <div data-product-url=""
                         style={methods.getPopupProductStyles()}>
                        <div className={'review_product_wrapper'}>
                            <div className={'review_product_image_wrapper'}>
                                <img
                                    src={'https://cdn.shopify.com/s/files/1/0664/4262/5197/files/snowboard_sky_x50.png?v=1720513923'}
                                    alt={""}
                                    className={'review_product_image'}/>
                            </div>
                            <div title="The Compare at Price Snowboard" className={'review_product_title'}>
                                The Compare at Price S...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default PreviewPopupWidget;