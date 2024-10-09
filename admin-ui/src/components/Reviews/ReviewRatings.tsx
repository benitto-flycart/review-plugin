import {Card, CardContent} from "../ui/card";
import ReviewIcon from "../ReviewIcon";
import React from "react";

export interface ReviewRatingsPropType{
    reviewState:any
}
export const ReviewRatings = <T extends ReviewRatingsPropType>({ reviewState }: T) => {
    return (
        <div className="frt-flex frt-flex-col frt-gap-6 frt-mb-6 md:frt-h-max md:frt-w-[30%]">
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
                <CardContent className="frt-pt-6">
                    <div className="frt-flex frt-items-center frt-mb-2">
                        <span className="frt-w-4">5</span>
                        <ReviewIcon className="frt-w-4 frt-h-4 frt-mr-2"/>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: `${reviewState.total_review_count == 0 ? 0 : Math.round((reviewState.ratings.five_star / reviewState.total_review_count) * 100)}%`
                                }}
                            ></div>
                        </div>
                        <span className="frt-ml-2 frt-text-sm">
                             {reviewState.total_review_count == 0 ? "0" :Math.round((reviewState.ratings.five_star / reviewState.total_review_count) * 100)}%
                              </span>
                    </div>

                    <div className="frt-flex frt-items-center frt-mb-2">
                        <span className="frt-w-4">4</span>
                        <ReviewIcon className="frt-w-4 frt-h-4 frt-mr-2"/>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: `${reviewState.total_review_count == 0 ? 0 : Math.round((reviewState.ratings.four_star / reviewState.total_review_count) * 100)}%`
                                }}
                            ></div>
                        </div>
                        <span
                            className="frt-ml-2 frt-text-sm">{reviewState.total_review_count == 0 ? "0" :Math.round((reviewState.ratings.four_star / reviewState.total_review_count) * 100)}%</span>
                    </div>
                    <div className="frt-flex frt-items-center frt-mb-2">
                        <span className="frt-w-4">3</span>
                        <ReviewIcon className="frt-w-4 frt-h-4 frt-mr-2"/>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: `${reviewState.total_review_count == 0 ? 0 : Math.round((reviewState.ratings.three_star / reviewState.total_review_count) * 100)}%`
                                }}
                            ></div>
                        </div>
                        <span
                            className="frt-ml-2 frt-text-sm">{reviewState.total_review_count == 0 ? "0" :Math.round((reviewState.ratings.three_star / reviewState.total_review_count) * 100)}%</span>
                    </div>
                    <div className="frt-flex frt-items-center frt-mb-2">
                        <span className="frt-w-4">2</span>
                        <ReviewIcon className="frt-w-4 frt-h-4 frt-mr-2"/>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: `${reviewState.total_review_count == 0 ? 0 : Math.round((reviewState.ratings.two_star / reviewState.total_review_count) * 100)}%`
                                }}
                            ></div>
                        </div>
                        <span
                            className="frt-ml-2 frt-text-sm">{reviewState.total_review_count == 0 ? "0" :Math.round((reviewState.ratings.two_star / reviewState.total_review_count) * 100)}%</span>
                    </div>
                    <div className="frt-flex frt-items-center frt-mb-2">
                        <span className="frt-w-4">1</span>
                        <ReviewIcon className="frt-w-4 frt-h-4 frt-mr-2"/>
                        <div className="frt-w-full frt-bg-gray-200 frt-rounded-full frt-h-2.5">
                            <div
                                className="frt-bg-primary frt-h-2.5 frt-rounded-full"
                                style={{
                                    width: `${reviewState.total_review_count == 0 ? 0 : Math.round((reviewState.ratings.single_star / reviewState.total_review_count) * 100)}%`
                                }}
                            ></div>
                        </div>
                        <span
                            className="frt-ml-2 frt-text-sm">{reviewState.total_review_count == 0 ? "0" :Math.round((reviewState.ratings.single_star / reviewState.total_review_count) * 100)}%</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}