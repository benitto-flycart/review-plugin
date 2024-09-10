import React, {useContext, useState} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";
import * as yup from 'yup'

const ReviewContentSlide = ({handleNextSlide}: any) => {
    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)
    const [reviewText,setReviewText] = useState<string>('')
    const [errors,setErrors] = useState<any>()

    const validationSchema = yup.object().shape({
        review_text: yup.string().required("Please enter a review"),
    })

    const validateReview=()=>{
        validationSchema.validate({review_text:reviewText},{abortEarly:false}).then(()=>{
            handleNextSlide()
        }).catch((validationError)=>{
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            console.log(validationErrors)
            setErrors(validationErrors)
        })
    }

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
                value={reviewText}
                onChange={(e:any)=>setReviewText(e.target.value)}
                placeholder={widget.review_content.placeholder}></textarea>
            {errors ?<span>{errors.review_text[0]}</span> : null}
            <div className={"r_rfw_review_content_continue_btn"}>
                <button className={"r_rfw_btn"} onClick={validateReview} style={methods.getFooterButtonStyles()}>Continue</button>
            </div>
        </div>
    )
}
export default ReviewContentSlide;