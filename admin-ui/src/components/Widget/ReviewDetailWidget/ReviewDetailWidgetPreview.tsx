import React, {useContext, useEffect, useState} from "react";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";
import {useLocalState} from "../../zustand/localState";
import ReviewIcon from "../../ReviewIcon";
import {SampleReviewsContext} from "../SampleReviewsAPI";
import {applyStylesToIframe} from "../../../helpers/utils";

const ReviewDetailWidgetPreview = () => {
  const { widget, updateWidgetFields, methods } = useContext<any>(
    ReviewDetailWidgetContext,
  );

  const {sampleReviews}=useContext<any>(ReviewDetailWidgetContext)
  const {reviews}=sampleReviews
  const review=reviews[0]
  const [index, setIndex] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);

  const { localState } = useLocalState();

  useEffect(() => {
    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = true;
    });

    //@ts-ignore
    let iframe: any = window.frames["widget_preview_iframe"];
    applyStylesToIframe(iframe,localState.iframe_styles?.review_detail_widget,localState.iframe_styles?.font_css)

    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = false;
    });
  }, []);

  const setSlide = (n: number) => {
    if (index === n) return; // Avoid unnecessary operations if the target is the same as current index

    setTranslateX(translateX + (index - n) * 100); // Handle both left and right sliding
    setIndex(n); // Update the current index
  };

  function decrease() {
    setIndex(index - 1);
    setTranslateX(translateX + 100);
  }

  function increase() {
    setIndex(index + 1);
    setTranslateX(translateX - 100);
  }

  return (
    <div
      className={"r_rdw_container"}
      style={methods.getReviewDetailVariables()}
    >
      <div className={"r_rdw_close_icon"}>
        <i className="farp farp-cross-icon"></i>
      </div>
      <div className={"r_rdw-main_content"}>
        { review.images.length > 0 ? <div className="r_rdw-image-container">
          <div className={`r_rdw_all_images ${review.images.length=="1" ? "r_rdw_single_image_container" : "r_rdw_multi_image_container"}`}>
            <div
                className={"r_rdw_all_images_wrapper"}
                style={{transform: `translateX(${translateX + "%"})`}}
            >
              {review.images.map((item: any, iteration: number) => {
                return (
                    <div
                        key={iteration}
                        className={`r_rdw_active_image mySlides ${iteration + 1 == index ? "active" : ""}`}
                    >
                      <img src={item.src} alt={""}/>
                    </div>
                );
              })}
            </div>

            {review.images.length > 1 ? <div className={"r_rdw-slide-actions"}>
              <button
                  className={`prev ${index == 1 ? "disabled" : ""}`}
                  onClick={decrease}
                  disabled={index == 1}
              >
                <i className="farp farp-caret-left"> </i>
              </button>
              <button
                  className={`next ${index == review.images.length ? "disabled" : ""}`}
                  onClick={increase}
                  disabled={index == review.images.length}
              >
                <i className="farp farp-caret-right"> </i>
              </button>
            </div> : null}
          </div>
            { review.images.length> 1 ? review.images.map((item: any, iteration: number) => {
              return (
                <div className="row">
                  <div
                    key={iteration}
                    className={`column ${iteration + 1 == index ? "active" : ""}`}
                    onClick={() => {
                      setSlide(iteration + 1);
                    }}
                  >
                    <img
                      className="r_rdw-image-options"
                      src={item.src}
                      style={{ width: "100%" }}
                      alt="The Woods"
                    />
                  </div>
                </div>
              );
            }) : null}
        </div> : null }
        <div className="r_rdw-detail-wrapper">
          <div className="r_rdw-review-details">
            <div className="r_rdw-spread-container">
              <div className="r_rdw-title">{review.reviewer_name}</div>
              {
                review.is_verified ? <div className="r_rdw-overview">
                  <button className="r_rdw-button-info">
                    <i className="farp farp-info"></i>
                  </button>
                  <div className="r_rdw-i-verified-notification">
                  <span>
                   Verified user
                  </span>
                  </div>
                </div> : null
              }
            </div>
            <div className="r_rdw-spread-container">
              <div className="r_rdw-review-icons">
                <ReviewIcon />
                <ReviewIcon />
                <ReviewIcon />
                <ReviewIcon />
                <ReviewIcon />
              </div>
            </div>
          </div>
          <div className="r_rdw-review-content-wrapper">
            <div className="r_rdw-review-content">
              <div className="r_rdw-review-content-text">{review.content}</div>
            </div>
            <div
              data-time="1727350327063"
              data-testid="qv-review-date"
              className="time r_rdw-review-posted-date"
              data-upgraded="true"
            >
              Posted on {review.date}
            </div>
            {review.replies.map((reply: any, index: number) => {
              return (
                <div className="r_rdw-review-item-reply" key={index}>
                  <div className="r_rdw-item-reply-title">
                    <strong className="r_rdw-small-text r_rdw-font-weight-bold">
                      {reply.reviewer_name}
                    </strong>
                    <span className="r_rdw-reply-date">
                      {reply?.reply_date}
                    </span>
                  </div>
                  <div className="r_rdw-normal-text">{reply.reply_content}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewDetailWidgetPreview;
