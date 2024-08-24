import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewerInfoSlide = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"wd_review_reviewer_info"}>
                            <span className={"wd_review_about_you"} style={methods.getReviewerTitleStyles()}>
                                {widget.reviewer.title}
                            </span>
            <div className={"wd_review_names_info"}>
                <div className={"wd_review_input_field wd_review_first_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>First Name</label>
                    <input value={""} placeholder={"John Doe"}/>
                </div>
                <div className={"wd_review_input_field wd_review_last_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>Last Name</label>
                    <input value={""} placeholder={"John Doe"}/>
                </div>
            </div>
            <div className={"wd_review_input_field wd_review_email"}>
                <label htmlFor="" style={methods.getReviewerLabelStyles()}>Email</label>
                <input value={""} placeholder={"Email"}/>
            </div>
            <div className={"wd_review_tc_note"}>
                <p style={methods.getReviewerDescriptionStyles()}>By Submitting, I acknowledge the Terms
                    of Service and Privacy Policy and that my
                    review will be publicly posted and shared online</p>
            </div>
        </div>
    )
}

export default ReviewerInfoSlide;