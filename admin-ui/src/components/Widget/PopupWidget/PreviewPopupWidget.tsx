import React, {useContext, useEffect, useState} from "react";

import "./popup.css";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import {Cross1Icon} from "@radix-ui/react-icons";
import ReviewIcon from "../../ReviewIcon";
import {LoadingSpinner} from "../../ui/loader";

const PreviewPopupWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(PopupWidgetContext)
    const [loading, setLoading] = useState(true)

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];

// Create a new link element
            let linkElement: any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/popup_widget.css'; // Replace with the URL of your stylesheet

            let head = iframe.contentDocument.head;
            head.appendChild(linkElement);

            let another = document.createElement('link');
            another.rel = 'stylesheet';
            another.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css'; // Replace with the URL of your stylesheet

            head.appendChild(another);

            setLoading(false)

        }, 2000)

    }, []);

    const getPopupPosition = () => {
        switch (widget.position) {
            case 'top_right':
                return 'r_puw-top_right r_puw-popup_right_slide_in'
            case 'top_left':
                return 'r_puw-top_left r_puw-popup_left_slide_in'
            case 'bottom_right':
                return 'r_puw-bottom_right r_puw-popup_right_slide_in'
            case 'bottom_left':
                return 'r_puw-bottom_left r_puw-popup_left_slide_in'
        }
    }

    const getCornerRadius = () => {
        switch (widget.corner_radius) {
            case 'sharp':
                return 'r_puw-sharp'
            case 'slightly_rounded':
                return 'r_puw-popup_slightly_rounded'
            case 'rounded':
                return 'r_puw-popup_rounded'
            case 'extra_rounded':
                return 'r_puw-popup_extra_rounded'
            case 'none':
                return 'r_puw-popup_none'
        }
    }
    return (
        <>
            {!loading ? (
                <div
                    className={`wd_preview_content review-preview-wrap}`}>
                    <div className={`r_puw_container ${getPopupPosition()} ${getCornerRadius()}`}
                         style={methods.getPopupPreviewStyles()}
                         key={widget.position}
                    >
                <span className="r_puw_close-icon"
                      style={methods.getCloseIconStyles()}
                ><Cross1Icon/></span>
                        <div className="r_puw-review_wrapper">
                            <div className="r_puw-review_image_wrapper">
                                <img
                                    src={`https://unsplash.it/${getRandomNumber(500, 1000)}/${getRandomNumber(500, 1000)}` + `?t=` +Math.floor(Math.random() * 3)}
                                    className={`r_puw-review_image`}
                                    // style={{backgroundImage: 'url("")'}}
                                    onError={(e) => {
                                        console.log('Image Loading Error');
                                        //@ts-ignore
                                        e.target?.parentElement.remove();
                                    }}
                                ></img>

                            </div>
                            <div className={'r_puw-review-details-wrapper'}>
                                <div className={'r_puw-review-details-name'}>Edward</div>
                                <div className={'r_puw-review-details-name'}>
                                    <ReviewIcon/>
                                    <ReviewIcon/>
                                    <ReviewIcon/>
                                    <ReviewIcon/>
                                    <ReviewIcon/>
                                </div>
                                <div title="nice snowboard, awesome" className={'r_puw-review-details-content'}>
                                    nice snowboard, awesome
                                </div>
                            </div>
                            <div data-product-url=""
                                 style={methods.getPopupProductStyles()}>
                                <div className={'r_puw-product_details_wrapper'}>
                                    <div className={'r_puw-product_details-img_wrapper'}>
                                        <img
                                            src={'https://cdn.shopify.com/s/files/1/0664/4262/5197/files/snowboard_sky_x50.png?v=1720513923'}
                                            alt={""}
                                            className={'r_puw-product_details-img'}/>
                                    </div>
                                    <div title="The Compare at Price Snowboard"
                                         className={'r_puw-product_details-product_title'}>
                                        The Compare at Price S...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (<div style={{width: "100%", height: "100%"}}><LoadingSpinner/></div>)}
        </>)
}

export default PreviewPopupWidget;