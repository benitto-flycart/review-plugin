import React from "react";

export const ReviewListEmpty = () => {
    return (
        <div className="frt-flex frt-items-center frt-flex-col frt-justify-center frt-text-center">
            <div className="frt-mx-auto frt-my-auto frt-flex frt-flex-col frt-gap-5 frt-p-5">
                <div><i className="farp farp-list-empty frt-text-6xl "></i></div>
                <div><span className="frt-text-lg frt-font-bold">No Reviews Found</span></div>
            </div>
        </div>
    )
}