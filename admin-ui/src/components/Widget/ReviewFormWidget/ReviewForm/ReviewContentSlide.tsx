import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewContentSlide = ({handleNextSlide}: any) => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_review_content_container"}
             style={methods.getDialogStyles()}>
            <span style={methods.getReviewContentStyle()}
                  className={"r_rfw_review_content_title"}
            >{widget.review_content.title}</span>
            <textarea
                style={methods.getInputStyles()}
                className={"r_rfw_review_content_text r_rfw_input_field"}
                rows={15}
                placeholder={widget.review_content.placeholder}></textarea>
            <div className={"r_rfw_review_content_continue_btn"}>
                <button className={"r_rfw_btn"} onClick={handleNextSlide} style={methods.getFooterButtonStyles()}>Continue</button>
            </div>
        </div>
    )
}
export default ReviewContentSlide;