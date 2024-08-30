import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewContentSlide = () => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_review_content_container"}
             style={methods.getDialogStyles()}>
            <span style={methods.getReviewContentStyle()}
                  className={"r_rfw_review_content_title"}
            >{widget.review_content.title}</span>
            <textarea
                className={"r_rfw_review_content_text"}
                rows={15}
                placeholder={widget.review_content.placeholder}></textarea>
        </div>
    )
}
export default ReviewContentSlide;