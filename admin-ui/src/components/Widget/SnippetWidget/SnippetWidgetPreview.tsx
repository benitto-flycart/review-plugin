import React, {useContext, useEffect, useRef, useState} from "react";

import {SnippetWidgetContext} from "./SnippetWidgetContextAPI";
// import "./carosual.css";
import ReviewIcon from "../../ReviewIcon";
import {useLocalState} from "../../zustand/localState";
import {applyStylesToIframe} from "../../../helpers/utils";

const PreviewSnippetWidget = () => {
  const { widget, updateWidgetFields, methods } =
    useContext<any>(SnippetWidgetContext);
  const [index, setIndex] = useState<any>(0);
  const { localState } = useLocalState();
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      review_title: "First Title",
      reviewer_name: "BEnitto 1",
      is_verified: false,
      date: "31/03/2024",
      content:
        "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
      images: [
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg",
        },
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg",
        },
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg",
        },
      ],
    },
    {
      review_title: "First Title",
      reviewer_name: "Benitto 2",
      is_verified: false,
      date: "31/03/2024",
      content:
        "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
      images: [],
    },
    {
      review_title: "First Title",
      reviewer_name: "Benitto",
      is_verified: false,
      date: "31/03/2024",
      content:
        "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
      images: [
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg",
        },
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg",
        },
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg",
        },
      ],
    },
    {
      review_title: "First Title",
      reviewer_name: "Benitto 3",
      is_verified: false,
      date: "31/03/2024",
      content:
        "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
      images: [
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg",
        },
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/10kEcxhZV.jpg",
        },
        {
          id: 1,
          src: "https://images.loox.io/uploads/2024/1/31/S8Hp5oDh5ed.jpg",
        },
      ],
    },
    {
      review_title: "First Title",
      reviewer_name: "Benitto 4",
      is_verified: false,
      date: "31/03/2024",
      content:
        "Item 15 with lots of content to create a taller item lorem  ipsu Item 6 with lots of content to create a taller item lorem   ipsu Item 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsuItem 6 with lots of content to create a taller item lorem   ipsu",
      images: [],
    },
  ];

  const length = 3;

  const handlePrevious = () => {
    setIndex(index - 1);
    if (carouselRef.current && itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setIndex(index + 1);
    if (carouselRef.current && itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = true;
    });

    //@ts-ignore
    const iframe = window.frames["widget_preview_iframe"];
    if(widget.view=="desktop"){
      applyStylesToIframe(iframe, localState.iframe_styles?.snippet_widget,localState.iframe_styles?.font_css,true);
    }
else{
      applyStylesToIframe(iframe, localState.iframe_styles?.snippet_widget,localState.iframe_styles?.font_css,false);

    }
    updateWidgetFields((draftState: any) => {
      draftState.widget_loading = false;
    });
  }, [widget.layout]);


  const snippetWidgetContent = () => {
    return (
      <>
        <div
          className={"r_sw_admin_container_wrapper"}
          style={methods.getStyleVars()}
        >
          <div className="r_sw__carousel" ref={carouselRef}>
            {reviews.map((item: any, i: number) => {
              return (
                <div
                  key={i}
                  className={`r_sw__carousel-item r_sw__carousel-item-visible r_sw__admin_carousel-item`}
                  ref={itemRef}
                >
                  {widget.show_review_image && item.images?.length > 0 ? (
                    <React.Fragment>
                      <img
                        className={"r_sw__carousel-item_image"}
                        src={item.images[0].src}
                        alt="Alternative Text"
                        width={"50px"}
                        onError={(e) => {
                          //@ts-ignore
                          e?.target?.remove();
                        }}
                      />
                    </React.Fragment>
                  ) : null}
                  <div className={"r_sw__review_details_wrapper"}>
                    <div className={"r_sw__review_details"}>
                      <div className="r_sw__review_details--reviewer-name">
                        {item.reviewer_name}
                      </div>
                      {widget.show_rating ? (
                        <div className="r_sw__review_details_icons">
                          <ReviewIcon />
                          <ReviewIcon />
                          <ReviewIcon />
                          <ReviewIcon />
                          <ReviewIcon />
                        </div>
                      ) : null}
                    </div>
                    <div className={"r_sw__review_text "}>{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`r_sw__carousel-actions ${widget.hide_arrows_on_mobile && widget.view == "mobile" ? "r_sw__hide" : ""}`}
          >
            <button
              className={`${index == 0 ? "disabled" : ""} r_sw__carousel-button-prev`}
              disabled={index == 0}
              onClick={handlePrevious}
            >
              <i className="farp farp-caret-left"></i>
            </button>
            <button
              className={`${index == reviews.length - 1 ? "disabled" : ""} r_sw__carousel-button-next`}
              disabled={index == reviews.length - 1}
              onClick={handleNext}
            >
              <i className="farp farp-caret-right"></i>
            </button>
          </div>
        </div>
      </>
    );
  };
  return (
    <div
      className={`wd_snippet_preview wd_preview_content review-preview-wrap frt-flex frt-flex-col frt-gap-2 frt-min-h-[90vh] frt-relative ${widget.view == "mobile" ? "snippet-widget-preview-mobile" : "snippet-widget-preview-desktop"}`}
    >
      <div className={"r_sw__container_react r_sw__container"}>
        <div className={"r_sw__product_wrapper"}>
          <div className={"r_sw__product_img_wrapper"}>
            <img
              className={"r_sw__product_img"}
              src="https://unsplash.it/200/200"
              alt=""
            />
          </div>
          <div className={"r_sw_product_details_wrapper"}>
            <h2 className={"r_sw__product_title"}>Album</h2>
            <h2 className={"r_sw__product_price"}>price 20$</h2>
            <p className={"r_sw__product_description"}>
              This is a simple, Virtual Product
            </p>
            {widget.position_to_show == "woocommerce_before_add_to_cart_form"
              ? snippetWidgetContent()
              : null}
            {widget.position_to_show == "woocommerce_before_add_to_cart_button"
              ? snippetWidgetContent()
              : null}

            {widget.position_to_show ==
            "woocommerce_before_add_to_cart_quantity"
              ? snippetWidgetContent()
              : null}

            <input type={"number"} value={"1"} readOnly step={1} />

            {widget.position_to_show == "woocommerce_after_add_to_cart_quantity"
              ? snippetWidgetContent()
              : null}

            <button className={`r_sw__add_to_cart_button`}>Add to Cart</button>

            {widget.position_to_show == "woocommerce_after_add_to_cart_button"
              ? snippetWidgetContent()
              : null}

            {widget.position_to_show == "woocommerce_after_add_to_cart_form"
              ? snippetWidgetContent()
              : null}

            {widget.position_to_show == "woocommerce_product_meta_start"
              ? snippetWidgetContent()
              : null}

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>SKU: htr554yn </div>
              <div>Category: Bracelets </div>
              <div>Tags: tag1, tag2</div>
            </div>

            {widget.position_to_show == "woocommerce_product_meta_end"
              ? snippetWidgetContent()
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSnippetWidget;
