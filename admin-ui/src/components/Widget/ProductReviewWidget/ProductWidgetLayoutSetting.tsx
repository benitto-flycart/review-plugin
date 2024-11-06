import React, { useContext } from "react";
import { ProductWidgetContext } from "./ProductReviewContextAPI";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const ProductWidgetLayoutSetting = ({ name }: { name: string }) => {
  const { widget, updateWidgetFields } = useContext<any>(ProductWidgetContext);

  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields} />
      <SidebarDetail>
        <SidebarDetailSection title={"Widget Layout"}>
          <SidebarDetailField>
            <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.layout.widget_layout = "grid";
                  });
                }}
              >
                <div className="frt-flex frt-items-center frt-space-x-2">
                  <Checkbox
                    checked={widget.layout.widget_layout == "grid"}
                    value={"grid"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="widget-layout-list">
                    Grid
                  </Label>
                </div>
                <div>
                  <svg
                    width="72"
                    height="56"
                    viewBox="0 0 72 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_1cuzs_1"
                  >
                    <rect
                      opacity="0.1"
                      width="72"
                      height="56"
                      rx="2"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="8"
                      y="8"
                      width="11.751"
                      height="16.5129"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="8"
                      y="26.8721"
                      width="11.751"
                      height="16.5129"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M8 47C8 46.4477 8.44772 46 9 46H19C19.5523 46 20 46.4477 20 47V56H8V47Z"
                      fill="currentColor"
                    ></path>
                    <rect
                      x="22.689"
                      y="8"
                      width="11.751"
                      height="14.154"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="22.689"
                      y="24.5127"
                      width="11.751"
                      height="14.154"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M23 42C23 41.4477 23.4477 41 24 41H33C33.5523 41 34 41.4477 34 42V56H23V42Z"
                      fill="currentColor"
                    ></path>
                    <rect
                      x="37.5601"
                      y="8"
                      width="11.751"
                      height="16.5129"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="37.5603"
                      y="26.8721"
                      width="11.751"
                      height="16.5129"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M38 47C38 46.4477 38.4477 46 39 46H48C48.5523 46 49 46.4477 49 47V56H38V47Z"
                      fill="currentColor"
                    ></path>
                    <rect
                      x="52.249"
                      y="8"
                      width="11.751"
                      height="14.154"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="52.249"
                      y="24.5137"
                      width="11.751"
                      height="14.154"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M52 42C52 41.4477 52.4477 41 53 41H63C63.5523 41 64 41.4477 64 42V56H52V42Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.layout.widget_layout = "list";
                  });
                }}
              >
                <div className="frt-flex frt-items-center frt-space-x-2">
                  <Checkbox
                    checked={widget.layout.widget_layout == "list"}
                    value={"list"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="widget-layout-list">
                    List
                  </Label>
                </div>
                <div>
                  <svg
                    width="72"
                    height="56"
                    viewBox="0 0 72 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_1cuzs_1"
                  >
                    <rect
                      opacity="0.8"
                      width="72"
                      height="56"
                      rx="2"
                      fill="#EFF1F4"
                    ></rect>
                    <rect
                      x="10"
                      y="12"
                      width="52"
                      height="16"
                      rx="2"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="10"
                      y="30"
                      width="52"
                      height="16"
                      rx="2"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M10 50C10 48.8954 10.8954 48 12 48H60C61.1046 48 62 48.8954 62 50V56H10V50Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2k"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.layout.widget_layout = "mosaic";
                  });
                }}
              >
                <div className="frt-flex frt-items-center frt-space-x-2">
                  <Checkbox
                    checked={widget.layout.widget_layout == "mosaic"}
                    value={"mosaic"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="widget-layout-list">
                    Mosaic
                  </Label>
                </div>
                <div>
                  <svg
                    width="72"
                    height="56"
                    viewBox="0 0 72 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_1cuzs_1"
                  >
                    <rect
                      opacity="0.8"
                      width="72"
                      height="56"
                      rx="2"
                      fill="#EFF1F4"
                    ></rect>
                    <g clipPath="url(#clip0_6002_86738)">
                      <rect
                        x="11"
                        y="11"
                        width="24"
                        height="16"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="11"
                        y="29.5"
                        width="24"
                        height="18"
                        rx="1.06262"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="11"
                        y="50"
                        width="24"
                        height="15.68"
                        rx="1.06262"
                        fill="currentColor"
                      ></rect>
                    </g>
                    <g clipPath="url(#clip1_6002_86738)">
                      <rect
                        x="38"
                        y="11"
                        width="24"
                        height="8"
                        rx="1.06262"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="38"
                        y="21.5"
                        width="24"
                        height="24"
                        rx="1.06262"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="38"
                        y="48"
                        width="24"
                        height="16"
                        rx="1.06262"
                        fill="currentColor"
                      ></rect>
                    </g>
                    <defs>
                      <clipPath id="clip0_6002_86738">
                        <rect
                          width="24"
                          height="45"
                          fill="white"
                          transform="translate(11 11)"
                        ></rect>
                      </clipPath>
                      <clipPath id="clip1_6002_86738">
                        <rect
                          width="24"
                          height="45"
                          fill="white"
                          transform="translate(38 11)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </SidebarDetailField>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Widget Layout"}>
          <SidebarDetailField>
            <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.layout.header_layout = "minimal";
                  });
                }}
              >
                <div className="frt-flex frt-items-center frt-space-x-2">
                  <Checkbox
                    checked={widget.layout.header_layout == "minimal"}
                    value={"minimal"}
                  />
                  <Label
                    className={"frt-text-xs"}
                    htmlFor="header-minimal-list"
                  >
                    Minimal
                  </Label>
                </div>
                <div>
                  <svg
                    width="72"
                    height="56"
                    viewBox="0 0 72 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_1cuzs_1"
                  >
                    <rect
                      opacity="0.8"
                      width="72"
                      height="56"
                      rx="2"
                      fill="#EFF1F4"
                    ></rect>
                    <rect
                      opacity="0.5"
                      x="54"
                      y="14"
                      width="12"
                      height="4"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M10 12L11.3872 14.0907L13.8042 14.7639L12.2445 16.7293L12.3511 19.2361L10 18.36L7.64886 19.2361L7.75551 16.7293L6.19577 14.7639L8.61283 14.0907L10 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M19 12L20.3872 14.0907L22.8042 14.7639L21.2445 16.7293L21.3511 19.2361L19 18.36L16.6489 19.2361L16.7555 16.7293L15.1958 14.7639L17.6128 14.0907L19 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M28 12L29.3872 14.0907L31.8042 14.7639L30.2445 16.7293L30.3511 19.2361L28 18.36L25.6489 19.2361L25.7555 16.7293L24.1958 14.7639L26.6128 14.0907L28 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M37 12L38.3872 14.0907L40.8042 14.7639L39.2445 16.7293L39.3511 19.2361L37 18.36L34.6489 19.2361L34.7555 16.7293L33.1958 14.7639L35.6128 14.0907L37 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M46 12L47.3872 14.0907L49.8042 14.7639L48.2445 16.7293L48.3511 19.2361L46 18.36L43.6489 19.2361L43.7555 16.7293L42.1958 14.7639L44.6128 14.0907L46 12Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.layout.header_layout = "compact";
                  });
                }}
              >
                <div className="frt-flex frt-items-center frt-space-x-2">
                  <Checkbox
                    checked={widget.layout.header_layout == "compact"}
                    value={"compact"}
                  />
                  <Label
                    className={"frt-text-xs"}
                    htmlFor="header-compact-list"
                  >
                    Compact
                  </Label>
                </div>
                <div>
                  <svg
                    width="72"
                    height="56"
                    viewBox="0 0 72 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_1cuzs_1"
                  >
                    <rect
                      opacity="0.8"
                      width="72"
                      height="56"
                      rx="2"
                      fill="#EFF1F4"
                    ></rect>
                    <rect
                      opacity="0.5"
                      x="54"
                      y="14"
                      width="12"
                      height="4"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M10 12L11.3872 14.0907L13.8042 14.7639L12.2445 16.7293L12.3511 19.2361L10 18.36L7.64886 19.2361L7.75551 16.7293L6.19577 14.7639L8.61283 14.0907L10 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M19 12L20.3872 14.0907L22.8042 14.7639L21.2445 16.7293L21.3511 19.2361L19 18.36L16.6489 19.2361L16.7555 16.7293L15.1958 14.7639L17.6128 14.0907L19 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M28 12L29.3872 14.0907L31.8042 14.7639L30.2445 16.7293L30.3511 19.2361L28 18.36L25.6489 19.2361L25.7555 16.7293L24.1958 14.7639L26.6128 14.0907L28 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M37 12L38.3872 14.0907L40.8042 14.7639L39.2445 16.7293L39.3511 19.2361L37 18.36L34.6489 19.2361L34.7555 16.7293L33.1958 14.7639L35.6128 14.0907L37 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M46 12L47.3872 14.0907L49.8042 14.7639L48.2445 16.7293L48.3511 19.2361L46 18.36L43.6489 19.2361L43.7555 16.7293L42.1958 14.7639L44.6128 14.0907L46 12Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.layout.header_layout = "expanded";
                  });
                }}
              >
                <div className="frt-flex frt-items-center frt-space-x-2">
                  <Checkbox
                    checked={widget.layout.header_layout == "expanded"}
                    value={"expanded"}
                  />
                  <Label
                    className={"frt-text-xs"}
                    htmlFor="header-expanded-list"
                  >
                    Expanded
                  </Label>
                </div>
                <div>
                  <svg
                    width="72"
                    height="56"
                    viewBox="0 0 72 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_1cuzs_1"
                  >
                    <rect
                      opacity="0.8"
                      width="72"
                      height="56"
                      rx="2"
                      fill="#EFF1F4"
                    ></rect>
                    <path
                      d="M15 18L17.7743 22.1814L22.6085 23.5279L19.489 27.4586L19.7023 32.4721L15 30.72L10.2977 32.4721L10.511 27.4586L7.39155 23.5279L12.2257 22.1814L15 18Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M29.087 30.1193C28.5188 30.1193 28.0103 30.0128 27.5614 29.7997C27.1126 29.5838 26.756 29.2884 26.4918 28.9134C26.2305 28.5384 26.0913 28.1094 26.0742 27.6264H27.6083C27.6367 27.9844 27.7915 28.277 28.0728 28.5043C28.354 28.7287 28.6921 28.8409 29.087 28.8409C29.3967 28.8409 29.6722 28.7699 29.9137 28.6278C30.1552 28.4858 30.3455 28.2884 30.4847 28.0355C30.6239 27.7827 30.6921 27.4943 30.6893 27.1705C30.6921 26.8409 30.6225 26.5483 30.4805 26.2926C30.3384 26.0369 30.1438 25.8366 29.8967 25.6918C29.6495 25.544 29.3654 25.4702 29.0444 25.4702C28.783 25.4673 28.5259 25.5156 28.2731 25.6151C28.0202 25.7145 27.82 25.8452 27.6722 26.0071L26.2447 25.7727L26.7006 21.2727H31.7631V22.5938H28.0089L27.7575 24.9077H27.8086C27.9705 24.7173 28.1992 24.5597 28.4947 24.4347C28.7901 24.3068 29.114 24.2429 29.4663 24.2429C29.9947 24.2429 30.4663 24.3679 30.881 24.6179C31.2958 24.8651 31.6225 25.206 31.8612 25.6406C32.0998 26.0753 32.2191 26.5724 32.2191 27.1321C32.2191 27.7088 32.0856 28.223 31.8185 28.6747C31.5543 29.1236 31.1864 29.4773 30.7148 29.7358C30.2461 29.9915 29.7035 30.1193 29.087 30.1193ZM34.321 30.0938C34.0625 30.0938 33.8409 30.0028 33.6562 29.821C33.4716 29.6392 33.3807 29.4176 33.3835 29.1562C33.3807 28.9006 33.4716 28.6818 33.6562 28.5C33.8409 28.3182 34.0625 28.2273 34.321 28.2273C34.571 28.2273 34.7884 28.3182 34.973 28.5C35.1605 28.6818 35.2557 28.9006 35.2585 29.1562C35.2557 29.3295 35.2102 29.4872 35.1222 29.6293C35.0369 29.7713 34.9233 29.8849 34.7812 29.9702C34.642 30.0526 34.4886 30.0938 34.321 30.0938ZM39.7202 30.1662C39.0185 30.1662 38.4162 29.9886 37.9134 29.6335C37.4134 29.2756 37.0284 28.7599 36.7585 28.0866C36.4915 27.4105 36.358 26.5966 36.358 25.6449C36.3608 24.6932 36.4957 23.8835 36.7628 23.2159C37.0327 22.5455 37.4176 22.0341 37.9176 21.6818C38.4205 21.3295 39.0213 21.1534 39.7202 21.1534C40.419 21.1534 41.0199 21.3295 41.5227 21.6818C42.0256 22.0341 42.4105 22.5455 42.6776 23.2159C42.9474 23.8864 43.0824 24.696 43.0824 25.6449C43.0824 26.5994 42.9474 27.4148 42.6776 28.0909C42.4105 28.7642 42.0256 29.2784 41.5227 29.6335C41.0227 29.9886 40.4219 30.1662 39.7202 30.1662ZM39.7202 28.8324C40.2656 28.8324 40.696 28.5639 41.0114 28.027C41.3295 27.4872 41.4886 26.6932 41.4886 25.6449C41.4886 24.9517 41.4162 24.3693 41.2713 23.8977C41.1264 23.4261 40.9219 23.071 40.6577 22.8324C40.3935 22.5909 40.081 22.4702 39.7202 22.4702C39.1776 22.4702 38.7486 22.7401 38.4332 23.2798C38.1179 23.8168 37.9588 24.6051 37.956 25.6449C37.9531 26.3409 38.0227 26.9261 38.1648 27.4006C38.3097 27.875 38.5142 28.233 38.7784 28.4744C39.0426 28.7131 39.3565 28.8324 39.7202 28.8324Z"
                      fill="currentColor"
                    ></path>
                    <g opacity="0.5">
                      <rect
                        x="48"
                        y="20"
                        width="17"
                        height="12"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </SidebarDetailField>
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default ProductWidgetLayoutSetting;

