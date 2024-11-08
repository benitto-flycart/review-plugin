import React, { useContext, useEffect } from "react";
import HeaderLayoutPreview from "./HeaderLayoutPreview";
import WidgetLayoutPreview from "./WidgetLayoutPreview";
import { ProductWidgetContext } from "../ProductReviewContextAPI";
import { useLocalState } from "../../../zustand/localState";
import { applyStylesToIframe } from "../../../../helpers/utils";

const PreviewProductWidget = ({
  view = "desktop",
  current_widget = "",
}: any) => {
  const context = useContext<any>(ProductWidgetContext);
  const { widget, updateWidgetFields, methods } = context;
  const { localState } = useLocalState();

  useEffect(() => {
    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = false;
    });

    //@ts-ignore
    let iframe: any = window.frames["widget_preview_iframe"];
    // Create a new link element
    let linkElement: any = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = localState.iframe_styles?.product_widget?.widget_css; // Replace with the URL of your stylesheet

    let head = iframe.contentDocument.head;
    let body = iframe.contentDocument.body;
    head.appendChild(linkElement);

    let another = document.createElement("link");
    another.rel = "stylesheet";
    another.href = localState.iframe_styles?.font_css; // Replace with the URL of your stylesheet
    head.appendChild(another);
    let scriptmasonry = document.createElement("script");
    scriptmasonry.src = localState.iframe_styles?.product_widget?.masonry_js;
    // Wait for Masonry to load before executing product_widget.js
    head.appendChild(scriptmasonry);

    // Polling function to check if Masonry is available
    function waitForMasonry() {
      console.log("checking wait for mansory layouat called");
      if (iframe.contentWindow.Masonry) {
        console.log("manstory not found");
        let js = document.createElement("script");
        js.setAttribute("defer", "1");
        js.src = localState.iframe_styles?.product_widget?.widget_js;
        iframe.contentDocument.body.appendChild(js);

        js.onload = () => {
          console.log(widget.layout);
          if (widget.layout.widget_layout === "grid") {
            //@ts-ignore
            iframe.contentWindow.masnoryLayout();
            return;
          } else if (widget.layout.widget_layout === "mosaic") {
            //@ts-ignore
            console.log(widget.layout);
            iframe.contentWindow.mosaicLayout();
            return;
          }
        };
        js.onerror = function () {
          console.error("Failed to load the product_widget.js script.");
        };
      } else {
      }
    }

    setTimeout(() => {
      waitForMasonry();
    }, 2000);

    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = false;
    });
  }, [widget.layout.widget_layout, widget.sampleReviews]);

  // @ts-ignore
  return (
    <div style={{ ...methods.getProductReviewWidgetColors() }}>
      <div
        className={`${widget.preferences.toggle_loading_screen ? "r_pw_main_toggle_loading_container " : " "}${current_widget == "floating_product" ? "" : "wd_preview_content review-preview-wrap"} ${view == "mobile" ? "product-widget-preview-mobile" : "product-widget-preview-desktop"}`}
      >
        {widget.preferences.toggle_loading_screen ? (
          <div className={"r_pw_loading_text"}>Loading...</div>
        ) : (
          <>
            <HeaderLayoutPreview />
            <WidgetLayoutPreview />
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewProductWidget;
