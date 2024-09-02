import React, {useContext, useRef, useState} from "react";
import {ReviewFormWidgetContext} from "../ReviewFormWidgetContextAPI";

const PhotoSlide = () => {

    const {widget, updateWidgetFields, methods} = useContext<any>(ReviewFormWidgetContext)

    const [images, setImages] = useState<Array<any>>([])

    const fileInputRef = useRef<any>(null);

    // Function to handle the click event on the custom button
    const handleButtonClick = () => {
        // Programmatically click the file input
        if (fileInputRef)
            fileInputRef.current.click();
    };

    const saveFile = (e: any) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages((prevImages: any) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={"r_rfw_photo_slide_container"} style={methods.getDialogStyles()}>
            <div className={"r_frw_photo_slide__text_container"}>
                                <span className={"r_frw_photo_title"}
                                      style={methods.getPhotoTitleStyles()}>{widget.photos.title}</span>
                <span className={"r_frw_photo_description"}
                      style={methods.getPhotoDescriptionStyles()}>{widget.photos.description}</span>
            </div>
            <div className={"r_frw_add_photos_container"}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={(e) => saveFile(e)}
                />
                {images.length >= 5 ? null : (<button className={"r_frw_add_photos_btn wd_add_photos_btn"}
                                                      style={methods.getPhotoButtonStyles()}
                                                      onClick={handleButtonClick}
                >{widget.photos.button_text}</button>)}

            </div>
            {
                images.length > 0 ? (
                    <div className={"r_frw_view_photos_container"}>
                        <div className={"r_frw_photos_list"}>
                            {images.slice(0, 5).map((imageSrc: string, index: number) => {
                                    return (<div className={"r_frw_img_container"} key={index}>
                                            <span className={"r_frw_img_close_icon"}
                                                  style={methods.getPhotoButtonStyles()}>X</span>
                                            <img
                                                key={index}
                                                src={imageSrc}
                                                alt={`Uploaded Preview ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    marginRight: '10px'
                                                }}
                                            />
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                ) : null
            }

        </div>
    )
}

export default PhotoSlide;