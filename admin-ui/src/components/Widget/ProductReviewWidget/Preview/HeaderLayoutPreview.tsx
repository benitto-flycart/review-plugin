import React, {useContext} from "react";
import CompactHPreview from "./HeaderPreview/CompactHPreview/CompactHPreview";
import ExpandedHPreview from "./HeaderPreview/ExpandedHPreview/ExpandedHPreview";
import MinimalHPreview from "./HeaderPreview/MinimalHPreview/MinimalHPreview";
import {ProductWidgetContext} from "../ProductReviewContextAPI";


const HeaderLayoutPreview = () => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    let layout: any = <MinimalHPreview/>;

    switch (widget.layout.header_layout) {
        case 'compact':
            layout = <CompactHPreview/>;
            break;
        case 'expanded':
            layout = <ExpandedHPreview/>
    }

    return (
        <div>
            {layout}
        </div>
    )
}

export default HeaderLayoutPreview;