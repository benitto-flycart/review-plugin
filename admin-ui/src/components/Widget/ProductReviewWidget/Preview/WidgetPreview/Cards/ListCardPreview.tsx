import React, {useContext, useState} from "react";
import {ProductWidgetContext} from "../../../ProductReviewContextAPI";
import {getReviewCardStyles} from "../../../helper";
import GemIcon from "../../../../../icon-components/GemIcon";

const ListCardPreview = ({review}: any) => {

    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            key={review.id}
            className={"frt-flex frt-flex-col frt-border  frt-divide-y frt-divide-amber-100"}
            style={getReviewCardStyles(widget, isHovered)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={"frt-flex frt-flex-col frt-flex-start frt-gap-2 frt-p-3"}>
                <div className={"frt-flex frt-flex-row frt-gap-2 frt-items-center"}>
                    <span>{review.reviewer_name}</span>
                    <span
                        className={"frt-bg-gray-700 frt-text-white frt-rounded frt-p-1"}>{review.review_title}</span>
                    {review.is_verified ? <span>Verified</span> : null}
                </div>
                <div className={"frt-flex frt-flex-col"}>
                    <span>{review.date}</span>
                    <div className="frt-flex frt-flex-row frt-justify-start frt-gap-2">
                        <GemIcon color={"inherit"} size={'small'}/>
                        <GemIcon color={"inherit"} size={'small'}/>
                        <GemIcon color={"inherit"} size={'small'}/>
                        <GemIcon color={"gray"} size={'small'}/>
                        <GemIcon color={"gray"} size={'small'}/>
                    </div>
                </div>
            </div>
            <div className={"frt-p-3"}>
                <p>{review.content}</p>
                {review.images?.length > 0 ? (
                    <img className={"frt-rounded"} src={review.images[0].src} alt={""} height={"80px"} width={"80px"}/>
                ) : null}
            </div>
            {review.replies?.length > 0 ? (
               <div className={"frt-p-3"}>
                   {review.replies?.map((reply: any, index: number) => {
                       return (
                           <div>
                               <span>{reply.reviewer_name} replied</span>
                               <p>{reply.reply_content}</p>
                               {reply.images?.length > 0 ? (
                                   <div>
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