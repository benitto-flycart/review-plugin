import React, {useContext, useEffect, useState} from "react";
import HeaderLayoutPreview from "./HeaderLayoutPreview";
import WidgetLayoutPreview from "./WidgetLayoutPreview";
import {ProductWidgetContext} from "../ProductReviewContextAPI";
import {useLocalState} from "../../../zustand/localState";

const PreviewProductWidget = ({view = 'desktop', current_widget = ''}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)
    const {localState} = useLocalState();

    const [loading, setLoading] = useState(true)
    useEffect(() => {

        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = true
        })

        //@ts-ignore
        let iframe: any = window.frames['widget_preview_iframe'];


// Create a new link element
        let linkElement: any = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = localState.iframe_styles?.product_widget?.widget_css; // Replace with the URL of your stylesheet

        let head = iframe.contentDocument.head;
        let body = iframe.contentDocument.body;
        head.appendChild(linkElement);

        let another = document.createElement('link');
        another.rel = 'stylesheet';
        another.href = localState.iframe_styles?.font_css; // Replace with the URL of your stylesheet
        head.appendChild(another);

        let scriptmasonry = document.createElement('script');
        scriptmasonry.src = localState.iframe_styles?.product_widget?.masonry_js;
        // Wait for Masonry to load before executing product_widget.js
        head.appendChild(scriptmasonry);

        // Polling function to check if Masonry is available
        function waitForMasonry() {
            if (iframe.contentWindow.Masonry) {
                let js = document.createElement('script');
                js.setAttribute('defer', '1');
                js.src = localState.iframe_styles?.product_widget?.widget_js;
                iframe.contentDocument.body.appendChild(js);

                js.onload = () => {
                    if (widget.layout.widget_layout === "grid") {
                        //@ts-ignore
                        iframe.contentWindow.masnoryLayout();
                        return;
                    } else if (widget.layout.widget_layout === "mosaic") {
                        //@ts-ignore
                        iframe.contentWindow.mosaicLayout();
                        return;
                    }
                };

                js.onerror = function () {
                    console.error('Failed to load the product_widget.js script.');
                };

            } else {

            }
        }

        // Start polling
        waitForMasonry();

        updateWidgetFields((draftState: any) => {
            draftState.widget_loading = false
        })

    }, [widget.layout.widget_layout]);

    return (
        <div
            className={`${current_widget == 'floating_product' ? '' : 'wd_preview_content review-preview-wrap'} ${view == 'mobile' ? 'product-widget-preview-mobile' : 'product-widget-preview-desktop'}`}>
            <HeaderLayoutPreview/>
            <WidgetLayoutPreview/>
        </div>
    )
}

export default PreviewProductWidget;