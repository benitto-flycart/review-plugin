import React, { useCallback, useContext, useRef, useState } from "react";
import { ReviewFormWidgetContext } from "../ReviewFormWidgetContextAPI";
import { nl2br } from "../../../../helpers/helper";

const PhotoSlide = ({ images, setImages, handleNextClick,maxPhotos = 5 }: any) => {
  const { widget, updateWidgetFields, methods } = useContext<any>(
    ReviewFormWidgetContext,
  );

  // const [photos, setPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<any>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && images.length < maxPhotos) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newPhotos = [...images, reader.result as string];
          setImages(newPhotos);
          // onPhotosChange?.(newPhotos);
        };
        reader.readAsDataURL(file);
      }
    },
    [images, maxPhotos]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileSelect(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className={"r_rfw_photo_slide_container"} onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => saveFile(e)}
        className={"r_frw_file_input"}
      />
      <div className={"r_frw_photo_slide__text_container"}>
        <p className="r_rfw_photo_upload_discount">{widget.photos.discount_text}</p>
        <span
          className={"r_frw_photo_description"}
          dangerouslySetInnerHTML={{
            __html: nl2br(widget.photos.description),
          }}
        ></span>
      </div>
      <div className={`r_rfw_photo_upload_content ${isDragging ? "r_rfw_dragging" : ""}`}>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="r_rfw_photo_upload_input"
          onChange={handleInputChange}
          aria-label="Upload photo"
        />

        {images.length > 0 && (
          <div className="r_rfw_photo_grid">
            {images.map((image: string, index: number) => (
              <div key={index} className="r_rfw_photo_item">
                <img
                  src={image}
                  alt={`Uploaded photo ${index + 1}`}
                  className="r_rfw_photo_preview"
                />
                <button
                  className="r_rfw_photo_remove_btn"
                  onClick={() => removeImageFromArray(index)}
                  aria-label={`Remove photo ${index + 1}`}
                >
                  <i className="farp farp-cross-icon"></i>
                </button>
              </div>
            ))}
            {images.length < maxPhotos && (
              <button
                className="r_rfw_photo_add_btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="farp farp-plus"></i>
              </button>
            )}
          </div>
        )}

        <div
          ref={dropzoneRef}
          className={`r_rfw_photo_upload_dropzone ${
            images.length > 0 ? "r_rfw_with_photos" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="r_rfw_photo_upload_icon">☁️</div>
          <div className="r_rfw_photo_upload_text">
            
            <p className="r_rfw_photo_upload_instruction">
              Choose file or <span style={{fontWeight: "bold"}}>drag here</span>
            </p>
            <p className="r_rfw_photo_upload_limit">Maximum file size: 10MB</p>
          </div>
          {/* <button
            className="r_rfw_photo_upload_btn"
            onClick={() => fileInputRef.current?.click()}
          >
            {widget.photos.button_text}
          </button> */}
        </div>
      </div>
      {/* <div className={"r_frw_add_photos_container"}>
        <div
          className={`r_frw_view_photos_container ${images.length == 0 ? "r_rfw_hide" : ""}`}
        >
          <div className={"r_frw_photos_list"}>
            {images.slice(0, 5).map((imageSrc: string, index: number) => {
              return (
                <div className={"r_frw_img_container"} key={index}>
                  <span
                    className={"farp farp-cross-icon r_frw_img_close_icon"}
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
                className={"farp-plus frt-text-inherit farp-icon farp"}
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
      </div> */}
    </div>
  );
};

export default PhotoSlide;

