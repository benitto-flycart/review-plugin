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
        console.log('calling next slide');
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
            console.log('Executing validation');
            setErrors({})
            console.log('moving to next slide');
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
            <div className={"r_rfw_container"} style={methods.getReviewFormVariables()}>
                {activeSlide.name == 'rating' ? (
                    <div className={"r_rfw_header"}>
                        <button className={"r_rfw_btn"}>
                            <span className={"review review-cross-icon r_rfw_btn_back"}></span>
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
                        <span className={"review review-arrow-left"}></span>
                    </button>
                    <button onClick={handleNextClick}
                            className={`r_rfw_btn r_rfw_footer_btn r_rfw_footer_forward_btn ${isNeedToShowNext() ? '' : 'r_rfw_hide'}`}>
                        {getNextButtonName()}
                    </button>
                </div>
            </div>
        </div>)
}

export default ReviewFormWidgetPreview;