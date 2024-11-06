import React, {useContext, useEffect, useState} from "react";
import {ReviewDetailWidgetContext} from "./ReviewDetailWidgetContextAPI";
import {useLocalState} from "../../zustand/localState";
import ReviewIcon from "../../ReviewIcon";
import {SampleReviewsContext} from "../SampleReviewsAPI";

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

    let linkElement: any = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href =
      localState.iframe_styles?.review_detail_widget?.widget_css; // Replace with the URL of your stylesheet

    let head = iframe.contentDocument.head;
    let body = iframe.contentDocument.body;
    head.appendChild(linkElement);

    let another = document.createElement("link");
    another.rel = "stylesheet";
    another.href = localState.iframe_styles?.font_css; // Replace with the URL of your stylesheet
    head.appendChild(another);

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
        <i className="review review-cross-icon"></i>
      </div>
      <div className={"r_rdw-main_content"}>
        { review.images.length > 0 ? <div className="r_rdw-image-container">
          <div className={"r_rdw_all_images"}>
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

            <div className={"r_rdw-slide-actions"}>
              <button
                  className={`prev ${index == 1 ? "disabled" : ""}`}
                  onClick={decrease}
                  disabled={index == 1}
              >
                <i className="review review-caret-left"> </i>
              </button>
              <button
                  className={`next ${index == review.images.length ? "disabled" : ""}`}
                  onClick={increase}
                  disabled={index == review.images.length}
              >
                <i className="review review-caret-right"> </i>
              </button>
            </div>
          </div>
          <div className="row">
            {review.images.map((item: any, iteration: number) => {
              return (
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
                        style={{width: "100%"}}
                        alt="The Woods"
                    />
                  </div>
              );
            })}
          </div>
        </div> : null }
        <div className="r_rdw-detail-wrapper">
          <div className="r_rdw-review-details">
            <div className="r_rdw-spread-container">
              <div className="r_rdw-title">{review.reviewer_name}</div>
              <div className="r_rdw-overview">
                <button className="r_rdw-button-info">
                  <i className="review review-info"></i>
                </button>
                <div className="r_rdw-i-verified-notification r_rdw_hide">
                  <span>
                    {!review.is_verified
                      ? "This review was written by a site visitor"
                      : "This review was written by a verified user"}
                    .
                  </span>
                </div>
              </div>
            </div>
            <div className="r_rdw-spread-container">
              <div className="r_rdw-review-icons">
                <ReviewIcon />
                <ReviewIcon />
                <ReviewIcon />
                <ReviewIcon />
                <ReviewIcon />
              </div>
              <div
                data-time="1727350327063"
                data-testid="qv-review-date"
                className="time"
                data-upgraded="true"
              >
                {review.date}
              </div>
            </div>
          </div>
          <div className="r_rdw-review-content-wrapper">
            <div className="r_rdw-review-content">
              <div className="r_rdw-review-content-text">{review.content}</div>
            </div>
            {review.replies.map((reply: any,index:number) => {
              return (
                <div className="r_rdw-review-item-reply" key={index}>
                  <div className="r_rdw-item-reply-title">
                    <strong className="r_rdw-small-text r_rdw-font-weight-bold">
                      {reply.reviewer_name}
                    </strong>{" "}
                    replied:
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
