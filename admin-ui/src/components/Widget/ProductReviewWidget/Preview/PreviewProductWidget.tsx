import React, {useEffect, useState} from "react";
import HeaderLayoutPreview from "./HeaderLayoutPreview";
import WidgetLayoutPreview from "./WidgetLayoutPreview";
import {LoadingSpinner} from "../../../ui/loader";

const PreviewProductWidget = ({view = 'desktop', current_widget = ''}: any) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            let iframe = window.frames['widget_preview_iframe'];


// Create a new link element
            let linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/product_widget.css'; // Replace with the URL of your stylesheet

            let head = iframe.contentDocument.head;
            head.appendChild(linkElement);

            let another = document.createElement('link');
            another.rel = 'stylesheet';
            another.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css'; // Replace with the URL of your stylesheet

            head.appendChild(another);

            setLoading(false)

        }, 2000)

    }, []);

    return (
        <>
            {!loading ? (
                <div
                    className={`${current_widget == 'floating_product' ? '' : 'wd_preview_content review-preview-wrap'} frt-flex frt-flex-col frt-gap-2 ${view == 'mobile' ? 'product-widget-preview-mobile' : 'product-widget-preview-desktop'}`}>
                    <HeaderLayoutPreview/>
                    <WidgetLayoutPreview/>
                </div>) : <div style={{width: "100%", height: "100%"}}><LoadingSpinner/></div>}
        </>
    )
}

export default PreviewProductWidget;