import React, { useContext, useState } from "react";
import { ProductWidgetContext } from "../../../ProductReviewContextAPI";
import ReviewIcon from "../../../../../ReviewIcon";
import ProgressBar from "../../../ProgressBar";
import CustomPopover from "../../../CustomPopover";

const MinimalHPreview = () => {
  const { methods, sampleReviews } = useContext<any>(ProductWidgetContext);

  const { ratings } = sampleReviews;

  const overall_rating = ratings.overall_rating;

  const review_details = ratings.details;

  const [filterOpened, setfilterOpened] = useState<boolean>(false);

  return (
    <div className={"r_pw_mh_container"}>
      <div className={"r_pw_header_rating_container r_pw_mh_rating_container"}>
        <div className={"r_pw_mh_rating_details"}>
          {Array.from({ length: 5 }, (_, index) => (
            <ReviewIcon key={index} filled={overall_rating > index} />
          ))}
        </div>
        <div className={"r_pw_mh_overall_reviews"}>
          <span className={"r_pw_mh_overall_reviews_count"}>
            {sampleReviews.total} Reviews
          </span>
          {methods.isRatingOptionsEnabled() ? (
            <>
              <span
                className={`r_pw_mh_filter ${filterOpened ? "r_pw_mh_filter_icon_opened" : "r_pw_mh_filter_icon_closed"} `}
                onClick={() => {
                  setfilterOpened(!filterOpened);
                }}
              >
                <i className="farp farp-caret-right"></i>
              </span>
              <div
                className={`r_pw_ratings-row-progress-bar-details r_pw_mh_rd_container ${filterOpened ? "" : "r_pw_hide"}`}
              >
                {review_details.map((detail: any, rating: number) => (
                  <div key={rating} className={"r_pw_mh_rd_detail"}>
                    <div className={"r_pw_mh_rd_detail_icon"}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <ReviewIcon key={index} filled={rating >= index} />
                      ))}
                    </div>
                    <div className={"r_pw_mh_rd_detail_progress_bar"}>
                      <ProgressBar completed={detail.percentage} />
                    </div>
                    <div className={"r_pw_mh_rd_detail_progress_bar_count"}>
                      {detail.count}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className={"r_pw_mh_actions_container"}>
        {methods.isAddReviewEnabled() ? (
          <div className={"r_pw_mh_actions_container--btn_container"}>
            <button
              type="button"
              className="r_pw_header_button r_pw_mh_actions_container--btn_container-btn"
            >
              Write a Review
            </button>
          </div>
        ) : null}
        {methods.isSortingEnabled() ? (
          <div
            className={
              "r_pw_h_sorting_list-container r_pw_mh_actions_container--sorting_container"
            }
          >
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
                className="r_pw_header_button r_pw_mh_actions_container--sorting_container-btn"
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

export default MinimalHPreview;

