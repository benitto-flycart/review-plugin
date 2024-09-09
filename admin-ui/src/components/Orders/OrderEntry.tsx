import React, {useState} from "react";
import {useLocalState} from "../zustand/localState";
import {Card} from "../ui/card";

export const OrderEntry = ({order}: {
    order: any,
}) => {
    const {localState} = useLocalState();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [show, setShow] = useState(false)

    // @ts-ignore
    return (
        <Card>
            <div className={`frt-flex frt-items-center frt-p-4 !frt-shadow-md frt-h-18 frt-cursor-pointer`}
                 onClick={() => {
                     setShow(!show)
                 }}>
                <div
                    className="frt-flex-1 frt-text-primary xl:frt-text-sm  frt-font-bold lg:frt-text-xs md:frt-text-xs  frt-text-2.5">
                    {order.order_id}
                </div>
                <div
                    className="frt-flex-1 frt-text-primary xl:frt-text-sm frt-font-bold  lg:frt-text-xs md:frt-text-xs frt-text-2.5 ">
                    {order.email_status ? 'Success' : 'Pending'}
                </div>
                <div
                    className="frt-flex-1 frt-text-primary xl:frt-text-sm  frt-font-bold lg:frt-text-xs md:frt-text-xs  frt-text-2.5">
                    {order.order_item_count}
                </div>
                <div
                    className='frt-flex-1 frt-max-w-[200px] frt-text-primary xl:frt-text-sm  frt-font-bold lg:frt-text-xs md:frt-text-xs frt-text-2.5'>
                    {order.review_count ? '5' : '0'}
                </div>
                <div
                    className="frt-flex-1 frt-text-primary xl:frt-text-sm frt-font-bold  lg:frt-text-xs md:frt-text-xs  frt-text-2.5 ">
                    {order.date_created_gmt}
                </div>
                <div
                    className="frt-flex-1 frt-text-primary xl:frt-text-sm frt-font-bold  lg:frt-text-xs md:frt-text-xs  frt-text-2.5 ">
                    {order.customer ? '' : 'benitto@cartrabbit.in'}
                </div>
            </div>
            <div className={`frt-p-4 ${show ? '' : 'frt-hidden'} frt-animate-in`}>
                showing content
            </div>
        </Card>
    )
}