import React, { useContext } from "react";
import { getRepliesStyles } from "../../../helper";
import ReviewIcon from "../../../../../ReviewIcon";
import { ProductWidgetContext } from "../../../ProductReviewContextAPI";

const MosaicCardPreview = ({ review }: any) => {
  const { widget } = useContext<any>(ProductWidgetContext);
  return (
    <div key={review.id} className="r_pw_r_container r_pw_r_m_container">
      <div className={"r_pw_r_m_review-details-container"}>
        <div className={" r_pw_r_m_review-details"}>
          <div className="r_pw_reviewer_name_container">
            <span>{review.reviewer_name}</span>
            {review.is_verified ? (
              <span
                className={
                  "r_pw_r--review-is-verified r_pw_r_m_container--review-is-verified"
                }
              >
                <i className="farp farp-trophy"></i>
              </span>
            ) : null}
          </div>
          <span
            className={`${widget.preferences.show_review_date ? "" : "r_pw_hide"}`}
          >
            {review.date}
          </span>
          <div className="r_pw_r_m_review-details--review-icons">
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
          </div>
          <p>{review.content}</p>
          {review.images.length > 0 ? (
            <img src={review.images[0].src} width={60} height={60} />
          ) : null}
        </div>
      </div>
      {review.replies?.length > 0 ? (
        <div
          className={
            "r_pw_r_reply_container r_pw_r_m_review-details--reply-container"
          }
        >
          {review.replies.map((reply: any, index: number) => {
            return (
              <div key={index}>
                <span>{reply.reviewer_name}</span>
                <p>{reply.reply_content}</p>
              </div>
            );
          })}
        </div>
      ) : null}
      <div
        className={
          "r_pw_r--product_container r_pw_r_m_review-details--product_container"
        }
      >
        <div className={"r_pw_r_m_review-details--product_img_container"}>
          <img
            src={review.product.src}
            alt=""
            width={"100px"}
            height={"50px"}
          />
        </div>
        <div>
          <span>{review.product.product_name}</span>
        </div>
      </div>
    </div>
  );
};

export default MosaicCardPreview;

