import React from "react";

export const OrderListEmpty = () => {
    return (
        <div className="frt-flex frt-items-center frt-flex-col frt-justify-center frt-text-center frt-h-full">
            <div className="frt-mx-auto frt-my-auto frt-flex frt-flex-col frt-gap-5 frt-p-5">
                <div><i className="rwp rwp-list-empty frt-text-6xl "></i></div>
                <div><span className="frt-text-lg frt-font-bold">No Ordes Found</span></div>
                <div>
                    <p className="frt-text-sm ">Uh oh, Your Order list is looking a little empty! Time to add some new ones.</p>
                </div>

            </div>
        </div>
    )
}