import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import ReviewIcon from "../ReviewIcon";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { ReviewDetailImage } from "./ReviewDetailImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { axiosClient } from "../api/axios";
import { AxiosResponse } from "axios";
import { toastrError, toastrSuccess } from "../../helpers/ToastrHelper";
import { ApiErrorResponse } from "../api/api.types";
import { useLocalState } from "../zustand/localState";
import { BadgeCheck, ChevronDown, MoreHorizontal } from "lucide-react";
import { LoadingSpinner } from "../ui/loader";
import ReviewReplyDialog from "./ReviewReplyDialog";
import ConfirmationDialog from "./ReviewConfirmDialgoue";
import { getErrorMessage } from "../../helpers/helper";
import { cn } from "@/src/lib/utils";
import { TReview } from "./ReviewsType.type";

interface BulkActionReviewIdsType {
  val: any;
  set: any;
}

interface ReviewDetailPropTypes {
  review: TReview;
  bulkActionReviewIds: BulkActionReviewIdsType;
  getReviews: () => void;
}

export const ReviewDetail = <T extends ReviewDetailPropTypes>({
  review,
  bulkActionReviewIds,
  getReviews,
}: T) => {
  const { localState } = useLocalState();
  const [approveActionLoading, setApproveActionLoading] =
    useState<boolean>(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteReplyLoading, setDeleteReplyLoading] = useState(false);
  const replyAddButtonLabel = [
    {
      label: "Add",
      value: "add",
    },
  ];
  const replyEditButtonLabel = [
    {
      label: "Edit",
      value: "edit",
    },
    {
      label: "Delete",
      value: "delete",
    },
  ];
  const statusOptions = review.is_approved
    ? [{ label: "Unapprove", value: "unapprove" }]
    : [{ label: "Approve", value: "approve" }];

  const moreOptions = [
    {
      label: "See order details",
      value: "see_order_details",
      show: review.from_order ? true : false,
    },
    // { "label": "See discount details", "value": "see_discount_details" },
    // { "label": "Tag as featured", "value": "tag_as_featured" },
    {
      label: review.is_verified
        ? "Remove verified badge"
        : "Add verified badge",
      value: "verified_badge",
      show: true,
    },
    // { "label": "Add to Carousel", "value": "add_to_carousel" },
    // { "label": "Add to Video Slider", "value": "add_to_video_slider" },
    {
      label: "Delete review",
      value: "delete_review",
      show: true,
    },
  ];

  const getValueBasedOnType = (type: any) => {
    let value = false;

    if (type == "verified_badge") {
      value = !review.is_verified;
    } else if (type == "approve") {
      value = !review.is_approved;
    }

    return value;
  };

  const handleAddSingeBulkActionId = (id: number, isChecked: any) => {
    if (isChecked) {
      bulkActionReviewIds.set([...bulkActionReviewIds.val, id]);
    } else {
      const filteredBulkActionReviewIds = bulkActionReviewIds.val.filter(
        (reviewId: any) => {
          return reviewId !== id;
        },
      );
      bulkActionReviewIds.set(filteredBulkActionReviewIds);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteReply = async () => {
    setDeleteReplyLoading(true);
    axiosClient
      .post(``, {
        method: "review_action",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        type: "delete_review",
        id: review.id,
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
        setDeleteReplyLoading(false);
      });
  };

  const handleReplyButtonAction = (value: string) => {
    if (value == "delete") {
      handleDeleteReply();
    } else {
      setShowReplyDialog(true);
    }
  };
  const handleReviewStatusActions = (type: any) => {
    if (type == "see_discount_details") {
      return;
    }

    if (type == "approve" || type == "unapprove") {
      type = "approve";
      setApproveActionLoading(true);
    }

    const value = getValueBasedOnType(type);

    axiosClient
      .post(``, {
        method: "review_action",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        type: type,
        value: value,
        id: review.id,
      })
      .then((response: AxiosResponse) => {
        const data: any = response.data.data;
        toastrSuccess(data.message);
        getReviews();
      })
      .catch((error: AxiosResponse<ApiErrorResponse>) => {
        toastrError("Error Occurred");
      })
      .finally(() => {
        if (type == "approve" || type == "unapprove") {
          setApproveActionLoading(false);
        }
      });
  };

  return (
    <div className={"frt-flex frt-gap-3"}>
      <div>
        <Checkbox
          defaultChecked={false}
          checked={bulkActionReviewIds.val.includes(review.id)}
          onCheckedChange={(isChecked) => {
            handleAddSingeBulkActionId(review.id, isChecked);
          }}
        />
      </div>
      <Card
        className={`frt-flex frt-bg-white frt-w-full frt-flex-col frt-border-l-4 frt-border-solid frt-divide-y-1 ${review.is_approved ? "frt-border-l-green-500" : "frt-border-l-gray-500"}`}
      >
        <div className={`frt-flex md:frt-flex-row frt-flex-col-reverse`}>
          <div
            className={` ${review.images.length > 0 ? "md:frt-w-[70%]" : "frt-w-full"} `}
          >
            <CardHeader className="frt-flex frt-flex-row frt-justify-between frt-items-start">
              <div>
                <h2 className="frt-text-xl frt-font-semibold">
                  <span className="frt-text-blue-600">
                    {review.reviewer_name}
                  </span>{" "}
                  <a href={review.product.product_url}>{review.product.name}</a>
                </h2>
                <p className="frt-text-sm frt-text-gray-500">
                  Display name: {review.reviewer_name}
                </p>
                <div className="frt-flex frt-items-center frt-mt-2 frt-gap-x-2">
                  <span className={"frt-flex"}>
                    {[...Array(5)].map((_, i) => (
                      <ReviewIcon
                        key={i}
                        filled={i < review.rating ?? 0}
                        className="frt-w-5"
                      />
                    ))}
                  </span>
                  <span className="frt-text-sm frt-text-gray-600">
                    {review.date}
                  </span>
                  <span>{review.is_verified ? <BadgeCheck /> : null}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="frt-text-gray-700"
                dangerouslySetInnerHTML={{ __html: review.content }}
              ></p>
            </CardContent>
          </div>
          {review.images.length > 0 ? (
            <ReviewDetailImage review={review} getReviews={getReviews} />
          ) : null}
        </div>

        {review.replies.length
          ? review.replies.map((reply: any, index: number) => {
              return (
                <div key={index}>
                  <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-y-3"}>
                    <h3 className={"!frt-text-lg frt-font-bold"}>Your reply</h3>
                    <span>{reply.content}</span>
                  </div>
                </div>
              );
            })
          : null}
        <CardFooter
          className={"frt-flex frt-items-center frt-gap-x-4 !frt-p-0"}
        >
          <div className="frt-flex frt-justify-between frt-items-center frt-p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={"frt-flex frt-gap-x-1"}>
                  {review.is_approved ? "Approved" : "Not Approved"}{" "}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    className={"frt-flex frt-gap-x-1"}
                    key={option.value}
                    onClick={() => handleReviewStatusActions(option.value)}
                  >
                    {approveActionLoading ? <LoadingSpinner /> : null}{" "}
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="frt-flex frt-justify-between frt-items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={"frt-flex frt-gap-x-1"}>
                  Reply <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {(review.replies.length
                  ? replyEditButtonLabel
                  : replyAddButtonLabel
                ).map((label: any) => (
                  <DropdownMenuItem
                    key={label.value}
                    defaultValue={label.value}
                    className={`${label.value == "delete" ? "frt-text-destructive" : ""}`}
                    onClick={() => {
                      if (label.value === "delete") {
                        setIsDialogOpen(true);
                      } else {
                        handleReplyButtonAction(label.value);
                      }
                    }}
                  >
                    {label.value == "delete"
                      ? deleteReplyLoading && <LoadingSpinner />
                      : ""}{" "}
                    {label.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="frt-flex frt-justify-between frt-items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={"frt-bg-white !frt-w-6 !frt-h-6"}
                >
                  <MoreHorizontal className="frt-h-4 frt-w-4 " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={"start"}>
                {moreOptions
                  .filter((i: any) => i.show)
                  .map((item: any) => (
                    <DropdownMenuItem
                      // onClick={() => {
                      //     handleReviewStatusActions(item.value)
                      // }}
                      onClick={() => {
                        if (item.value === "delete_review") {
                          setIsDialogOpen(true);
                        } else if (item.value == "see_order_details") {
                          review.from_order &&
                            review.order_url &&
                            window.open(review.order_url, "_blank");
                        } else {
                          handleReviewStatusActions(item.value);
                        }
                      }}
                      key={item.value}
                      defaultValue={item.value}
                      className={`${item.value == "delete_review" ? "frt-text-destructive" : ""}`}
                    >
                      {item.value === "delete_review"
                        ? deleteReplyLoading && <LoadingSpinner />
                        : ""}
                      {item.label}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
              <ConfirmationDialog
                title="Are you sure you want to delete this review?"
                description="This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleDeleteReply}
                onCancel={handleCancel}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              />
            </DropdownMenu>
          </div>
        </CardFooter>
        <ReviewReplyDialog
          review={review}
          show={showReplyDialog}
          toggle={setShowReplyDialog}
          getReviews={getReviews}
        />
      </Card>
    </div>
  );
};
