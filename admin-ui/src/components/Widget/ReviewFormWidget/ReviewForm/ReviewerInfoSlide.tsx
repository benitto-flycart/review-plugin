import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewerInfoSlide = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_reviewer_detail_container"} style={methods.getDialogStyles()}>
                            <span className={"r_rfw_reviewer_detail_title"} style={methods.getReviewerTitleStyles()}>
                                {widget.reviewer.title}
                            </span>
            <div className={"r_rfw_review_names_info_container"}>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_first_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>First Name</label>
                    <input value={""} placeholder={"John Doe"}/>
                </div>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_last_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>Last Name</label>
                    <input value={""} placeholder={"John Doe"}/>
                </div>
            </div>
            <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_email"}>
                <label htmlFor="" style={methods.getReviewerLabelStyles()}>Email</label>
                <input value={""} placeholder={"Email"}/>
            </div>
            <div className={"r_rfw_reviewer_section_note"}>
                <p style={methods.getReviewerDescriptionStyles()}>By Submitting, I acknowledge the Terms
                    of Service and Privacy Policy and that my
                    review will be publicly posted and shared online</p>
            </div>
        </div>
    )
}

export default ReviewerInfoSlide;