import React, {useContext} from "react";
import ListCardPreview from "./Cards/ListCardPreview";
import {ProductWidgetContext} from "../../ProductReviewContextAPI";

const ListWidgetPreview = () => {
    const context = useContext<any>(ProductWidgetContext)
    const items: any = context.sampleReviews;

    return (
        <div
            className="r_pw_r_l_preview_container"
        >
            {items.map((item:any, index: number) => (
                <ListCardPreview review={item} key={index}/>
            ))}
        </div>
    )
}

export default ListWidgetPreview;