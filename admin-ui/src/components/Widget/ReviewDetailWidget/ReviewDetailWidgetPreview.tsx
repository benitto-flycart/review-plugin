import React, {useContext, useEffect, useState} from "react";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";
import {useLocalState} from "../../zustand/localState";
import ReviewIcon from "../../ReviewIcon";

const ReviewDetailWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewDetailWidgetContext)
    const [index, setIndex] = useState<number>(1)
    const [translateX, setTranslateX] = useState<number>(0)

    const {localState} = useLocalState();

    const review = {
        id: 1,
        reviewer_name: 'benitto',
        review_title: 'Great Product',
        is_verified: false,
        date: "31/03/2024",
        rating: 5,
        content: 'I’ve been using this product for a month now, and it has\n' +
            '                            completely transformed the way I work. The build quality is top-notch, and the features are\n' +
            '                            exactly what I needed. It exceeded my expectations in every way, and I couldn’t be happier\n' +
            '                            with the results. I highly recommend this to anyone looking for reliability and performance.\n' +
            '                            Great job to the team!',
        images: [
            {
                id: 1,
                src: 'http://localhost:8004/wp-content/uploads/2023/11/album-1.jpg'
            },
            {
                id: 2,
                src: 'http://localhost:8004/wp-content/uploads/2023/11/belt-2-600x600.jpg'
            },
            {
                id: 3,
                src: 'http://localhost:8004/wp-content/uploads/2023/11/logo-1-600x599.jpg'
            },
            {
                id: 4,
                src: 'http://localhost:8004/wp-content/uploads/2023/11/beanie-with-logo-1-600x600.jpg'
            },
            {
                id: 4,
                src: 'http://localhost:8004/wp-content/uploads/2023/11/sunglasses-2-600x600.jpg'
            },
            {
                id: 5,
                src: 'http://localhost:8004/wp-content/uploads/2023/11/hoodie-with-zipper-2-600x600.jpg'
            }
        ],
        replies: [
            {
                'reviewer_name': 'Mike',
                'reply_content': "Thank you so much for your amazing review! We're thrilled to hear that our product exceeded your expectations and made your life easier ⭐",
                'images': [],
            },
        ],
        product: {
            product_name: 'Sample Product',
            src: ''
        }
    };


    useEffect(() => {
        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = true
        })

        //@ts-ignore
        let iframe: any = window.frames['widget_preview_iframe'];

        let linkElement: any = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = localState.iframe_styles?.review_detail_widget?.widget_css; // Replace with the URL of your stylesheet

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
    }, []);


    const setSlide = (n: number) => {
        if (index === n) return; // Avoid unnecessary operations if the target is the same as current index

        setTranslateX(translateX + (index - n) * 100); // Handle both left and right sliding
        setIndex(n); // Update the current index
    }

    function decrease() {
        setIndex(index - 1);
        setTranslateX(translateX + 100)
    }

    function increase() {
        setIndex(index + 1);
        setTranslateX(translateX - 100)
    }

    return (
        <div className={"r_rdw_container"} style={methods.getReviewDetailVariables()}>
            <div className={"r_rdw_close_icon"}>
                <i className="review review-cross-icon"></i>
            </div>
            <div className={"r_rdw-main_content"}>
                <div className="r_rdw-image-container">
                    <div className={"r_rdw_all_images"}>
                        <div className={"r_rdw_all_images_wrapper"}
                             style={{transform: `translateX(${translateX + '%'})`}}>
                            {review.images.map((item: any, iteration: number) => {
                                return (
                                    <div key={iteration}
                                         className={`r_rdw_active_image mySlides ${iteration + 1 == index ? 'active' : ''}`}>
                                        <img src={item.src} alt={""}/>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={"r_rdw-slide-actions"}>
                            <button className={`prev ${index == 1 ? 'disabled' : ''}`} onClick={decrease}
                                    disabled={index == 1}>❮
                            </button>
                            <button className={`next ${index == review.images.length ? 'disabled' : ''}`}
                                    onClick={increase}
                                    disabled={index == review.images.length}>❯
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {review.images.map((item: any, iteration: number) => {
                            return (
                                <div key={iteration} className={`column ${iteration + 1 == index ? 'active' : ''}`}
                                     onClick={() => {
                                         setSlide(iteration + 1);
                                     }}>
                                    <img className="demo cursor" src={item.src} style={{width: "100%"}}
                                         alt="The Woods"/>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="r_rdw-detail-wrapper">
                    <div className="r_rdw-review-details">
                        <div className="r_rdw-spread-container">
                            <div className="r_rdw-title">{review.reviewer_name}</div>
                            <div className="r_rdw-overview">
                                <button className="r_rdw-button-info">
                                    <i className="review review-info"></i>
                                </button>
                                <div
                                    className="r_rdw-i-verified-notification r_rdw_hide">
                                    <span>{!review.is_verified ? "This review was written by a site visitor" : "This review was written by a verified user"}.</span>
                                    <a href=""
                                       className="r-rdw-rverified-notification-learn-more-trigger">Learn more</a></div>
                            </div>
                        </div>
                        <div className="r_rdw-spread-container">
                            <div className="r_rdw-review-icons">
                                <ReviewIcon/>
                                <ReviewIcon/>
                                <ReviewIcon/>
                                <ReviewIcon/>
                                <ReviewIcon/>
                            </div>
                            <div data-time="1727350327063" data-testid="qv-review-date" className="time"
                                 data-upgraded="true">{review.date}</div>
                        </div>
                    </div>
                    <div className="r_rdw-review-content-wrapper">
                        <div className="r_rdw-review-content">
                            <div className="r_rdw-review-content-text">{review.content}</div>
                        </div>
                        {review.replies.map((reply: any) => {
                            return (
                                <div className="r_rdw-review-item-reply">
                                    <div className="r_rdw-item-reply-title">
                                        <strong
                                            className="r_rdw-small-text r_rdw-font-weight-bold">{reply.reviewer_name}</strong> replied:
                                    </div>
                                    <div className="r_rdw-normal-text">{reply.reply_content}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewDetailWidgetPreview;
