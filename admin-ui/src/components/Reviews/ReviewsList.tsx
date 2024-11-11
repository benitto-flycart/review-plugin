import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ReviewDetail } from "./ReviewDetail";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { axiosClient } from "../api/axios";
import { AxiosResponse } from "axios";
import { ApiErrorResponse } from "../api/api.types";
import { useLocalState } from "../zustand/localState";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { LoadingSpinner } from "../ui/loader";
import { getErrorMessage } from "../../helpers/helper";
import { TReview } from "./ReviewsType.type";

export interface ReviewRatingsPropType {
  reviews: TReview[];
  total: number;
  getReviews: () => void;
}

export const ReviewList = <T extends ReviewRatingsPropType>({
  reviews,
  total,
  getReviews,
}: T) => {
  const { localState } = useLocalState();
  const [bulkActionState, setBulkActionState] = React.useState({
    label: "Approve all reviews",
    value: "approve_all_reviews",
  });
  const [bulkActionLoading, setBulkActionLoading] =
    React.useState<boolean>(false);
  const [bulkActionReviewIds, setBulkActionReviewIds] = React.useState<any>([]);
  const [selectAllChecked, setSelectAllChecked] = React.useState<any>(false);

  const publishActionButtonLabels = [
    {
      label: "Approve all reviews",
      value: "approve_all_reviews",
    },
    {
      label: "UnApprove all reviews",
      value: "un_approve_all_reviews",
    },
    {
      label: "Delete all reviews",
      value: "delete_all_reviews",
    },
  ];

  const handleBulkCheckboxChange = (checked: boolean) => {
    if (checked) {
      const allIds = reviews.map((review: any) => review.id);
      setBulkActionReviewIds(allIds);
    } else {
      setBulkActionReviewIds([]);
    }
    setSelectAllChecked(checked);
  };

  const performBulkAction = () => {
    setBulkActionLoading(true);
    axiosClient
      .post(``, {
        method: "review_bulk_action",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        bulk_action: bulkActionState.value,
        ids: bulkActionReviewIds,
      })
      .then((response: AxiosResponse) => {
        const data: any = response.data.data;
        toastrSuccess(data.message);
        getReviews();
      })
      .catch((error: AxiosResponse<ApiErrorResponse>) => {
        toastrError(getErrorMessage(error));
      })
      .finally(() => {
        setBulkActionLoading(false);
      });
  };

  return (
    <div>
      <div>
        <div className={"frt-my-2"}>
          <span className={"frt-text-lg frt-font-bold "}>
            {" "}
            {total} Reviews found
          </span>
        </div>
        <div className="frt-flex frt-justify-start frt-gap-x-3 frt-items-center frt-mb-4">
          <div>
            <Checkbox
              checked={bulkActionReviewIds.length == reviews.length}
              onCheckedChange={handleBulkCheckboxChange}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={"frt-gap-x-2"}>
                {bulkActionState.label}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {publishActionButtonLabels.map((publishButtonLabel: any) => {
                return (
                  <DropdownMenuCheckboxItem
                    onClick={() => {
                      setBulkActionState(publishButtonLabel);
                    }}
                    checked={publishButtonLabel.value == bulkActionState.value}
                    key={publishButtonLabel.value}
                  >
                    {publishButtonLabel.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={performBulkAction}
            disabled={bulkActionLoading || bulkActionReviewIds.length == 0}
            className={"frt-flex frt-gap-x-1"}
          >
            {" "}
            {bulkActionLoading ? <LoadingSpinner /> : ""}Apply
          </Button>
        </div>
      </div>
      <Card className="frt-bg-white frt-shadow-lg frt-max-w-4xl frt-p-6 frt-flex frt-flex-col frt-gap-y-4">
        {reviews?.length > 0 &&
          reviews?.map((item: any) => {
            return (
              <ReviewDetail
                review={item}
                getReviews={getReviews}
                key={item.id}
                bulkActionReviewIds={{
                  val: bulkActionReviewIds,
                  set: setBulkActionReviewIds,
                }}
              />
            );
          })}
      </Card>
    </div>
  );
};
