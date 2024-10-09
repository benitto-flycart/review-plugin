import React from "react";

export const OrderListSearchEmpty = () => {
    return (
        <div
            className="frt-flex frt-items-center frt-flex-col frt-justify-center frt-text-center frt-h-full">
            <div className="frt-mx-auto frt-my-auto frt-flex frt-flex-col frt-gap-5 frt-p-5">
                <div>
                    <i className="rwp rwp-list-empty frt-text-6xl "></i>
                </div>
                <div>
                    <span className="frt-text-lg frt-font-bold">
                      The order you are looking for is not found
                    </span>
                </div>
                <div>
                    <p className="frt-text-sm">
                        Uh oh, your order list is looking a little empty! Looks
                        like the search didn't return any results
                    </p>
                </div>
            </div>
        </div>
    )
}