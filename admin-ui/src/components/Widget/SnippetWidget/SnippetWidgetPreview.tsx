import React, {useContext, useEffect, useState} from "react";

import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";
// import "./carosual.css";
import ReviewIcon from "../../ReviewIcon";
import {useLocalState} from "../../zustand/localState";

const PreviewSnippetWidget = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(SnippetWidgetContext)
    const [index, setIndex] = useState<any>(0);
    const {localState} = useLocalState()
    const [loading, setLoading] = useState(true)

    const reviews = [
        {
            review_title: 'First Title',
            reviewer_name: 'BEnitto 1',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                }
            ],
        },
        {
            review_title: 'First Title',
            reviewer_name: 'Benitto 2',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [],
        },
        {
            review_title: 'First Title',
            reviewer_name: 'Benitto',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                }
            ],
        },
        {
            review_title: 'First Title',
            reviewer_name: 'Benitto 3',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg',
                },
                {
                    id: 1,
                    src: 'https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg',
                }
            ],
        },
        {
            review_title: 'First Title',
            reviewer_name: 'Benitto 4',
            is_verified: false,
            date: "31/03/2024",
            content: "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
            images: [],
        }
    ]


    const length = 3;
    const handlePrevious = () => {
        const newIndex = index - 1;
        setIndex(newIndex < 0 ? length - 1 : newIndex);
    };

    const handleNext = () => {
        const newIndex = index + 1;
        setIndex(newIndex >= length ? 0 : newIndex);
    };

    useEffect(() => {

        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = true
        })

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];

            let linkElement: any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = localState.iframe_styles?.snippet_widget?.widget_css; // Replace with the URL of your stylesheet

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

        }, 2000)

    }, [widget.layout]);

    return (
        <div
            className={`wd_snippet_preview wd_preview_content review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative ${widget.view == 'mobile' ? 'snippet-widget-preview-mobile' : 'snippet-widget-preview-desktop'}`}>
            <div className={"r_sw__container_react r_sw__container"}>
                <div className={'r_sw__product_wrapper'}>
                    <div className={'r_sw__product_img_wrapper'}>
                        <img
                            className={"r_sw__product_img"}
                            src="http://localhost:8004/wp-content/uploads/2023/11/album-1.jpg"
                            alt=""/>
                    </div>
                    <div className={'r_sw_product_details_wrapper'}>
                        <h2 className={'r_sw__product_title'}>Album</h2>
                        <h2 className={'r_sw__product_price'}>price</h2>
                        <p className={'r_sw__product_description'}>This is a simple, Virtual Product</p>
                        <button className={`r_sw__add_to_cart_button`}>Add to Cart</button>
                        <div>
                            <div className="r_sw__carousel">
                                {reviews.map((item: any, i: number) => {
                                    return (
                                        <div
                                            className={`r_sw__carousel-item ${i == index ? 'r_sw__carousel-item-visible' : ''}`}
                                            style={methods.getStyles()}>
                                            {widget.show_review_image && (item.images?.length > 0) ? (
                                                <React.Fragment>
                                                    <img
                                                        className={"r_sw__carousel-item_imgae"}
                                                        src={item.images[0].src}
                                                        alt="Alternative Text"
                                                        width={"50px"}
                                                        onError={(e) => {
                                                            //@ts-ignore
                                                            e?.target?.remove();
                                                        }}
                                                    />
                                                </React.Fragment>
                                            ) : null}
                                            <div className={"r_sw__review_details_wrapper"}>
                                                <div
                                                    className={"r_sw__review_details"}>
                                                    <div
                                                        style={methods.getReviewerNameStyle()}>{item.reviewer_name}</div>
                                                    {widget.show_rating ? (
                                                        <div
                                                            className="r_sw__review_details_icons"
                                                            style={methods.getRatingIconStyles()}>
                                                            <ReviewIcon/>
                                                            <ReviewIcon/>
                                                            <ReviewIcon/>
                                                            <ReviewIcon/>
                                                            <ReviewIcon/>
                                                        </div>) : null}
                                                </div>
                                                <div className={"r_sw__review_text "}
                                                     style={methods.getReviewStyles()}>{item.content}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="r_sw__carousel-actions">
                                    <button
                                        className={`${index == 0 ? 'disabled' : ''} r_sw__carousel-button-prev`}
                                        style={methods.getCarosualActionStyle()}
                                        disabled={index == 0} onClick={(e: any) => {
                                        setIndex(index - 1);
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M11.05 12 16 7.05l-1.414-1.414L8.222 12l6.364 6.364L16 16.95 11.05 12Z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className={`${index == (reviews.length - 1) ? 'disabled' : ''} r_sw__carousel-button-next`}
                                        disabled={index == (reviews.length - 1)}
                                        style={methods.getCarosualActionStyle()}
                                        onClick={(e: any) => {
                                            setIndex(index + 1)
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="m13.172 12-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414 4.95-4.95Z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default PreviewSnippetWidget;