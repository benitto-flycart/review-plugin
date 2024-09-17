import React, {useContext} from "react";
import GridCardPreview from "./Cards/GridCardPreview";
import {ProductWidgetContext} from "../../ProductReviewContextAPI";

const GridWidgetPreview: () => React.JSX.Element = () => {
    const context = useContext<any>(ProductWidgetContext)

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const items: any = context.sampleReviews;

    return (
        <div className={"r_pw_g_all_reviews_container"}>
            {items.map((item: any, itemIndex: number) => {
                return <GridCardPreview review={item} key={itemIndex}/>
            })}
        </div>
    );
}

export default GridWidgetPreview;