import React from "react";
import {Card, CardContent} from "../ui/card";
import {Skeleton} from "../ui/skeleton";


export const OrderEntrySkeleton = () => {
    return (
        <Card
            className="frt-flex frt-flex-col frt-w-full frt-justify-center frt-gap-4 !frt-shadow-md frt-overflow-hidden">
            <CardContent className="frt-flex frt-flex-row frt-justify-between !frt-p-0">
                <Skeleton className="frt-translate-x-2 frt-animate-shimmer frt-h-14 frt-w-full"></Skeleton>
            </CardContent>
        </Card>
    )
}