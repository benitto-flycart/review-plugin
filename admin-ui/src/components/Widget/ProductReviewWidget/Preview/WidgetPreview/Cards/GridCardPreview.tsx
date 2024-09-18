import React from "react";
import {Badge} from "../../../../../ui/badge";
import ReviewIcon from "../../../../../ReviewIcon";

const GridCardPreview = ({review}: any) => {
    return (
        <div
            key={review.id}
            className="r_pw_r_container r_pw_r_g_container"
        >
            <div className={"r_pw_r_g_container--review-details"}>
                <span className={"r_pw_r_g_container--review-details--title"}>{review.title}</span>
                {review.images.length > 0 ? (
                    <img src={review.images[0].src} className={"r_pw_r_g_container--review-details--image"}/>) : null}
                <div className={"r_pw_r_g_container--review-info"}>
                    <span className={"r_pw_r_g_container--review-info-name"}>{review.reviewer_name}</span>
                    {review.is_verified ? <span className={"r_pw_r_g_container--review-is-verified"}><Badge
                        variant="outline">verified</Badge></span> : null}
                    <span className={"r_pw_r_g_container--review-date"}>{review.date}</span>
                    <div className="r_pw_r_g_container--review-rating-details">
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                    </div>
                    <p className={"r_pw_r_g_container--review-content"}>{review.content}</p>
                </div>
            </div>
            {review.replies?.length > 0 ? (<div
                    className={"r_pw_r_reply_container r_pw_r_g_container--reply-container"}
                >
                    {review.replies.map((reply: any, index: number) => {
                        return (
                            <div key={index}>
                                <span
                                    className={"r_pw_r_g_container--reply--reviewer_name"}>{reply.reviewer_name}</span>
                                <p className={"r_pw_r_g_container--reply--content"}>{reply.reply_content}</p>
                            </div>
                        )
                    })}
                </div>
            ) : null}
            <div className={"r_pw_r_g_container--product_container"}>
                <div className={"r_pw_r_g_container--product_container--img_container"}>
                    <img src={review.product.src} alt="" width={"100px"} height={"50px"}/>
                </div>
                <div className={"r_pw_r_g_container--product_container--product_name"}>
                    <span>{review.product.product_name}</span></div>
            </div>
        </div>
    )
}

export default GridCardPreview;