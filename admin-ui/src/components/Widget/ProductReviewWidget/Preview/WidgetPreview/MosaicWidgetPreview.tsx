import React, {useContext} from "react";
import MosaicCardPreview from "./Cards/MosaicCardPreview";
import {ProductWidgetContext} from "../../ProductReviewContextAPI";

const MosaicWidgetPreview = () => {
    const context = useContext<any>(ProductWidgetContext)
    const items: any = context.sampleReviews.reviews;

    return (
        <div className="r_pw_r_m_all_reviews_container masonry-grid">
            {items.map((item: any, itemIndex: number) => {
                return <MosaicCardPreview review={item} key={itemIndex}/>
            })}
        </div>
    );
}

export default MosaicWidgetPreview;