import React, {useContext, useEffect, useState} from "react";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import './sparkle.css'
import RatingSlide from "./ReviewForm/RatingSlide";
import PhotoSlide from "./ReviewForm/PhotoSlide";
import ReviewContentSlide from "./ReviewForm/ReviewContentSlide";
import ReviewerInfoSlide from "./ReviewForm/ReviewerInfoSlide";
import ThankyouSlide from "./ReviewForm/ThankyouSlide";
import {LoadingSpinner} from "../../ui/loader";

const ReviewFormWidgetPreview = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    const [activeSlide, setActiveSlide] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const [rating, setRating] = useState<number>(0)


    const [translateX, setTranslateX] = useState(0);

    const handleNextClick = () => {
        setActiveSlide((prevActiveSlide) => (prevActiveSlide + 1))
        setTranslateX((prevTranslateX) => (prevTranslateX - 100)); // Decrease to move slides left
    };

    const handlePrevClick = () => {
        setActiveSlide((prevActiveSlide) => (prevActiveSlide - 1))
        setTranslateX((prevTranslateX) => (prevTranslateX + 100)); // Decrease to move slides left
    };

    const updateRating = (selectedRating: number) => {
        setRating(selectedRating)
        setTimeout(() => {
            handleNextClick();
        }, 700)
    }

    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];

// Create a new link element
            let linkElement: any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/review_form_widget.css'; // Replace with the URL of your stylesheet

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
                    className={`wd_preview_content review_form_widget review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}>
                    <div className={"r_rfw_container"} style={methods.getDialogStyles()}>
                        {activeSlide == 1 ? (
                            <div className={"r_rfw_header"} style={methods.getDialogStyles()}>
                                <span>X</span>
                            </div>) : null}
                        <div className={`r_rfw_main_content_wrapper`}
                             style={{transform: `translateX(${translateX}%)`}}>
                            <div className={`r_rfw_slide`}>
                                <RatingSlide rating={rating} updateRating={updateRating}/>
                            </div>
                            <div className={`r_rfw_slide`}>
                                <PhotoSlide/>
                            </div>
                            <div className={`r_rfw_slide`}>
                                <ReviewContentSlide/>
                            </div>
                            <div className={"r_rfw_slide"}>
                                <ReviewerInfoSlide/>
                            </div>
                            <div
                                className={`r_rfw_slide`}>
                                <ThankyouSlide/>
                            </div>
                        </div>
                        <div className={"r_rfw_footer_wrapper"}>
                            {activeSlide != 1 ? (
                                <>
                                    <button onClick={handlePrevClick}
                                            style={methods.getFooterButtonStyles()}
                                            className={"r_rfw_footer_btn r_rfw_footer_back_btn"}
                                    >Back
                                    </button>

                                    <button onClick={handleNextClick}
                                            style={methods.getFooterButtonStyles()}
                                            className={"r_rfw_footer_btn r_rfw_footer_forward_btn"}>Skip
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : (<div style={{width: "100%", height: "100%"}}><LoadingSpinner/></div>)}
        </>)
}

export default ReviewFormWidgetPreview;