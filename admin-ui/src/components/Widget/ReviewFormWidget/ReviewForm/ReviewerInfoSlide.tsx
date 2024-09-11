import React, {useContext, useState} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";
import {produce} from "immer";
import * as yup from 'yup'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const ReviewerInfoSlide = ({handleNextSlide}: any) => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)
    const [state,setState]=useState({
        first_name:"",
        last_name:"",
        email:""
    })
    const [errors,setErrors]=useState<any>({})

    const validationSchema=yup.object().shape({
        first_name: yup.string().required("Please enter a first name"),
        last_name: yup.string().required("Please enter a last name"),
        email: yup.string().email("Enter a valid email address").required("Please enter a email"),
    })

    const handleUpdateFields=(cb:(draftState:any)=>void)=>{
        const state=produce((draftState:any)=>{
            cb(draftState)
        })
        setState(state)
    }
    console.log(state)
    const validateReviewInfo=()=>{
        validationSchema.validate(state,{abortEarly:false}).then(()=>{
            handleNextSlide()
            setErrors({})
        }).catch((validationError)=>{
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            setErrors((validationErrors))
        })
    }
    return (
        <div className={"r_rfw_reviewer_detail_container"} style={methods.getDialogStyles()}>
                            <span className={"r_rfw_reviewer_detail_title"} style={methods.getReviewerTitleStyles()}>
                                {widget.reviewer.title}
                            </span>
            <div className={"r_rfw_review_names_info_container"}>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_first_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>First Name</label>
                    <input className="r_rfw_input_field" value={state.first_name} placeholder={"John Doe"} onChange={(e:any)=>{
                        handleUpdateFields((draftState:any)=>{
                            draftState.first_name=e.target.value
                        })
                    }} style={methods.getInputStyles()}/>
                    {errors ?<span className={"r_rfw_review_info_error"}>{errors.first_name && errors.first_name[0]}</span> : null}
                </div>
                <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_last_name"}>
                    <label htmlFor="" style={methods.getReviewerLabelStyles()}>Last Name</label>
                    <input className="r_rfw_input_field" value={state.last_name} onChange={(e:any)=>{
                        handleUpdateFields((draftState:any)=>{
                            draftState.last_name=e.target.value
                        })
                    }}  placeholder={"John Doe"} style={methods.getInputStyles()}/>
                    {errors ?<span className={"r_rfw_review_info_error"}>{errors.last_name && errors.last_name[0]}</span> : null}
                </div>
            </div>
            <div className={"r_rfw_input_field_wrapper r_rfw_reviewer_email"}>
                <label htmlFor="" style={methods.getReviewerLabelStyles()}>Email</label>
                <input className="r_rfw_input_field" value={state.email} onChange={(e:any)=>{
                    handleUpdateFields((draftState:any)=>{
                        draftState.email=e.target.value
                    })
                }} placeholder={"Email"} style={methods.getInputStyles()}/>
                {errors ?<span className={"r_rfw_review_info_error"}>{errors.email && errors.email[0]}</span> : null}
            </div>
            <div className={"r_rfw_reviewer_section_note"}>
                <p style={methods.getReviewerDescriptionStyles()}>By Submitting, I acknowledge the Terms
                    of Service and Privacy Policy and that my
                    review will be publicly posted and shared online</p>
            </div>
            <div className={"r_rfw_reviewer_continue_btn"}>
                <button className={"r_rfw_btn"} onClick={validateReviewInfo} style={methods.getFooterButtonStyles()}>Continue</button>
            </div>
        </div>
    )
}

export default ReviewerInfoSlide;