import React, { useContext } from "react";
import { Badge } from "../../../../../ui/badge";
import ReviewIcon from "../../../../../ReviewIcon";
import { ProductWidgetContext } from "../../../ProductReviewContextAPI";

const GridCardPreview = ({ review }: any) => {
  const { widget } = useContext<any>(ProductWidgetContext);
  return (
    <div key={review.id} className="r_pw_r_container r_pw_r_g_container">
      <div className={"r_pw_r_g_container--review-details"}>
        {review.images.length > 0 ? (
          <img
            src={review.images[0].src}
            className={"r_pw_r_g_container--review-details--image"}
          />
        ) : null}
        <div
          className={
            "r_pw_reviewer_name_container r_pw_r_g_container--review-info"
          }
        >
          <div className="r_pw_reviewer_name_container">
            <span className={"r_pw_r_g_container--review-info-name"}>
              {review.reviewer_name}
            </span>
            {review.is_verified ? (
              <span
                className={
                  "r_pw_r--review-is-verified r_pw_r_g_container--review-is-verified"
                }
              >
                <i className="farp farp-trophy"></i>
              </span>
            ) : null}
          </div>
          <span
            className={`r_pw_r_g_container--review-date ${widget.preferences.show_review_date ? "" : "r_pw_hide"}`}
          >
            {review.date}
          </span>
          <div className="r_pw_r_g_container--review-rating-details">
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
          </div>
          <p className={"r_pw_r_g_container--review-content"}>
            {review.content}
          </p>
        </div>
      </div>
      {review.replies?.length > 0 ? (
        <div
          className={
            "r_pw_r_reply_container r_pw_r_g_container--reply-container"
          }
        >
          {review.replies.map((reply: any, index: number) => {
            return (
              <div key={index}>
                <span className={"r_pw_r_g_container--reply--reviewer_name"}>
                  {reply.reviewer_name}
                </span>
                <p className={"r_pw_r_g_container--reply--content"}>
                  {reply.reply_content}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
      <div
        className={
          "r_pw_r--product_container r_pw_r_g_container--product_container"
        }
      >
        <div className={"r_pw_r_g_container--product_container--img_container"}>
          <img
            src={review.product.src}
            alt=""
            width={"100px"}
            height={"50px"}
          />
        </div>
        <div className={"r_pw_r_g_container--product_container--product_name"}>
          <span>{review.product.product_name}</span>
        </div>
      </div>
    </div>
  );
};

export default GridCardPreview;

