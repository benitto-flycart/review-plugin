import React, { useContext, useState } from "react";
import GridWidgetPreview from "./WidgetPreview/GridWidgetPreview";
import ListWidgetPreview from "./WidgetPreview/ListWidgetPreview";
import MosaicWidgetPreview from "./WidgetPreview/MosaicWidgetPreview";
import { ProductWidgetContext } from "../ProductReviewContextAPI";

const WidgetLayoutPreview = () => {
  const { widget, updateWidgetFields, sampleReviews, refetch } =
    useContext<any>(ProductWidgetContext);

  const [activePage, setactivePage] = useState<number>(1);

  const reviews: any = sampleReviews;

  const totalPages = reviews.total_pages;

  function getPagination(
    activePage: number,
    totalPages: number,
    maxPagesToShow = 9,
  ) {
    const pages = [];
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, activePage - half);
    let end = Math.min(totalPages, activePage + half);

    // Adjust the start and end if they're out of bounds
    if (activePage <= half) {
      end = Math.min(totalPages, maxPagesToShow);
    } else if (activePage + half >= totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    // Add the first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    // Add the range of pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add the last page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }

  const pagination = getPagination(activePage, totalPages);
  const getLayout = () => {
    let layout: any = <GridWidgetPreview />;

    switch (widget.layout.widget_layout) {
      case "list":
        layout = <ListWidgetPreview />;
        break;
      case "mosaic":
        layout = <MosaicWidgetPreview />;
    }
    return layout;
  };

  return (
    <div
      className={`r_pw_main_container ${widget.preferences.toggle_empty_review ? "r_pw_main_toggle_empty_review_container" : ""}`}
    >
      {widget.preferences.toggle_empty_review ? (
        <div className={"r_pw_empty_review_text"}>No reviews found </div>
      ) : (
        <>
          {getLayout()}
          {reviews.total_pages > 0 ? (
            <div className="r_w_pagination">
              <span
                className={"r_w_pagination-link"}
                onClick={(e: any) => {
                  e.preventDefault();
                  refetch(1);
                }}
              >
                &laquo;
              </span>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default WidgetLayoutPreview;

// &laquo;
//
// &raquo;

