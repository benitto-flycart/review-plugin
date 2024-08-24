import React, {useContext, useEffect, useState} from "react";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import './sparkle.css'
import RatingSlide from "./ReviewForm/RatingSlide";
import PhotoSlide from "./ReviewForm/PhotoSlide";
import ReviewContentSlide from "./ReviewForm/ReviewContentSlide";
import ReviewerInfoSlide from "./ReviewForm/ReviewerInfoSlide";
import ThankyouSlide from "./ReviewForm/ThankyouSlide";

const ReviewFormWidgetPreview = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    const [activeSlide, setActiveSlide] = useState<number>(1)

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



    return (
        <div
            className={`wd_preview_content review_form_widget review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}>
            <div className={"wd_review_form_wrapper"} style={methods.getDialogStyles()}>
                <div className={"wd_review_form_header"}>
                    <span>X</span>
                </div>
                <div className={`wd_review_form_main_content`} style={{transform: `translateX(${translateX}%)`}}>
                    <div className={`wd_review_form_content`}>
                        <RatingSlide rating={rating} updateRating={updateRating}/>
                    </div>
                    <div className={`wd_review_form_content`}>
                        <PhotoSlide/>
                    </div>
                    <div className={`wd_review_form_content wd_review_content`}>
                        <ReviewContentSlide/>
                    </div>
                    <div className={"wd_review_form_content"}>
                        <ReviewerInfoSlide/>
                    </div>
                    <div
                        className={`wd_review_form_content`}>
                        <ThankyouSlide/>
                    </div>
                </div>
                <div className={"wd_review_form_footer"}>
                    {activeSlide != 1 ? (
                        <>
                            <button onClick={handlePrevClick}
                                    style={methods.getFooterButtonStyles()}
                                    className={"back_button"}
                            >Back
                            </button>

                            <button onClick={handleNextClick}
                                    style={methods.getFooterButtonStyles()}
                                    className={"forward_button"}

                            >Skip
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default ReviewFormWidgetPreview;