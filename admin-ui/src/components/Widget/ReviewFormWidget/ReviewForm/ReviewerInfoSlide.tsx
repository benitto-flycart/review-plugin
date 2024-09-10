import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const ReviewerInfoSlide = ({handleNextSlide}: any) => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"r_rfw_reviewer_detail_container"} style={methods.getDialogStyles()}>
                            <span className={"r_rfw_reviewer_detail_title"} style={methods.getReviewerTitleStyles()}>
                                {widget.reviewer.title}
                            </span>
            <div className={"r_rfw_review_names_info_container"}>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_first_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>First Name</label>
                    <input className="r_rfw_input_field" value={""} placeholder={"John Doe"} style={methods.getInputStyles()}/>
                </div>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_last_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>Last Name</label>
                    <input className="r_rfw_input_field" value={""} placeholder={"John Doe"} style={methods.getInputStyles()}/>
                </div>
            </div>
            <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_email"}>
                <label htmlFor="" style={methods.getReviewerLabelStyles()}>Email</label>
                <input className="r_rfw_input_field" value={""} placeholder={"Email"} style={methods.getInputStyles()}/>
            </div>
            <div className={"r_rfw_reviewer_section_note"}>
                <p style={methods.getReviewerDescriptionStyles()}>By Submitting, I acknowledge the Terms
                    of Service and Privacy Policy and that my
                    review will be publicly posted and shared online</p>
            </div>
            <div className={"r_rfw_reviewer_continue_btn"}>
                <button className={"r_rfw_btn"} onClick={handleNextSlide} style={methods.getFooterButtonStyles()}>Continue</button>
            </div>
        </div>
    )
}

export default ReviewerInfoSlide;