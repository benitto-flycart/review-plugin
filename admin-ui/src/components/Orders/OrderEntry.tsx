import React, {useState} from "react";
import {useLocalState} from "../zustand/localState";
import {Card} from "../ui/card";

export const OrderEntry = ({order}: {
    order: any,
}) => {
    const {localState} = useLocalState();

    const [isSubmitting, setIsSubmitting] = useState(false)

    // @ts-ignore
    return (
        <Card
            className={`frt-flex frt-items-center frt-p-4 !frt-shadow-md frt-h-18`}>
            <div
                className="frt-flex-1 frt-text-primary xl:frt-text-sm  frt-font-bold lg:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-w-1/7">
                {order.order_id}
            </div>
            <div
                className="frt-flex-1 frt-text-primary xl:frt-text-sm frt-font-bold  lg:frt-text-xs md:frt-text-xs frt-text-2.5 frt-w-1/7 ">
                {order.email_status ? 'Success' : 'Pending'}
            </div>
            <div
                className="frt-flex-1 frt-text-primary xl:frt-text-sm  frt-font-bold lg:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-w-1/7">
                {order.order_item_count}
            </div>
            <div
                className='frt-flex-1 frt-max-w-[200px] frt-text-primary xl:frt-text-sm  frt-font-bold lg:frt-text-xs md:frt-text-xs frt-text-2.5 frt-w-1/7'>
                {order.review_count ? '5' : '0'}
            </div>
            <div
                className="frt-flex-1 frt-text-primary xl:frt-text-sm frt-font-bold  lg:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-w-1/7 ">
                {order.date_created_gmt}
            </div>
            <div
                className="frt-flex-1 frt-text-primary xl:frt-text-sm frt-font-bold  lg:frt-text-xs md:frt-text-xs  frt-text-2.5 frt-w-1/7 ">
                {order.customer ? '' : 'benitto@cartrabbit.in'}
            </div>
        </Card>
    )
}