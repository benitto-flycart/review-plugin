import React, {useContext, useEffect, useState} from "react";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";
import './sparkle.css'
import RatingSlide from "./ReviewForm/RatingSlide";
import PhotoSlide from "./ReviewForm/PhotoSlide";
import ReviewContentSlide from "./ReviewForm/ReviewContentSlide";
import ReviewerInfoSlide from "./ReviewForm/ReviewerInfoSlide";
import ThankyouSlide from "./ReviewForm/ThankyouSlide";
import {useLocalState} from "../../zustand/localState";
import RemainingItems from "./ReviewForm/RemainingItems";

const ReviewFormWidgetPreview = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)
    const {localState} = useLocalState()
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

        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = true
        })

        //@ts-ignore
        let iframe: any = window.frames['widget_preview_iframe'];

        let linkElement: any = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = localState.iframe_styles?.review_form_widget?.widget_css; // Replace with the URL of your stylesheet

        let head = iframe.contentDocument.head;
        let body = iframe.contentDocument.body;
        head.appendChild(linkElement);

        let another = document.createElement('link');
        another.rel = 'stylesheet';
        another.href = localState.iframe_styles?.font_css; // Replace with the URL of your stylesheet
        head.appendChild(another);

        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = false
        })

    }, [widget.layout]);


    return (
        <div
            className={`wd_preview_content review_form_widget review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}>
            <div className={"r_rfw_container"} style={methods.getDialogStyles()}>
                {activeSlide == 1 ? (
                    <div className={"r_rfw_header"} style={methods.getDialogStyles()}>
                        <button className={"r_rfw_btn"} style={methods.getFooterButtonStyles()}>
                        <span className={"review review-cross-icon"} ></span>
                        </button>
                    </div>) : <div className={"r_rfw_footer_wrapper r_rfw_footer_wrapper_up"}>
                    {activeSlide != 1 ? (
                        <>
                            <button onClick={handlePrevClick}
                                                                style={methods.getFooterButtonStyles()}
                                                                className={"r_rfw_btn r_rfw_footer_btn r_rfw_footer_back_btn"}>
                                <span className={"review review-arrow-left"}></span>
                            </button>
                            {activeSlide == 2 ? (<button onClick={handleNextClick}
                                                         style={methods.getFooterButtonStyles()}
                                                         className={"r_rfw_btn r_rfw_footer_btn r_rfw_footer_forward_btn"}>Skip
                            </button>) : null}
                        </>
                    ) : null}
                </div>}
                <div className={`r_rfw_main_content_wrapper`}
                     style={{transform: `translateX(${translateX}%)`}}>
                    <div className={`r_rfw_slide`}>
                        <RatingSlide rating={rating} updateRating={updateRating}/>
                    </div>
                    <div className={`r_rfw_slide`}>
                        <PhotoSlide/>
                    </div>
                    <div className={`r_rfw_slide`}>
                        <ReviewContentSlide handleNextSlide={handleNextClick}/>
                    </div>
                    <div className={"r_rfw_slide"}>
                        <ReviewerInfoSlide handleNextSlide={handleNextClick}/>
                    </div>
                    <div
                        className={`r_rfw_slide`}>
                        <ThankyouSlide handleNextClick={handleNextClick}/>
                    </div>
                    <div
                        className={`r_rfw_slide`}>
                        <RemainingItems />
                    </div>
                </div>
                <div className={"r_rfw_footer_wrapper r_rfw_footer_wrapper_down"}>
                    {activeSlide != 1 ? (
                        <>
                            <button onClick={handlePrevClick}
                                                                style={methods.getFooterButtonStyles()}
                                                                className={"r_rfw_btn r_rfw_footer_btn r_rfw_footer_back_btn"}>
                                <span className={"review review-arrow-left"}></span>
                            </button>
                            {activeSlide == 2 ? (
                                <button onClick={handleNextClick}
                                        style={methods.getFooterButtonStyles()}
                                        className={"r_rfw_btn r_rfw_footer_btn r_rfw_footer_forward_btn"}>Skip
                                </button>) : null}
                        </>
                    ) : null}
                </div>
            </div>
        </div>)
}

export default ReviewFormWidgetPreview;