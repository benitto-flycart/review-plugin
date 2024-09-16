import React, {useContext, useState} from "react";
import {ProductWidgetContext} from "../../../ProductReviewContextAPI";
import {getReviewCardStyles} from "../../../helper";
import GemIcon from "../../../../../icon-components/GemIcon";
import ReviewIcon from "../../../../../ReviewIcon";

const ListCardPreview = ({review}: any) => {

    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            key={review.id}
            className={"r_pw_r_l_container"}
            style={getReviewCardStyles(widget, isHovered)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={"r_pw_r_l_container--review_details"}>
                <div className={"r_pw_r_l_container--review_details-overview"}>
                    <span className={"r_pw_r_l_container--review_details-reviewer_name"}>{review.reviewer_name}</span>
                    <span
                        className={"r_pw_r_l_container--review_details-review_title"}>{review.review_title}</span>
                    {review.is_verified ? <span className={"r_pw_r_l_container--review_details-review_verfied"}>Verified</span> : null}
                </div>
                <div className={"r_pw_r_l_container--review_details--rating_details"}>
                    <span className={"r_pw_r_l_container--review_details--review-date"}>{review.date}</span>
                    <div className="r_pw_r_l_container--review_details--rating_details_icons">
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                        <ReviewIcon/>
                    </div>
                </div>
            </div>
            <div className={"r_pw_r_l_container--review_content_container"}>
                <p className={"r_pw_r_l_container--review_content"}>{review.content}</p>
                {review.images?.length > 0 ? (
                    <img className={"r_pw_r_l_container--review_content_img"} src={review.images[0].src} alt={""}/>
                ) : null}
            </div>
            {review.replies?.length > 0 ? (
               <div className={"r_pw_r_l_container--reply_container"}>
                   {review.replies?.map((reply: any, index: number) => {
                       return (
                           <div className={"r_pw_r_l_container--reply_container_details"} key={index}>
                               <span className={"r_pw_r_l_container--reply_reviewer_name"}>{reply.reviewer_name} replied</span>
                               <p className={"r_pw_r_l_container--reply_content"}>{reply.reply_content}</p>
                               {reply.images?.length > 0 ? (
                                   <div className={"r_pw_r_l_container--reply_content_img_container"}>
                                       {reply.images?.map((img: any, index: number) => {
                                               return (
                                                   <div key={img.id}>
                                                       <img src={img.src} alt={""} height={"50px"} width={"50px"}/>
                                                   </div>
                                               )
                                           }
                                       )}
                                   </div>
                               ) : null}
                           </div>
                       )
                   })}
               </div>
            ) : null}


            <div className={"frt-p-3"}>
                <img className={"frt-rounded"} src={review.product.src} alt={""} height={"50px"}
                     width={"50px"}/>
                <span>{review.product.product_name}</span>
            </div>

        </div>
    )
}

export default ListCardPreview;