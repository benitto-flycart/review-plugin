import React, {useContext, useEffect, useRef} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewContentSlide = ({handleNextSlide, errors, reviews, setReviews}: any) => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        console.log(reviews.review_text);
        
        if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
            console.log(textareaRef.current.style.height);
        }
        
    }, [reviews.review_text]);

    return (
        <div className={"r_rfw_review_content_container"}>
            <span className={"r_rfw_review_content_title"}
            >{widget.review_content.title}</span>
            <div className="r_rfw_review_textarea_wrapper">
            <textarea className={"r_rfw_review_content_text r_rfw_input_field"}
                      rows={1}
                      ref={textareaRef}
                      value={reviews.review_text}
                      onChange={(e: any) => setReviews({...reviews, review_text: e.target.value})}
                      placeholder={widget.review_content.placeholder}></textarea>
                      </div>
            {errors ?
                <span className={"r_rfw_review_text_error"}>{errors.review_text && errors.review_text[0]}</span> : null}
        </div>
    )
}
export default ReviewContentSlide;