import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ProductReview } from "./ReviewsList";
//@ts-ignore
import data from "./data.json";
import { ReviewRatings } from "./ReviewRatings";
import { Pagination } from "../custom-hooks/pagination/Pagination";
import usePaginationHook from "../custom-hooks/pagination/usePaginationHook";
import { axiosClient } from "../api/axios";
import { AxiosResponse } from "axios";
import { ApiErrorResponse, ApiResponse } from "../api/api.types";
import { TOrderList } from "../Orders/Order.types";
import { useLocalState } from "../zustand/localState";
import { TReviewData } from "./ReviewsType.type";
import { reviewDefaultState } from "./ReviewsDefaultState";
import { LoadingSpinner } from "../ui/loader";

export const Reviews = () => {
  const [reviewState, setReviewState] =
    useState<TReviewData>(reviewDefaultState);
  const { localState } = useLocalState();
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    search: "",
    status: "all",
    rating: "1",
    seperate_filter: "",
  });

  const {
    handlePagination,
    updatePerPage,
    selectedLimit,
    perPage,
    currentPage,
    setCurrentPage,
  } = usePaginationHook();

  const statusLabels = [
    { label: "All reviews", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Unapproved", value: "unapproved" },
    { label: "Trash", value: "trash" },
    { label: "Spam", value: "spam" },
  ];

  const ratingSelectItems = [
    { label: "Any rating", value: "0" },
    { label: "5 Stars", value: "5" },
    { label: "4 Stars", value: "4" },
    { label: "3 Stars", value: "3" },
    { label: "2 Stars", value: "2" },
    { label: "1 Star", value: "1" },
  ];

  const reviewTypeSelectItems = [
    { label: "Any rating", value: "any_rating" },
    { label: "Carousal", value: "carousal" },
    { label: "Video slider", value: "video_slider" },
    { label: "Photo & video reviews", value: "photo_and_video_reviews" },
    { label: "Featured reviews", value: "featured_reviews" },
    { label: "Shop app reviews", value: "shop_ap_reviews" },
    { label: "Imported", value: "imported" },
  ];

  const getReviews = () => {
    setReviewLoading(true);

    axiosClient
      .post(``, {
        method: "get_all_reviews",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        per_page: perPage,
        current_page: currentPage,
        search: filter.search,
        status: filter.status,
        rating: filter.rating,
        seperate_filter: filter.seperate_filter,
      })
      .then((response: AxiosResponse<ApiResponse<TReviewData>>) => {
        setReviewState(response.data.data);
      })
      .catch((error: AxiosResponse<ApiErrorResponse>) => {
        // @ts-ignore
        toastrError(getErrorMessage(error));
      })
      .finally(() => {
        setReviewLoading(false);
      });
  };

  useEffect(() => {
    getReviews();
  }, [perPage, currentPage]);

  return (
    <div className="frt-container frt-mx-auto frt-p-6 frt-max-w-4xl">
      <h1 className="!frt-text-4xl !frt-font-bold !frt-text-gray-900 frt-mb-2">
        Reviews
      </h1>
      <ReviewRatings reviewState={reviewState} />
      <div className="frt-space-y-4">
        <Input
          placeholder="Search by name, email or product"
          value={filter.search}
          onChange={(e) => {
            setFilter({ ...filter, search: e.target.value });
          }}
        />

        <div className="frt-flex frt-flex-col frt-sm:flex-row frt-gap-4">
          <Select
            value={filter.status}
            onValueChange={(value: any) => {
              setFilter({ ...filter, status: value });
            }}
          >
            <SelectTrigger className="frt-w-full frt-sm:w-[200px]">
              <SelectValue placeholder="Published & Pending" />
            </SelectTrigger>
            <SelectContent>
              {statusLabels.map((statusLabel: any, index: number) => {
                return (
                  <SelectItem value={statusLabel.value} key={index}>
                    {statusLabel.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            value={filter.rating}
            onValueChange={(value) => {
              setCurrentPage(1);
              setFilter({ ...filter, rating: value });
            }}
          >
            <SelectTrigger className="frt-w-full frt-sm:w-[200px]">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              {ratingSelectItems.map((ratingSelectItem: any, index: number) => {
                return (
                  <SelectItem value={ratingSelectItem.value} key={index}>
                    {ratingSelectItem.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {/* <Select */}
          {/*   value={filter.seperate_filter} */}
          {/*   onValueChange={(value) => { */}
          {/*     setFilter({ ...filter, seperate_filter: value }); */}
          {/*   }} */}
          {/* > */}
          {/*   <SelectTrigger className="frt-w-full frt-sm:w-[200px]"> */}
          {/*     <SelectValue placeholder="Filter" /> */}
          {/*   </SelectTrigger> */}
          {/*   <SelectContent> */}
          {/*     {reviewTypeSelectItems.map( */}
          {/*       (reviewTypeSelectItem: any, index: number) => { */}
          {/*         return ( */}
          {/*           <SelectItem value={reviewTypeSelectItem.value} key={index}> */}
          {/*             {reviewTypeSelectItem.label} */}
          {/*           </SelectItem> */}
          {/*         ); */}
          {/*       }, */}
          {/*     )} */}
          {/*   </SelectContent> */}
          {/* </Select> */}
        </div>
        <div className="frt-flex frt-justify-end">
          <Button onClick={getReviews}>Search</Button>
        </div>
      </div>
      {reviewLoading ? (
        <span>
          <LoadingSpinner />
        </span>
      ) : (
        <>
          <ProductReview reviewState={reviewState} getReviews={getReviews} />
          <Pagination
            handlePageClick={handlePagination}
            selectedLimit={selectedLimit}
            forcePage={currentPage - 1}
            pageCount={reviewState.total_pages}
            updatePerPage={updatePerPage}
            limit={reviewState.per_page}
            loading={false}
          />
        </>
      )}
    </div>
  );
};