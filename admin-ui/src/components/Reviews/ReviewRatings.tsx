import {Card, CardContent} from "../ui/card";
import ReviewIcon from "../ReviewIcon";
import React from "react";
import {getReviewWidth} from "../../helpers/utils";

export interface ReviewRatingsPropType {
    reviewState: any
}

export const ReviewRatings = <T extends ReviewRatingsPropType>({reviewState}: T) => {
    return (
        <div className="frt-flex frt-flex-col frt-gap-6 frt-mb-6 md:frt-h-max md:frt-w-[20%]">
            <Card className="frt-flex-1">
                <CardContent className="frt-pt-6">
                    <div
                        className="frt-text-6xl frt-font-bold frt-text-center frt-mb-2">{Number.parseFloat(reviewState.total_review_average).toFixed(1)}</div>
                    <div className="frt-flex frt-justify-center frt-mb-2">
                        {[...Array(5)].map((_, i) => (
                            <ReviewIcon key={i} className="frt-w-6 frt-h-6"
                                        filled={i < reviewState.total_review_average}/>
                        ))}
                    </div>
                    <div className="frt-text-center frt-text-gray-600">{reviewState.total_review_count} Reviews</div>
                </CardContent>
            </Card>
            <Card className="frt-flex-1">
                <CardContent className="frt-pt-6 frt-flex frt-flex-col frt-gap-y-2">
                    <div className="frt-flex frt-items-center frt-gap-x-2">
                        <div className={"frt-flex frt-gap-x-1"}>
                            <div>
                                <span className="frt-w-4">5</span>
                            </div>
                            <div>
                                <ReviewIcon className="frt-w-4 frt-h-4 "/>
                            </div>
                        </div>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: getReviewWidth(reviewState.total_review_count, reviewState.ratings.five_star)
                                }}
                            ></div>
                        </div>
                        <div>
                                <span className=" frt-text-sm">
                            {getReviewWidth(reviewState.total_review_count, reviewState.ratings.five_star)}
                              </span>
                        </div>
                    </div>

                    <div className="frt-flex frt-items-center frt-gap-x-2">
                        <div  className={"frt-flex frt-gap-x-1"}>
                            <div><span className="frt-w-4">4</span></div>
                            <div><ReviewIcon className="frt-w-4 frt-h-4 "/></div>
                        </div>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: getReviewWidth(reviewState.total_review_count, reviewState.ratings.four_star)
                                }}
                            ></div>
                        </div>
                        <div>
                              <span
                                  className=" frt-text-sm">{getReviewWidth(reviewState.total_review_count, reviewState.ratings.four_star)}</span>
                        </div>
                    </div>
                    <div className="frt-flex frt-items-center frt-gap-x-2">
                        <div  className={"frt-flex frt-gap-x-1"}>
                            <div><span className="frt-w-4">3</span></div>
                            <div><ReviewIcon className="frt-w-4 frt-h-4 "/></div>
                        </div>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: getReviewWidth(reviewState.total_review_count, reviewState.ratings.three_star)
                                }}
                            ></div>
                        </div>
                        <div>   <span
                            className=" frt-text-sm">{getReviewWidth(reviewState.total_review_count, reviewState.ratings.three_star)}</span>
                        </div>
                    </div>
                    <div className="frt-flex frt-items-center frt-gap-x-2">
                        <div  className={"frt-flex frt-gap-x-1"}>
                            <div><span className="frt-w-4">2</span></div>
                            <div><ReviewIcon className="frt-w-4 frt-h-4 "/></div>
                        </div>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: getReviewWidth(reviewState.total_review_count, reviewState.ratings.two_star)
                                }}
                            ></div>
                        </div>
                        <div>  <span
                            className=" frt-text-sm">{getReviewWidth(reviewState.total_review_count, reviewState.ratings.two_star)}</span>
                        </div>
                    </div>
                    <div className="frt-flex frt-items-center frt-gap-x-2">
                        <div  className={"frt-flex frt-gap-x-1"}>
                            <div><span className="frt-w-4">1</span></div>
                            <div><ReviewIcon className="frt-w-4 frt-h-4 "/></div>
                        </div>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: getReviewWidth(reviewState.total_review_count, reviewState.ratings.single_star)
                                }}
                            ></div>
                        </div>
                        <div> <span
                            className=" frt-text-sm">{getReviewWidth(reviewState.total_review_count, reviewState.ratings.single_star)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}