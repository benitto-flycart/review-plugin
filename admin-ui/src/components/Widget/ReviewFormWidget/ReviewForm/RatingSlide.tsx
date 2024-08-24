import React, {useContext, useState} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const RatingSlide = ({rating, updateRating} : any) => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"wd_preview__rating"}>
                            <span className={"wd_preview__rating_title"}
                                  style={methods.ratingTitleStyles()}>{widget.rating.title}</span>
            <div className="wd_preview__rating_icons frt-flex frt-flex-row frt-justify-start frt-gap-2">
                {
                    Array.from({length: 5}).map((item: any, index: number) => {
                        return (
                            <i key={index + '_' + rating}
                               style={methods.ratingIconStyles()}
                               className={`review-icon review review-Gem review_rating review_rating_${index + 1} ${index + 1 <= rating ? 'review_rating_active' : null}`}
                               onClick={() => updateRating(index + 1)}
                            ></i>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default RatingSlide;