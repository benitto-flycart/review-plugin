import { Button } from "../ui/button";
import { EyeOff, MoreHorizontal } from "lucide-react";
import React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
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
import { getErrorMessage } from "../../helpers/helper";
import { Badge } from "../ui/badge";
import EnhancedCarousel from "./EnhancedCarousel";
interface ReviewDetailImageProps {
  review: any;
  getReviews: () => void;
}

export const ReviewDetailImage = <T extends ReviewDetailImageProps>({
  review,
  getReviews,
}: T) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { localState } = useLocalState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const imageOptions = [
    {
      value: "view_photo",
      label: "View Photo",
    },
  ];

  if (review.images[current - 1]?.is_hide) {
    imageOptions.push({
      value: "show_photo",
      label: "Show Photo",
    });
  } else {
    imageOptions.push({
      value: "hide_photo",
      label: "Hide Photo",
    });
  }

  if (review.images.length) {
    if (!review.images[current - 1]?.is_cover_photo) {
      imageOptions.push({
        value: "set_as_cover",
        label: "Set as Cover Photo",
      });
    } else if (review.images[current - 1]?.is_cover_photo) {
      imageOptions.push({
        value: "remove_cover",
        label: "Remove Cover Photo",
      });
    }
  }

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const imageOptionActions = (status: any) => {
    const currentImage = review.images[current - 1];
    if (status == "view_photo") {
      window.open(currentImage.variants.full, "_blank");
      return;
    }
    axiosClient
      .post(``, {
        method: "photo_action",
        _wp_nonce_key: "flycart_review_nonce",
        _wp_nonce: localState?.nonces?.flycart_review_nonce,
        type: status,
        review_id: review.id,
        image_id: currentImage.id,
      })
      .then((response: AxiosResponse) => {
        const data: any = response.data.data;
        toastrSuccess(data.message);
        getReviews();
      })
      .catch((error: AxiosResponse<ApiErrorResponse>) => {
        toastrError(getErrorMessage(error));
      })
      .finally(() => {});
  };
  return (
    <div className="frt-m-4 md:frt-w-[30%] frt-bg-gray-200 frt-p-4 frt-rounded-lg frt-relative">
      <div className="frt-flex frt-justify-between frt-items-center">
        {review.images[current - 1]?.is_hide ? (
          <EyeOff width={"18px"} height={"18px"} className={"frt-opacity-70"} />
        ) : null}
        {review.images[current - 1]?.is_cover_photo ? (
          <Badge>Cover photo</Badge>
        ) : null}
        <DropdownMenu >
          <DropdownMenuTrigger asChild className={"frt-z-10"}>
            <Button
              variant="ghost"
              size="icon"
              className={
                "frt-absolute frt-right-2 frt-bg-white !frt-w-6 !frt-h-6"
              }
            >
              <MoreHorizontal className="frt-h-4 frt-w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"start"}>
            {imageOptions.map((option: any, index: number) => (
              <DropdownMenuItem
                onClick={() => {
                  imageOptionActions(option.value);
                }}
                className={"frt-flex frt-gap-x-1"}
                key={option.value}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="frt-flex frt-justify-center frt-items-center frt-h-75">
        <EnhancedCarousel images={review.images.map((img: any) => img.variants.full)} setApi={setApi} api={api}/>
      </div>
    </div>
  );
};
