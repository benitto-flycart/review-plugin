import React, {useContext} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const PhotoSlide = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    return (
        <div className={"wd_preview__photos_addition"}>
            <div className={"wd_preview__photos_addition___text_container"}>
                                <span className={"wd_photo_addition_title"}
                                      style={methods.getPhotoTitleStyles()}>{widget.photos.title}</span>
                <span className={"wd_photo_addition_description"}
                      style={methods.getPhotoDescriptionStyles()}>{widget.photos.description}</span>
            </div>
            <div className={"wd_add_photos_section"}>
                <button className={"wd_add_photos_text"}
                        style={methods.getPhotoButtonStyles()}>{widget.photos.button_text}</button>
            </div>
            <div className={"wd_photos_container"}>
                <div className={"wd_images_list"}>
                    <div className={"wd_review_image"}></div>
                    <div className={"wd_review_image"}></div>
                    <div className={"wd_review_image"}></div>
                    <div className={"wd_review_image"}></div>
                    <div className={"wd_review_image"}></div>
                </div>
            </div>
        </div>
    )
}

export default PhotoSlide;