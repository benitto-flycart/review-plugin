import React, {useContext, useEffect, useState} from "react";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";
import {useLocalState} from "../../zustand/localState";

const ReviewDetailWidgetPreview = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewDetailWidgetContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(1)

    const {localState} = useLocalState();

    const review = {
        id: 1,
        reviewer_name: 'benitto',
        review_title: 'Great Product',
        is_verified: false,
        date: "31/03/2024",
        rating: 5,
        content: "This product totally exceeded my expectations! The quality is off the charts and it's made my life so much easier. Seriously, I'm shouting from the rooftops!",
        images: [
            {
                id: 1,
                src: 'https://unsplash.it/500/987'
            },
            {
                id: 2,
                src: 'https://unsplash.it/300/800'
            },
            {
                id: 3,
                src: 'https://unsplash.it/500/900'
            },
            {
                id: 4,
                src: 'https://unsplash.it/200/300'
            },
            {
                id: 4,
                src: 'https://unsplash.it/453/567'
            },
            {
                id: 5,
                src: 'https://unsplash.it/210/450'
            }
        ],
        replies: [],
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


    const plusSlides = (n: number) => {
        showSlides(index + n);
        setIndex(index + n);
    }

    function currentSlide(n: number) {
        showSlides(n);
        setIndex(n);
    }

    function showSlides(n: number) {
        setIndex(n);
    }

    return (
        <div className={"r_rdw_container"}>
            <div className="r_rdw-image-container">
                <div className={"r_rdw_current_image"}>
                    {review.images.map((item: any, iteration: number) => {
                        return (
                            <div key={iteration} className={`mySlides ${index == iteration + 1 ? 'active' : ''}`}>
                                <img src={item.src} alt={""}/>
                            </div>
                        )
                    })}
                    <div className="r_rdw-caption-container">
                        <p id="caption">Caption Goes Here</p>
                    </div>
                    <div className={"r_rdw-slide-actions"}>
                        <a className="prev">❮</a>
                        <a className="next">❯</a>
                    </div>
                </div>
                <div className="row">
                    {review.images.map((item: any, iteration: number) => {
                        return (
                            <div key={iteration} className="column">
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
                    <div  className="r_rdw-spread-container">
                        <div  className="r_rdw-title">Benitto</div>
                        <div>
                            <button className="r_rdw-button-info">
                                info
                            </button>
                            <div
                                className="i-verified-notification">
                                <span>This review was written by a site visitor.</span>
                                <a href=""
                                className="r-rdw-rverified-notification-learn-more-trigger">Learn more</a></div>
                        </div>
                    </div>
                    <div className="spread-container">
                        <div data-time="1727350327063" data-testid="qv-review-date" className="time"
                             data-upgraded="true">26/09/2024
                        </div>
                    </div>
                </div>
                <div className="review-content-wrapper">
                    <div data-testid="qv-review-content" className="review-content">
                        <div className="pre-wrap normal-text">"I’ve been using this product for a month now, and it has
                            completely transformed the way I work. The build quality is top-notch, and the features are
                            exactly what I needed. It exceeded my expectations in every way, and I couldn’t be happier
                            with the results. I highly recommend this to anyone looking for reliability and performance.
                            Great job to the team!"
                        </div>
                    </div>
                    <div className="item-reply top-margin">
                        <div  data-testid="qv-review-reply-title"
                             className="item-reply-title secondary-title"><strong
                            className="small-text font-weight-bold">review-wprelay</strong> replied:
                        </div>
                        <div data-testid="qv-review-reply-text" className="pre-wrap normal-text">Your reply is captured
                            thank you
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewDetailWidgetPreview;