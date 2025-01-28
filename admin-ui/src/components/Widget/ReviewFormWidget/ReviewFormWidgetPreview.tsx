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
import * as yup from "yup";
import {applyStylesToIframe} from "../../../helpers/utils";

const ReviewFormWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)
    const {localState} = useLocalState();

    const [review, setReview] = useState<any>({
        rating: 0,
        review_text: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const slideList: any = [
        'rating',
        'photo',
        'review',
        'reviewer',
        'thank_you',
        'next_products'
    ];
    const [activeSlide, setActiveSlide] = useState<any>({
        index: 0,
        name: 'rating'
    })
    const [loading, setLoading] = useState<boolean>(false)

    const [translateX, setTranslateX] = useState(0);

    const [images, setImages] = useState<Array<any>>([])

    const [errors, setErrors] = useState<any>({})

    const getNextButtonName = () => {
        if (activeSlide.name == 'photo') {
            return images.length == 0 ? 'Skip' : 'Continue';
        } else if (activeSlide.name == 'review') {
            return 'Continue';
        } else if (activeSlide.name == 'reviewer') {
            return 'Done';
        } else {
            return 'Continue';
        }
    }

    const getPreviousButtonName = () => {
        return 'Back';
    }

    const isNeedToShowNext = () => {
        if (activeSlide.name == 'rating' || activeSlide.name == 'thank_you' || activeSlide.name == 'next_products') {
            return false;
        }

        return true;
    }

    const handleNextClick = () => {
        if (activeSlide.name == 'review') {
            validateReviewContent();
        } else if (activeSlide.name == 'reviewer') {
            validateReviewerInfo();
        } else {
            moveNextSlide();
        }
    };

    const moveNextSlide = () => {
        setActiveSlide((prevActiveSlide: any) => {
            let index: number = prevActiveSlide.index + 1;
            return {
                index: index,
                name: slideList[index]
            }
        })
        setTranslateX((prevTranslateX) => (prevTranslateX - 100)); // Decrease to move slides left
    }

    const handlePrevClick = () => {
        setActiveSlide((prevActiveSlide: any) => {
            let index = prevActiveSlide.index - 1
            return {
                index: index,
                name: slideList[index]
            }
        })

        setTranslateX((prevTranslateX) => (prevTranslateX + 100)); // Decrease to move slides left
    };

    const updateRating = (selectedRating: number) => {
        setReview({...review, rating: selectedRating})
        setTimeout(() => {
            handleNextClick();
        }, 700)
    }


    const reviewContentValidationSchema = yup.object().shape({
        review_text: yup.string().required("Please enter a review"),
    })

    const validateReviewContent = () => {
        reviewContentValidationSchema.validate(review, {abortEarly: false}).then(() => {
            setErrors({})
            moveNextSlide();
        }).catch((validationError) => {
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            setErrors(validationErrors)
        });
    }

    const reviewerValidationSchema = yup.object().shape({
        first_name: yup.string().required("Please enter a first name"),
        last_name: yup.string().required("Please enter a last name"),
        email: yup.string().email("Enter a valid email address").required("Please enter a email"),
    })

    const validateReviewerInfo = () => {
        reviewerValidationSchema.validate(review, {abortEarly: false}).then(() => {
            setErrors({})
            moveNextSlide();
        }).catch((validationError) => {
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            setErrors((validationErrors))
        })
    }

    useEffect(() => {
        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = true
        })
        //@ts-ignore
        let iframe: any = window.frames['widget_preview_iframe'];
        applyStylesToIframe(iframe,localState.iframe_styles?.review_form_widget,localState.iframe_styles?.font_css)
        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = false
        })

    }, [widget.layout]);

    return (
        <div
            className={`wd_preview_content review_form_widget farp-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-relative ${widget.view == 'mobile' ? 'rating-widget-preview-mobile' : 'rating-widget-preview-desktop'}`}>
            <div className={"r_rfw_container"} style={methods.getReviewFormVariables()}>
                {activeSlide.name == 'rating' ? (
                    <div className={"r_rfw_header"}>
                        <button className={"r_rfw_btn"}>
                            <span className={"farp farp-cross-icon r_rfw_btn_back"}></span>
                        </button>
                    </div>) : null}
                <div className={`r_rfw_main_content_wrapper`}
                     style={{transform: `translateX(${translateX}%)`}}>
                    <div className={`r_rfw_slide`}>
                        <RatingSlide rating={review.rating} updateRating={updateRating}/>
                    </div>
                    <div className={`r_rfw_slide`}>
                        <PhotoSlide images={images} setImages={setImages} handleNextClick={handleNextClick}/>
                    </div>
                    <div className={`r_rfw_slide`}>
                        <ReviewContentSlide handleNextSlide={handleNextClick}
                                            reviews={review}
                                            setReviews={setReview}
                                            errors={errors}
                        />
                    </div>
                    <div className={"r_rfw_slide"}>
                        <ReviewerInfoSlide
                            handleNextSlide={handleNextClick}
                            reviews={review}
                            setReviews={setReview}
                            errors={errors}
                        />
                    </div>
                    <div
                        className={`r_rfw_slide`}>
                        <ThankyouSlide handleNextClick={handleNextClick}/>
                    </div>
                    <div
                        className={`r_rfw_slide`}>
                        <RemainingItems/>
                    </div>
                </div>
                <div className={"r_rfw_footer_wrapper r_rfw_footer_wrapper_down"}>
                    <button onClick={handlePrevClick}
                            className={`r_rfw_btn r_rfw_footer_btn r_rfw_footer_back_btn ${activeSlide.name != 'rating' ? '' : 'r_rfw_hide'}`}>
                        {getPreviousButtonName()}
                        <span className={"farp farp-arrow-left"}></span>
                    </button>
                    <button onClick={handleNextClick}
                            className={`r_rfw_btn r_rfw_footer_btn r_rfw_footer_forward_btn ${isNeedToShowNext() ? '' : 'r_rfw_hide'}`}>
                        {getNextButtonName()}
                        <span className={"farp farp-arrow-right"}></span>
                    </button>
                </div>
            </div>
        </div>)
}

export default ReviewFormWidgetPreview;