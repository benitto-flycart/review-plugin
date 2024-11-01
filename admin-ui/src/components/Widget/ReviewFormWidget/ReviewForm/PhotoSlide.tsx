import React, { useContext, useRef, useState } from "react";
import { ReviewFormWidgetContext } from "../ReviewFormWidgetContextAPI";
import { nl2br } from "../../../../helpers/helper";

const PhotoSlide = ({ images, setImages, handleNextClick }: any) => {
  const { widget, updateWidgetFields, methods } = useContext<any>(
    ReviewFormWidgetContext,
  );

  const fileInputRef = useRef<any>(null);

  // Function to handle the click event on the custom button
  const handleButtonClick = () => {
    // Programmatically click the file input
    if (fileInputRef) fileInputRef.current.click();
  };

  const saveFile = (e: any) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prevImages: any) => [...prevImages, reader.result]);
      setTimeout(() => {
        handleNextClick();
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const removeImageFromArray = (index: number) => {
    const updateImages = images.filter((image: any, key: number) => {
      return index !== key;
    });
    setImages(updateImages);
  };

  return (
    <div className={"r_rfw_photo_slide_container"}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => saveFile(e)}
        className={"r_frw_file_input"}
      />
      <div className={"r_frw_photo_slide__text_container"}>
        <span className={"r_frw_photo_title"}>{widget.photos.title}</span>
        <span
          className={"r_frw_photo_description"}
          dangerouslySetInnerHTML={{
            __html: nl2br(widget.photos.description),
          }}
        ></span>
      </div>
      <div className={"r_frw_add_photos_container"}>
        <div
          className={`r_frw_view_photos_container ${images.length == 0 ? "r_rfw_hide" : ""}`}
        >
          <div className={"r_frw_photos_list"}>
            {images.slice(0, 5).map((imageSrc: string, index: number) => {
              return (
                <div className={"r_frw_img_container"} key={index}>
                  <span
                    className={"review review-cross-icon r_frw_img_close_icon"}
                    onClick={() => {
                      removeImageFromArray(index);
                    }}
                  ></span>
                  <img
                    key={index}
                    src={imageSrc}
                    alt={`Uploaded Preview ${index + 1}`}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              );
            })}
            <div
              style={methods.getAddPhotosDivStyles()}
              className={`r_rfw_add_photos_div wd_add_photos_btn ${images.length >= 5 ? " r_rfw_hide" : ""}`}
              onClick={handleButtonClick}
            >
              <i
                className={"review-plus frt-text-inherit review-icon review"}
              />
            </div>
          </div>
        </div>
        <div
          className={`r_rfw_empty_photo_section ${images.length != 0 ? "r_rfw_hide" : ""}`}
        >
          <p
            className={"r_rfw_photo_discount_text"}
            dangerouslySetInnerHTML={{
              __html: nl2br(widget.photos.discount_text),
            }}
          ></p>
          <button
            className={"r_frw_add_photos_btn wd_add_photos_btn"}
            onClick={handleButtonClick}
          >
            {widget.photos.button_text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoSlide;

