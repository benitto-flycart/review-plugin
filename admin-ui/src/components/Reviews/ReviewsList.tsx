import React from "react";
import {Button} from "../ui/button";
import {Card} from "../ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import {ReviewDetail} from "./ReviewDetail";

export interface ReviewRatingsPropType{
    reviewState:any
}

export const ProductReview = <T extends ReviewRatingsPropType> ({reviewState} : T) => {

    const [bulkActionState,setBulkActionState] = React.useState( {
        label:"Approve all reviews",
        value:"approve_all_reviews"
    },);
    const publishActionButtonLabels=[
        {
            label:"Approve all reviews",
            value:"approve_all_reviews"
        },
        {
            label:"DisApprove all reviews",
            value:"dis_approve_all_reviews"
        },
        {
            label:"Delete all reviews",
            value:"delete_all_reviews"
        },
    ]

    const performBulkAction=()=>{
     console.log(bulkActionState.value)
    }
    return (
        <div>
            <div>
                <div className={"frt-my-2"}>
                    <span className={"frt-text-lg frt-font-bold "}> {reviewState.total_review_count} Reviews found</span>
                </div>
                <div className="frt-flex frt-justify-start frt-gap-x-3 frt-items-center frt-mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{bulkActionState.label}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {
                                publishActionButtonLabels.map((publishButtonLabel:any)=>{
                                    return <DropdownMenuCheckboxItem  onClick={() => {
                                        setBulkActionState(publishButtonLabel)
                                    }} checked={publishButtonLabel.value==bulkActionState.value} key={publishButtonLabel.value}>
                                        {publishButtonLabel.label}
                                    </DropdownMenuCheckboxItem>
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={performBulkAction}>Apply</Button>
                </div>
            </div>

            <Card className="frt-bg-white frt-shadow-lg frt-max-w-4xl frt-mx-auto frt-p-6 frt-m-4 frt-flex frt-flex-col frt-gap-y-4">
                {
                    reviewState.reviews.length > 0 && reviewState.reviews.map((reviewData:any) => {
                        return <ReviewDetail review={reviewData} key={reviewData.id}/>
                    })
                }
            </Card>
        </div>
    );
};
