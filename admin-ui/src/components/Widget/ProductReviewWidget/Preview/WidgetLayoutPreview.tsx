import React, {useContext} from "react";
import GridWidgetPreview from "./WidgetPreview/GridWidgetPreview";
import ListWidgetPreview from "./WidgetPreview/ListWidgetPreview";
import MosaicWidgetPreview from "./WidgetPreview/MosaicWidgetPreview";
import {ProductWidgetContext} from "../ProductReviewContextAPI";

const WidgetLayoutPreview = () => {
    const {widget, updateWidgetFields, sampleReviews, refetch} = useContext<any>(ProductWidgetContext)
    const reviews: any = sampleReviews;

    const getLayout = () => {
        let layout: any = <GridWidgetPreview/>;

        switch (widget.layout.widget_layout) {
            case 'list':
                layout = <ListWidgetPreview/>;
                break;
            case 'mosaic':
                layout = <MosaicWidgetPreview/>
        }
        return layout
    }

    return (
        <div className={"r_pw_main_container"}>
            {getLayout()}

            {reviews.total_pages > 0 ? (
                <div className="r_w_pagination">
                    <span  className={"r_w_pagination-link"} onClick={(e: any) => {
                        e.preventDefault();
                        refetch(1);
                    }}>&laquo;</span>
                    {Array.from({length: reviews.total_pages}, (_, index) => {
                        return (
                            <span  key={index} className={"r_w_pagination-link"} onClick={(e: any) => {
                                e.preventDefault();
                                refetch(1);
                            }}>{index + 1}</span>
                        )
                    })}
                    <span  className={"r_w_pagination-link"}
                       onClick={(e: any) => {
                           e.preventDefault();
                           refetch(reviews.total_pages);
                       }}
                    >&raquo;</span>
                </div>) : null}
        </div>
    )
}

export default WidgetLayoutPreview;