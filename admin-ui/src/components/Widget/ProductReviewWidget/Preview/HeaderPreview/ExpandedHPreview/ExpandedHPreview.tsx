import React, { useContext } from "react";
import { ProductWidgetContext } from "../../../ProductReviewContextAPI";
import ReviewIcon from "../../../../../ReviewIcon";
import ProgressBar from "../../../ProgressBar";
import CustomPopover from "../../../CustomPopover";

const ExpandedHPreview = () => {
  const { sampleReviews, methods } = useContext<any>(ProductWidgetContext);

  const { ratings } = sampleReviews;

  const overall_rating = ratings.overall_rating;

  const review_details = ratings.details;

  return (
    <div className={"r_pw_eh_container"}>
      <div className={"r_pw_header_rating_container r_pw_eh_rating_container"}>
        <div className={"r_pw_eh_rating_overview"}>
          <ReviewIcon />
          <span>{overall_rating}</span>
        </div>
        <span>{sampleReviews.total} Reviews</span>
      </div>
      {methods.isRatingOptionsEnabled() ? (
        <div
          className={
            "r_pw_ratings-row-progress-bar-details r_pw_eh_rating_details_container"
          }
        >
          {review_details.map((detail: any, rating: number) => (
            <div
              key={rating}
              className={"r_pw_h_rd_detail r_pw_eh_rating_details"}
            >
              <div className={"r_pw_eh_rating_details--icons-info"}>
                {Array.from({ length: 5 }, (_, index) => (
                  <ReviewIcon key={index} filled={rating >= index} />
                ))}
              </div>
              <div className={"r_pw_eh_rating_details--progress_bar_container"}>
                <ProgressBar completed={detail.percentage} />
              </div>
              <div className={"r_pw_eh_rating_details--review_count"}>
                {detail.count}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className={"r_pw_eh_actions_container"}>
        {methods.isAddReviewEnabled() ? (
          <div className={"r_pw_eh_actions_container--btn_container"}>
            <button
              type="button"
              className="r_pw_header_button r_pw_eh_actions_container--btn_container-btn"
            >
              Write a Review
            </button>
          </div>
        ) : null}
        {methods.isSortingEnabled() ? (
          <div className={"r_pw_eh_actions_container--sorting_container"}>
            <CustomPopover
              content={
                <div>
                  <ul>
                    <li>Sort By</li>
                    <li style={{ cursor: "pointer" }}>Newest</li>
                    <li style={{ cursor: "pointer" }}>Oldest</li>
                    <li style={{ cursor: "pointer" }}>Highest Rating</li>
                    <li style={{ cursor: "pointer" }}>Lowest Rating</li>
                  </ul>
                </div>
              }
            >
              <button
                type="button"
                className="r_pw_header_button r_pw_eh_actions_container--sorting_container-btn"
              >
                <i className="farp farp-gem"></i>
              </button>
            </CustomPopover>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ExpandedHPreview;
