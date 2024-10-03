import {Checkbox} from "../ui/checkbox";
import {CardContent, CardFooter, CardHeader} from "../ui/card";
import ReviewIcon from "../ReviewIcon";
import {Button} from "../ui/button";
import React from "react";
import {ReviewDetailImage} from "./ReviewDetailImage";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu";

interface ReviewDetailPropTypes {
    review: any
}

export const ReviewDetail = <T extends ReviewDetailPropTypes>({review}: T) => {

    const replyAddButtonLabel = [
        {
            label: "Add",
            value: "add"
        },
    ]
    const replyEditButtonLabel = [
        {
            label: "Edit",
            value: "edit"
        },
        {
            label: "Delete",
            value: "delete"
        },
    ]
    const statusOptions = review.is_approved
        ? [{ label: "Disapprove", value: "disapprove" }]
        : [{ label: "Approve", value: "approve" }];

    const handleApproveAction=(status:any)=>{
     console.log(status)
    }

    return <>
        <div className={"frt-flex frt-gap-3"}>
            <div>
                <Checkbox checked={true}/>
            </div>
            <div
                className={`frt-flex frt-bg-gray-100 frt-w-full frt-flex-col frt-border-l-4 frt-border-solid ${review.is_approved ? 'frt-border-l-green-500' : 'frt-border-l-gray-500'}`}>
                <div className={`frt-flex ${review.replies.length>0 ? 'frt-border-b frt-border-solid frt-border-b-gray-300' : ''}`}>
                    <div className={` ${review.images.length > 0 ? 'frt-w-[70%]' : 'frt-w-full'} `}>
                        <CardHeader className="frt-flex frt-flex-row frt-justify-between frt-items-start">
                            <div>
                                <h2 className="frt-text-xl frt-font-semibold">
                                    <span className="frt-text-blue-600">{review.reviewer_name}</span> <a
                                    href={review.product.product_url}>{review.product.name}</a>
                                </h2>
                                <p className="frt-text-sm frt-text-gray-500">Display name: {review.reviewer_name}</p>
                                <div className="frt-flex frt-items-baseline frt-mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <ReviewIcon
                                            key={i}
                                            filled={i < review.rating}
                                            className="frt-w-5 frt-h-5"
                                        />
                                    ))}
                                    <span className="frt-ml-2 frt-text-sm frt-text-gray-600">
                                   {review.date}
                                  </span>
                                    {/*<span>*/}
                                    {/*    <TickIcon*/}
                                    {/*</span>*/}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="frt-text-gray-700">
                                {review.content}
                            </p>
                        </CardContent>
                    </div>
                    { review.images.length >0 ?
                        <ReviewDetailImage review={review}/> : null}
                </div>
                {review.replies.length ? review.replies.map((reply: any) => {
                    return <>
                        <div className={"frt-p-4 frt-flex frt-flex-col frt-gap-y-3"}>
                            <h3 className={"!frt-text-lg frt-font-bold"}>Your reply</h3>
                            <span>{reply.content}</span>
                        </div>
                    </>
                }) : null}
                <CardFooter className="frt-flex frt-items-center frt-gap-x-4">
                    <div className="frt-flex frt-justify-between frt-items-center frt-mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    {review.is_approved ? "Approved" : "Not Approved"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    statusOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => handleApproveAction(option.value)}
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="frt-flex frt-justify-between frt-items-center frt-mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Reply</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    (review.replies.length ? replyEditButtonLabel : replyAddButtonLabel).map((label: any) => (
                                        <DropdownMenuItem key={label.value} defaultValue={label.value}>
                                            {label.label}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardFooter>

            </div>
        </div>
    </>
}