import React, { useContext } from "react";
import { ProductWidgetContext } from "../../../ProductReviewContextAPI";
import { getRepliesStyles, getReviewCardStyles } from "../../../helper";
import ReviewIcon from "../../../../../ReviewIcon";

const ListCardPreview = ({ review }: any) => {
  const { widget } = useContext<any>(ProductWidgetContext);
  return (
    <div key={review.id} className={"r_pw_r_container r_pw_r_l_container"}>
      <div className={"r_pw_r_l_container--review_details"}>
        <div className={"r_pw_r_l_container--review_details-overview"}>
          <div
            className={
              "r_pw_reviewer_name_container r_pw_r_l_container--review_details-overview-header"
            }
          >
            <span
              className={"r_pw_r_l_container--review_details-reviewer_name"}
            >
              {review.reviewer_name}
            </span>
            {review.is_verified ? (
              <span
                className={
                  "r_pw_r--review-is-verified r_pw_r_l_container--review_details-review_verfied"
                }
              >
                <i className="farp farp-trophy"></i>
              </span>
            ) : null}
          </div>
          <span
            className={`r_pw_r_l_container--review_details--review-date ${widget.preferences.show_review_date ? "" : "r_pw_hide"}`}
          >
            {review.date}
          </span>
        </div>
        <div className={"r_pw_r_l_container--review_details--rating_details"}>
          <div className="r_pw_r_l_container--review_details--rating_details_icons">
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
            <ReviewIcon />
          </div>
        </div>
      </div>
      <div className={"r_pw_r_l_container--review_content_container"}>
        <p className={"r_pw_r_l_container--review_content"}>{review.content}</p>
        {review.images?.length > 0 ? (
          <img
            className={"r_pw_r_l_container--review_content_img"}
            src={review.images[0].src}
            alt={""}
          />
        ) : null}
      </div>
      {review.replies?.length > 0 ? (
        <div
          className={
            "r_pw_r_reply_container r_pw_r_l_container--reply_container"
          }
        >
          {review.replies?.map((reply: any, index: number) => {
            return (
              <div
                className={"r_pw_r_l_container--reply_container_details"}
                key={index}
              >
                <span className={"r_pw_r_l_container--reply_reviewer_name"}>
                  {reply.reviewer_name} replied
                </span>
                <p className={"r_pw_r_l_container--reply_content"}>
                  {reply.reply_content}
                </p>
                {reply.images?.length > 0 ? (
                  <div
                    className={
                      "r_pw_r_l_container--reply_content_img_container"
                    }
                  >
                    {reply.images?.map((img: any, index: number) => {
                      return (
                        <div key={img.id}>
                          <img
                            src={img.src}
                            alt={""}
                            height={"50px"}
                            width={"50px"}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className={"r_pw_r--product_container r_pw_r_l-product_container"}>
        <img
          className={"r_pw_r_l-product_container-img"}
          src={review.product.src}
          alt={""}
          height={"50px"}
          width={"50px"}
        />
        <span>{review.product.product_name}</span>
      </div>
    </div>
  );
};

export default ListCardPreview;

