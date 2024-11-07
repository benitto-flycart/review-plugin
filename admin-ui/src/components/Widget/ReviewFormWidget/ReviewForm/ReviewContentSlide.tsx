import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewContentSlide = ({handleNextSlide, errors, reviews, setReviews}: any) => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_review_content_container"}>
            <span className={"r_rfw_review_content_title"}
            >{widget.review_content.title}</span>
            <textarea className={"r_rfw_review_content_text r_rfw_input_field"}
                      rows={15}
                      value={reviews.review_text}
                      onChange={(e: any) => setReviews({...reviews, review_text: e.target.value})}
                      placeholder={widget.review_content.placeholder}></textarea>
            {errors ?
                <span className={"r_rfw_review_text_error"}>{errors.review_text && errors.review_text[0]}</span> : null}
        </div>
    )
}
export default ReviewContentSlide;