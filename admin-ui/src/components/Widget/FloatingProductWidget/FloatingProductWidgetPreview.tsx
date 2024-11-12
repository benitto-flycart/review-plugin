import React, { useContext, useEffect } from "react";

import { FloatingProductWidgetContext } from "./FloatingProductWidgetContextAPI";
import ProductWidgetContextAPI from "../ProductReviewWidget/ProductReviewContextAPI";
import PreviewProductWidget from "../ProductReviewWidget/Preview/PreviewProductWidget";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useLocalState } from "../../zustand/localState";

const FloatingProductWidgetPreview = () => {
  const { widget, updateWidgetFields, methods } = useContext<any>(
    FloatingProductWidgetContext,
  );
  const { localState } = useLocalState();
  useEffect(() => {
    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = true;
    });
    //@ts-ignore
    let iframe: any = window.frames["widget_preview_iframe"];

    let linkElement: any = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href =
      localState.iframe_styles?.floating_product_reviews_widget?.widget_css; // Replace with the URL of your stylesheet

    let head = iframe.contentDocument.head;
    let body = iframe.contentDocument.body;
    head.appendChild(linkElement);

    let another = document.createElement("link");
    another.rel = "stylesheet";
    another.href = localState.iframe_styles?.font_css; // Replace with the URL of your stylesheet
    head.appendChild(another);

    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = false;
    });
  }, [widget.layout]);
  return (
    <div
      className={`wd_preview_content review-preview-wrap frt-flex frt-flex-col frt-min-h-[90vh] frt-relative ${widget.view == "mobile" ? "floating_product_widget_preview_mobile" : "floating_product_widget_preview_desktop"}`}
    >
      <div className={"r_fpw-container"} style={methods.getFPStyles()}>
        <div className={"r_fpw-close_icon wd_fp_header_container__close_icon"}>
          <Cross1Icon />
        </div>
        <div className={"r_fpw-text_content_wrapper"}>
          <span className={"r_fpw-text_content_text"}>
            {widget.text_content}
          </span>
        </div>
      </div>
      <ProductWidgetContextAPI>
        <PreviewProductWidget
          view={widget.view}
          current_widget={"floating_product"}
        />
      </ProductWidgetContextAPI>
    </div>
  );
};

export default FloatingProductWidgetPreview;

