import React, {useContext} from "react";
import GridWidgetPreview from "./WidgetPreview/GridWidgetPreview";
import ListWidgetPreview from "./WidgetPreview/ListWidgetPreview";
import MosaicWidgetPreview from "./WidgetPreview/MosaicWidgetPreview";
import {ProductWidgetContext} from "../ProductReviewContextAPI";

const WidgetLayoutPreview = () => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const getLayout=()=>{
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
        <div>
            {getLayout()}
        </div>
    )
}

export default WidgetLayoutPreview;