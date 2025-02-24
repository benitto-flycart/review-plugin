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
import { ReviewList } from "./ReviewsList";
import { ReviewRatings } from "./ReviewRatings";
import { Pagination } from "../custom-hooks/pagination/Pagination";
import usePaginationHook from "../custom-hooks/pagination/usePaginationHook";
import { axiosClient } from "../api/axios";
import { AxiosResponse } from "axios";
import { ApiErrorResponse, ApiResponse } from "../api/api.types";
import { useLocalState } from "../zustand/localState";
import { TReviewData } from "./ReviewsType.type";
import { LoadingSpinner } from "../ui/loader";
import { ReviewListEmpty } from "./ReviewListEmpty";
import { toastrError } from "../../helpers/ToastrHelper";
import { getErrorMessage } from "../../helpers/helper";

type Filter = {
  search: string;
  status: string;
  rating: string;
  seperate_filter: string;
};

export const Reviews = () => {
  const [reviews, setReviews] = useState<TReviewData>({
    total: 0, // Total number of ratings
    per_page: 0, // Items per page
    total_pages: 0, // Total number of pages
    current_page: 0, // Current page number
    ratings: {
      single_star: 0,
      two_star: 0,
      three_star: 0,
      four_star: 0,
      five_star: 0,
      others: 0,
    }, // Rating breakdown
    total_review_count: 0, // Total number of reviews
    total_review_average: 0, // Average rating
    reviews: [], // Array of reviews
  });
  const { localState } = useLocalState();
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [includeMetaData, setIncludeMetaData] = useState<boolean>(true);
  const [searched,setSearched]=useState<boolean>(false)
  const [filter, setFilter] = useState<Filter>({
    search: "",
    status: "all",
    rating: "",
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
    { label: "All Reviews", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Unapproved", value: "hold" },
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

  const updateFilterValue = (
    key: keyof Filter,
    value: Filter[keyof Filter],
  ) => {
    setCurrentPage(1);
    setFilter({ ...filter, [key]: value });
  };

  const getReviews = () => {
    setReviewLoading(true);
    axiosClient
      .post(``, {
        method: "get_all_reviews",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        per_page: perPage,
        include_meta: includeMetaData,
        current_page: currentPage,
        search: filter.search,
        status: filter.status,
        rating: filter.rating,
        seperate_filter: filter.seperate_filter,
      })
      .then((response: AxiosResponse<ApiResponse<TReviewData>>) => {
        setReviews({ ...reviews, ...response.data.data });
        setIncludeMetaData(false);
      })
      .catch((error: AxiosResponse<ApiErrorResponse>) => {
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
    <div className=" frt-flex frt-flex-col frt-gap-y-3 frt-p-6">
      <h1 className="!frt-text-3xl !frt-font-bold !frt-text-gray-900 frt-mb-2">
        Reviews
      </h1>
      <div className={"frt-flex frt-gap-x-5 md:frt-flex-row frt-flex-col"}>
        <ReviewRatings reviewState={reviews} reviewLoading={reviewLoading} includeMetaData={includeMetaData} />
        <div className={"md:frt-w-[80%]"}>
          <div className="frt-space-y-4">
            <div className="frt-flex frt-sm:flex-row frt-gap-4">
              <Select
                value={filter.status}
                onValueChange={(value: any) => {
                  updateFilterValue("status", value);
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
                  updateFilterValue("rating", value);
                }}
              >
                <SelectTrigger className="frt-w-full frt-sm:w-[200px]">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingSelectItems.map(
                    (ratingSelectItem: any, index: number) => {
                      return (
                        <SelectItem value={ratingSelectItem.value} key={index}>
                          {ratingSelectItem.label}
                        </SelectItem>
                      );
                    },
                  )}
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Search by name, email or product"
              value={filter.search}
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
            />
            <div className="frt-flex frt-justify-end">
              <Button className={"frt-gap-x-2"} disabled={reviewLoading} onClick={()=>{
                setSearched(true)
                getReviews()
              }}> {reviewLoading && !includeMetaData ? <LoadingSpinner/> : null}Search</Button>
            </div>
          </div>
          {reviewLoading ? (
            <span>
              <LoadingSpinner />
            </span>
          ) : (
            <>
              {reviews.reviews.length == 0 && searched ? (
                <ReviewListEmpty />
              ) : (
                <>
                  <ReviewList
                    reviews={reviews.reviews}
                    getReviews={getReviews}
                    total={reviews.total}
                  />
                  <Pagination
                    handlePageClick={handlePagination}
                    selectedLimit={selectedLimit}
                    forcePage={currentPage - 1}
                    pageCount={reviews.total_pages}
                    updatePerPage={updatePerPage}
                    limit={reviews.per_page}
                    loading={false}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
