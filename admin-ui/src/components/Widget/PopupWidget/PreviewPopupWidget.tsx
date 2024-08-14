import React, {useContext} from "react";

import styles from "./popup.module.css";
import {PopupWidgetContext} from "./PopupWidgetContextAPI";
import GemIcon from "../../icon-components/GemIcon";
import {Cross1Icon} from "@radix-ui/react-icons";

console.log(styles);

const PreviewPopupWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(PopupWidgetContext)

    const getPopupPosition = () => {
        switch (widget.position) {
            case 'top_right':
                return styles.popup_top_right
            case 'top_left':
                return styles.popup_top_left
            case 'bottom_right':
                return styles.popup_bottom_right
            case 'bottom_left':
                return styles.popup_bottom_left
        }
    }

    const getCornerRadius = () => {
        switch (widget.corner_radius) {
            case 'sharp':
                return styles.popup_sharp
            case 'slightly_rounded':
                return styles.popup_slightly_rounded
            case 'rounded':
                return styles.popup_rounded
            case 'extra_rounded':
                return styles.popup_extra_rounded
            case 'none':
                return styles.popup_none
        }
    }
    return (
        <div
            className={"review-preview-wrap popup-widget frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative"}>
            <div className={`  ${styles.popup_container_wrapper} ${getPopupPosition()} ${getCornerRadius()}`}
                 style={methods.getPopupPreviewStyles()}>
                <span className={"frt-absolute frt-right-[15px] frt-top-[15px] frt-text-blue-700"} ><Cross1Icon/></span>
                <div className={styles.review_wrapper}>
                    <div className={styles.review_image_wrapper}>
                        <div
                            className={`${styles.review_image}`}
                            style={{backgroundImage: 'url("https://images.loox.io/uploads/2024/7/9/Wp5nKPbVA8.jpg")'}}
                            onError={function () {
                                //
                            }}
                        ></div>

                    </div>
                    <div className={styles.review_body}>
                        <div className={styles.reviewer_name}>Edward</div>
                        <div className={styles.review_icon_wrapper}>
                            <GemIcon size={'medium'} color={'inherit'}/>
                            <GemIcon size={'medium'} color={'inherit'}/>
                            <GemIcon size={'medium'} color={'inherit'}/>
                            <GemIcon size={'medium'} color={'inherit'}/>
                            <GemIcon size={'medium'} color={'inherit'}/>
                        </div>
                        <div title="nice snowboard, awesome" className={styles.review_content}>
                            nice snowboard, awesome
                        </div>
                    </div>
                    <div data-product-url=""
                         style={methods.getPopupProductStyles()}>
                        <div className={styles.review_product_wrapper}>
                            <div className={styles.review_product_image_wrapper}>
                                <img
                                    src={'https://cdn.shopify.com/s/files/1/0664/4262/5197/files/snowboard_sky_x50.png?v=1720513923'}
                                    alt={""}
                                    className={styles.review_product_image}/>
                            </div>
                            <div title="The Compare at Price Snowboard" className={styles.review_product_title}>
                                The Compare at Price S...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default PreviewPopupWidget;