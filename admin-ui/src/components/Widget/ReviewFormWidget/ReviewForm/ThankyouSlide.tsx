import React, { useContext, useEffect } from "react";
import { ReviewFormWidgetContext } from "../ReviewFormWidgetContextAPI";

const ThankyouSlide = ({ handleNextClick }: any) => {
  const { widget, updateWidgetFields, methods } = useContext<any>(
    ReviewFormWidgetContext,
  );

  // const DEFAULT_COLOR = '#FFC700';
  const DEFAULT_COLOR = "purple";

  function random(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateSparkle(color: any) {
    return {
      id: String(random(10000, 99999)),
      createdAt: Date.now(),
      color: color,
      size: random(1, 50),
      style: {
        top: random(0, 100) + "%",
        left: random(0, 100) + "%",
      },
    };
  }

  function createSparkleElement(sparkle: any) {
    const sparkleWrapper = document.createElement("span");
    sparkleWrapper.classList.add("sparkle-wrapper");
    sparkleWrapper.style.top = sparkle.style.top;
    sparkleWrapper.style.left = sparkle.style.left;

    const sparkleSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    sparkleSvg.setAttribute("width", sparkle.size);
    sparkleSvg.setAttribute("height", sparkle.size);
    sparkleSvg.setAttribute("viewBox", "0 0 68 68");
    sparkleSvg.setAttribute("fill", "none");
    sparkleSvg.classList.add("sparkle-svg");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z",
    );
    path.setAttribute("fill", sparkle.color);

    sparkleSvg.appendChild(path);
    sparkleWrapper.appendChild(sparkleSvg);

    return sparkleWrapper;
  }

  function addSparkles(color = DEFAULT_COLOR) {
    const wrapper = document.getElementById("sparkle-wrapper");

    if (!wrapper) return;

    const sparkles = Array.from({ length: 50 }, () => generateSparkle(color));

    sparkles.forEach((sparkle) => {
      const sparkleElement = createSparkleElement(sparkle);
      wrapper.appendChild(sparkleElement);

      setTimeout(() => {
        wrapper.removeChild(sparkleElement);
      }, 5000);
    });

    // setInterval(() => {
    //     const sparkle = generateSparkle(color);
    //     const sparkleElement = createSparkleElement(sparkle);
    //     wrapper.appendChild(sparkleElement);
    //
    //     setTimeout(() => {
    //         wrapper.removeChild(sparkleElement);
    //     }, 750);
    // }, random(20, 30));
  }

  useEffect(() => {
    addSparkles();
  });

  return (
    <div
      className={"r_rfw_thank_you_slide_wrapper wrapper"}
      id="sparkle-wrapper"
    >
      <span className={"r_rfw_thank_you_title"}>{widget.thank_you.title}</span>
      <span className={"r_rfw_thank_you_description"}>
        {widget.thank_you.description}
      </span>
      <div className={"r_rfw_thank_you_discount_detail_wrapper"}>
        <p>{widget.thank_you.discount_info_title}</p>
        <span className={"r_rfw_thank_you_discount_code"}>[discount_code]</span>
        <span>{widget.thank_you.discount_info_description}</span>
      </div>
      <div className={"r_rfw_thank_you_proceed_next"}>
        <button className={"r_rfw_btn"} onClick={handleNextClick}>
          Review another item
        </button>
        <button className={"r_rfw_btn"}>Continue</button>
      </div>
    </div>
  );
};

export default ThankyouSlide;

