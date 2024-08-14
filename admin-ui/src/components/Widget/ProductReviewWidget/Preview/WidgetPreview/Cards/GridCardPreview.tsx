import React, {useContext, useState} from "react";
import {Badge} from "../../../../../ui/badge";
import {ProductWidgetContext} from "../../../ProductReviewContextAPI";
import {REVIEW_OPENERS, REVIEW_SHADOWS} from "../../preview-constants";
import {getRepliesStyles, getReviewCardStyles} from "../../../helper";
import GemIcon from "../../../../../icon-components/GemIcon";

const GridCardPreview = ({review}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            key={review.id}
            className="grid-product-review-preview frt-mb-4 frt-flex frt-flex-col frt-border frt-border-gray-100 frt-divide-y frt-divide-amber-100"
            style={getReviewCardStyles(widget, isHovered)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={"frt-flex frt-flex-col frt-gap-2 frt-p-3"}>
                <span>{review.title}</span>
                {review.images.length > 0 ? (<img src={review.images[0].src}/>) : null}
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <span>{review.reviewer_name}</span>
                    {review.is_verified ? <span><Badge variant="outline">verified</Badge></span> : null}
                    <span>{review.date}</span>
                    <div className="frt-flex frt-flex-row frt-justify-start frt-gap-2">
                        <GemIcon color={"inherit"} size={'small'}/>
                        <GemIcon color={"inherit"} size={'small'}/>
                        <GemIcon color={"inherit"} size={'small'}/>
                        <GemIcon color={"gray"} size={'small'}/>
                        <GemIcon color={"gray"} size={'small'}/>
                    </div>
                    <p>{review.content}</p>
                </div>
            </div>
            {review.replies?.length > 0 ? (<div className={"frt-p-3"} style={getRepliesStyles(widget)}>
                    {review.replies.map((reply: any, index: number) => {
                        return (
                            <div>
                                <span>{reply.reviewer_name}</span>
                                <p>{reply.reply_content}</p>
                            </div>
                        )
                    })}
                </div>
            ) : null}
            <div className={"frt-flex frt-flex-row frt-gap-2 frt-items-center frt-p-3"}>
                <div className={"frt-py-2"}>
                    <img src={review.product.src} alt="" width={"100px"} height={"50px"}/>
                </div>
                <div><span>{review.product.product_name}</span></div>
            </div>
        </div>
    )
}

export default GridCardPreview;