import React, { useContext, useEffect, useState } from "react";

import "./popup.css";
import { PopupWidgetContext } from "./PopupWidgetContextAPI";
import { Cross1Icon } from "@radix-ui/react-icons";
import ReviewIcon from "../../ReviewIcon";
import { useLocalState } from "../../zustand/localState";

const PreviewPopupWidget = () => {
  const { widget, updateWidgetFields, methods } =
    useContext<any>(PopupWidgetContext);
  const [loading, setLoading] = useState(true);
  const { localState } = useLocalState();

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = true;
    });

    // setTimeout(() => {
    //@ts-ignore
    let iframe: any = window.frames["widget_preview_iframe"];

    let linkElement: any = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = localState.iframe_styles?.popup_widget?.widget_css; // Replace with the URL of your stylesheet

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

    // }, 2000)
  }, [widget.layout]);

  return (
    <div
      className={`wd_preview_content review-preview-wrap`}
      style={methods.getPopupVars()}
    >
      <div
        className={`r_puw_container ${methods.getPopupPosition()} ${methods.getCornerRadius()}`}
        key={widget.position}
      >
        <span className="r_puw_close-icon">
          <Cross1Icon />
        </span>
        <div className="r_puw-review_wrapper">
          <div className="r_puw-review_image_wrapper">
            <img
              src={
                `https://unsplash.it/${getRandomNumber(500, 1000)}/${getRandomNumber(500, 1000)}` +
                `?t=` +
                Math.floor(Math.random() * 3)
              }
              className={`r_puw-review_image`}
              // style={{backgroundImage: 'url("")'}}
              onError={(e) => {
                console.log("Image Loading Error");
                //@ts-ignore
                e.target?.parentElement.remove();
              }}
            ></img>
          </div>
          <div className={"r_puw-review-details-wrapper"}>
            <div className={"r_puw-review-details-name"}>Edward</div>
            <div className={"r_puw-review-details-name"}>
              <ReviewIcon />
              <ReviewIcon />
              <ReviewIcon />
              <ReviewIcon />
              <ReviewIcon />
            </div>
            <div
              title="nice snowboard, awesome"
              className={"r_puw-review-details-content"}
            >
              nice snowboard, awesome
            </div>
          </div>
          <div
            className={`r_puw-product_details_wrapper ${widget.show_product_thumbnail ? "" : "r_puw_hide"}`}
          >
            <div className={"r_puw-product_details-img_wrapper"}>
              <img
                src={
                  "https://cdn.shopify.com/s/files/1/0664/4262/5197/files/snowboard_sky_x50.png?v=1720513923"
                }
                alt={""}
                className={"r_puw-product_details-img"}
              />
            </div>
            <div
              title="The Compare at Price Snowboard"
              className={"r_puw-product_details-product_title"}
            >
              The Compare at Price S...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopupWidget;

