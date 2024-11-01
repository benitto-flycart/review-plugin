import React, { useContext } from "react";
import { ReviewFormWidgetContext } from "../ReviewFormWidgetContextAPI";

const RatingSlide = ({ rating, updateRating }: any) => {
  const { widget, updateWidgetFields, methods } = useContext<any>(
    ReviewFormWidgetContext,
  );

  return (
    <div className={"r_rfw_rating_container"}>
      <div className={"r_rfw_review_product_details"}>
        <img
          className={"r_rfw_product_image"}
          src="https://unsplash.it/200/200"
          alt="Product Image"
        />
      </div>
      <p
        className={"r_rfw_rating_preview_title"}
        dangerouslySetInnerHTML={{ __html: methods.getRatingTitle() }}
      ></p>
      <div className="r_rfw_rating_icons_wrapper">
        {Array.from({ length: 5 }).map((item: any, index: number) => {
          return (
            <div className={"r_rwf_rating_icons_wrapper_with_text"} key={index}>
              <i
                key={index + "_" + rating}
                className={`r_rfw_rating_icon review-icon review  review_rating review_rating_${index + 1} ${index + 1 <= rating ? "review-gem review_rating_active" : "review-gem-outline"}`}
                onClick={() => updateRating(index + 1)}
              ></i>
              {(index === 0 || index === 4) && (
                <span className={"r_rwf_rating_icons_text"}>
                  {index === 0 ? "Dislike it" : "Love it!"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingSlide;

