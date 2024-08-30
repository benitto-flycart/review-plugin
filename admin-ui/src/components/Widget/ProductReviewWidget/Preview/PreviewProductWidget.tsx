import React, {useContext, useEffect, useState} from "react";
import HeaderLayoutPreview from "./HeaderLayoutPreview";
import WidgetLayoutPreview from "./WidgetLayoutPreview";
import {LoadingSpinner} from "../../../ui/loader";
import {ProductWidgetContext} from "../ProductReviewContextAPI";

const PreviewProductWidget = ({view = 'desktop', current_widget = ''}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const [loading, setLoading] = useState(true)
    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            //@ts-ignore
            let iframe: any = window.frames['widget_preview_iframe'];


// Create a new link element
            let linkElement:any = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/widgets/product_widget.css'; // Replace with the URL of your stylesheet

            let head = iframe.contentDocument.head;
            let body = iframe.contentDocument.body;
            head.appendChild(linkElement);

            let another = document.createElement('link');
            another.rel = 'stylesheet';
            another.href = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/css/review-fonts.css'; // Replace with the URL of your stylesheet
            head.appendChild(another);

            let scriptmasonry = document.createElement('script');
            scriptmasonry.src = 'https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js';
            // Wait for Masonry to load before executing product_widget.js
            head.appendChild(scriptmasonry);

            // Polling function to check if Masonry is available
            function waitForMasonry() {
                if (iframe.contentWindow.Masonry) {
                    console.log('Masonry is loaded');
                    // Now load product_widget.js
                    let js = document.createElement('script');
                    js.setAttribute('defer', '1');
                    js.src = 'http://localhost:8004/wp-content/plugins/flycart-reviews/resources/admin/js/product_widget.js';
                    iframe.contentDocument.body.appendChild(js);
                } else {
                    console.log('Waiting for Masonry...');
                    setTimeout(waitForMasonry, 50);
                }
            }

            // Start polling
            waitForMasonry();

            setLoading(false)

        }, 2000)

    }, [widget.layout]);

    return (
        <>
            {!loading ? (
                <div
                    className={`${current_widget == 'floating_product' ? '' : 'wd_preview_content review-preview-wrap'} ${view == 'mobile' ? 'product-widget-preview-mobile' : 'product-widget-preview-desktop'}`}>
                    <HeaderLayoutPreview/>
                    <WidgetLayoutPreview/>
                </div>) : <div style={{width: "100%", height: "100%"}}><LoadingSpinner/></div>}
        </>
    )
}

export default PreviewProductWidget;