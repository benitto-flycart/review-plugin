import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";


const ReviewerInfoSlide = ({handleNextSlide, errors, reviews, setReviews}: any) => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_reviewer_detail_container"}>
                            <span className={"r_rfw_reviewer_detail_title"}>
                                {widget.reviewer.title}
                            </span>
            <div className={"r_rfw_review_names_info_container"}>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_first_name"}>
                    <label htmlFor="">First Name*</label>
                    <input className="r_rfw_input_field" value={reviews.first_name} placeholder={"John Doe"}
                           onChange={(e: any) => {
                               setReviews({...reviews, first_name: e.target.value})
                           }}/>
                    {errors ? <span
                        className={"r_rfw_review_info_error"}>{errors.first_name && errors.first_name[0]}</span> : null}
                </div>
            </div>
            <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_last_name"}>
                <label htmlFor="">Last Name*</label>
                <input className="r_rfw_input_field" value={reviews.last_name} onChange={(e: any) => {
                    setReviews({...reviews, last_name: e.target.value})
                }} placeholder={"John Doe"}/>
                {errors ? <span
                    className={"r_rfw_review_info_error"}>{errors.last_name && errors.last_name[0]}</span> : null}
            </div>
            <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_email"}>
                <label htmlFor="">Email*</label>
                <input className="r_rfw_input_field" value={reviews.email} onChange={(e: any) => {
                    setReviews({...reviews, email: e.target.value})
                }} placeholder={"Email"}/>
                {errors ? <span className={"r_rfw_review_info_error"}>{errors.email && errors.email[0]}</span> : null}
            </div>
            <div className={"r_rfw_reviewer_section_note"}>
                <p>By Submitting, I acknowledge the Terms
                    of Service and Privacy Policy and that my
                    review will be publicly posted and shared online</p>
            </div>
        </div>
    )
}

export default ReviewerInfoSlide;