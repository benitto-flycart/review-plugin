import React, {useContext, useState} from "react";
import {ProductWidgetContext} from "../../../ProductReviewContextAPI";
import {getRepliesStyles, getReviewCardStyles, getVerifiedStyles} from "../../../helper";
import {Badge} from "../../../../../ui/badge";
import ReviewIcon from "../../../../../ReviewIcon";

const MosaicCardPreview = ({review}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            key={review.id}
            className="r_pw_r_container r_pw_r_m_container"
            style={getReviewCardStyles(widget)}
        >
            <div className={"r_pw_r_m_review-details-container"}>
                <span>{review.title}</span>
                <div className={"r_pw_r_m_review-details"}>
                    <span>{review.reviewer_name}</span>
                    {review.is_verified ? <span><span
                        style={getVerifiedStyles(widget)}
                    >verified</span></span> : null}
                    <span>{review.date}</span>
                    <div className="r_pw_r_m_review-details--review-icons">
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                    </div>
                    <p>{review.content}</p>
                    {review.images.length > 0 ? (<img src={review.images[0].src} width={60} height={60}/>) : null}
                </div>
            </div>
            {review.replies?.length > 0 ? (
                <div className={"r_pw_r_reply_container r_pw_r_m_review-details--reply-container"}
                     style={getRepliesStyles(widget)}>
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
            <div className={"r_pw_r_m_review-details--product_container"}>
                <div className={"r_pw_r_m_review-details--product_img_container"}>
                    <img src={review.product.src} alt="" width={"100px"} height={"50px"}/>
                </div>
                <div><span>{review.product.product_name}</span></div>
            </div>
        </div>
    )
}

export default MosaicCardPreview;