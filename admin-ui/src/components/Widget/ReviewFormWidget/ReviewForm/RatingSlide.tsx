import React, {useContext, useState} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const RatingSlide = ({rating, updateRating} : any) => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_rating_container"} style={methods.getDialogStyles()}>
                            <span className={"r_rfw_rating_preview_title"}
                                  style={methods.ratingTitleStyles()}>{widget.rating.title}</span>
            <div className="r_rfw_rating_icons_wrapper">
                {
                    Array.from({length: 5}).map((item: any, index: number) => {
                        return (
                            <i key={index + '_' + rating}
                               style={methods.ratingIconStyles()}
                               className={`r_rfw_rating_icon review-icon review review-gem review_rating review_rating_${index + 1} ${index + 1 <= rating ? 'review_rating_active' : null}`}
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