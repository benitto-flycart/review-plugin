import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewContentSlide = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"wd_get_review_content_area"}>
            <span style={methods.getReviewContentStyle()}> {widget.review_content.title}</span>
            <textarea
                className={"wd_review_text_area"}
                rows={15}
                placeholder={widget.review_content.placeholder}></textarea>
        </div>
    )
}
export default ReviewContentSlide;