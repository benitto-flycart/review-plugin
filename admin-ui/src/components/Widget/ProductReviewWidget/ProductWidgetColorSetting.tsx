import React, { useContext } from "react";
import { ProductWidgetContext } from "./ProductReviewContextAPI";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import { WIDGET_COLOR_DEFAULTS } from "./Preview/preview-constants";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailField from "../Sidebar/SidebarDetailField";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";

const ProductWidgetColorSetting = ({ name }: { name: string }) => {
  const { widget, updateWidgetFields } = useContext<any>(ProductWidgetContext);
  const { colors } = widget;

  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields} />
      <SidebarDetail>
        <SidebarDetailSection title={"Widget Colors"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors = {
                      type: "dark_text",
                      ...WIDGET_COLOR_DEFAULTS["dark_text"],
                    };
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1"}>
                  <Checkbox
                    checked={widget.colors.type == "dark_text"}
                    value={"dark_text"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="none">
                    Dark Text
                  </Label>
                </div>
                <div>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_ebs72_1"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="25"
                      height="25"
                      rx="4.5"
                      fill="white"
                      stroke="#778088"
                    ></rect>
                    <path
                      d="M9.70021 10.9865L13 7.66699L16.2999 10.9865C18.1223 12.8197 18.1223 15.7921 16.2999 17.6254C14.4774 19.4586 11.5227 19.4586 9.70021 17.6254C7.87776 15.7921 7.87776 12.8197 9.70021 10.9865Z"
                      fill="#091218"
                    ></path>
                  </svg>
                </div>
              </div>
            </SidebarDetailField>
            <SidebarDetailField>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors = {
                      type: "light_text",
                      ...WIDGET_COLOR_DEFAULTS["light_text"],
                    };
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1"}>
                  <Checkbox
                    checked={widget.colors.type == "light_text"}
                    value={"light_text"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="light_text">
                    Light Text
                  </Label>
                </div>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_ebs72_1"
                  >
                    <rect width="24" height="24" rx="4" fill="#091218"></rect>
                    <path
                      d="M8.70015 9.98645L12 6.66699L15.2998 9.98645C17.1223 11.8197 17.1223 14.7921 15.2998 16.6254C13.4773 18.4586 10.5226 18.4586 8.70015 16.6254C6.8777 14.7921 6.8777 11.8197 8.70015 9.98645Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
              </div>
            </SidebarDetailField>
            <SidebarDetailField>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1"}>
                  <Checkbox
                    checked={widget.colors.type == "custom"}
                    value={"custom"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="nondark">
                    Custom
                  </Label>
                </div>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_ebs72_1"
                  >
                    <g clipPath="url(#clip0_5848_86970)">
                      <g filter="url(#filter0_b_5848_86970)">
                        <rect
                          width="24"
                          height="24"
                          rx="4"
                          fill="#2D00E2"
                        ></rect>
                      </g>
                      <g filter="url(#filter1_f_5848_86970)">
                        <ellipse
                          cx="4.70948"
                          cy="8.9622"
                          rx="4.70948"
                          ry="8.9622"
                          transform="matrix(-0.645966 0.765166 0.412867 0.909632 -2.7998 -5.69531)"
                          fill="white"
                        ></ellipse>
                      </g>
                      <g filter="url(#filter2_f_5848_86970)">
                        <ellipse
                          cx="5.66597"
                          cy="11.4728"
                          rx="5.66597"
                          ry="11.4728"
                          transform="matrix(0.303059 0.952118 0.769149 -0.641217 4.34839 4.5332)"
                          fill="#FF584E"
                        ></ellipse>
                      </g>
                      <g filter="url(#filter3_f_5848_86970)">
                        <ellipse
                          cx="5.58832"
                          cy="11.7338"
                          rx="5.58832"
                          ry="11.7338"
                          transform="matrix(-0.339589 0.941515 0.729863 0.681553 16.2162 8.8418)"
                          fill="white"
                        ></ellipse>
                      </g>
                      <g filter="url(#filter4_f_5848_86970)">
                        <ellipse
                          cx="3.9372"
                          cy="5.16419"
                          rx="3.9372"
                          ry="5.16419"
                          transform="matrix(-0.645966 0.765166 0.412867 0.909632 5.96021 10.1445)"
                          fill="#FF584E"
                        ></ellipse>
                      </g>
                      <g filter="url(#filter5_f_5848_86970)">
                        <ellipse
                          cx="3.9372"
                          cy="10.2077"
                          rx="3.9372"
                          ry="10.2077"
                          transform="matrix(-0.645966 0.765166 0.412867 0.909632 14.8473 15.2793)"
                          fill="#FF8975"
                        ></ellipse>
                      </g>
                      <g filter="url(#filter6_f_5848_86970)">
                        <ellipse
                          cx="4.2256"
                          cy="8.38416"
                          rx="4.2256"
                          ry="8.38416"
                          transform="matrix(-0.524494 -0.849944 -0.529242 0.849944 2.95886 20.4375)"
                          fill="#DB7260"
                        ></ellipse>
                      </g>
                      <g style={{ mixBlendMode: "hard-light" }}>
                        <g filter="url(#filter7_f_5848_86970)">
                          <ellipse
                            cx="4.70948"
                            cy="8.9622"
                            rx="4.70948"
                            ry="8.9622"
                            transform="matrix(-0.645966 0.765166 0.412867 0.909632 -2.80042 -5.69434)"
                            fill="white"
                          ></ellipse>
                        </g>
                        <g filter="url(#filter8_f_5848_86970)">
                          <ellipse
                            cx="4.70948"
                            cy="4.2887"
                            rx="4.70948"
                            ry="4.2887"
                            transform="matrix(-0.645966 0.765166 0.412867 0.909632 3.38538 4.50293)"
                            fill="#D65757"
                          ></ellipse>
                        </g>
                        <g filter="url(#filter9_f_5848_86970)">
                          <ellipse
                            cx="10.4588"
                            cy="14.3094"
                            rx="10.4588"
                            ry="14.3094"
                            transform="matrix(0.161098 0.986481 0.919023 -0.396774 -0.796143 -5.55176)"
                            fill="#CFD0DA"
                          ></ellipse>
                        </g>
                        <g filter="url(#filter10_f_5848_86970)">
                          <ellipse
                            cx="3.9372"
                            cy="7.64088"
                            rx="3.9372"
                            ry="7.64088"
                            transform="matrix(-0.645966 0.765166 0.412867 0.909632 5.96033 10.1445)"
                            fill="white"
                          ></ellipse>
                        </g>
                        <g filter="url(#filter11_f_5848_86970)">
                          <ellipse
                            cx="3.9372"
                            cy="10.2077"
                            rx="3.9372"
                            ry="10.2077"
                            transform="matrix(-0.645966 0.765166 0.412867 0.909632 10.4982 15.2803)"
                            fill="#FF8975"
                          ></ellipse>
                        </g>
                        <g filter="url(#filter12_f_5848_86970)">
                          <ellipse
                            cx="4.2256"
                            cy="10.26"
                            rx="4.2256"
                            ry="10.26"
                            transform="matrix(-0.524494 -0.849944 -0.529242 0.849944 4.94458 17.249)"
                            fill="#D65757"
                          ></ellipse>
                        </g>
                      </g>
                    </g>
                    <path
                      d="M8.70021 9.98645L12 6.66699L15.2999 9.98645C17.1223 11.8197 17.1223 14.7921 15.2999 16.6254C13.4774 18.4586 10.5227 18.4586 8.70021 16.6254C6.87776 14.7921 6.87776 11.8197 8.70021 9.98645Z"
                      fill="white"
                    ></path>
                    <defs>
                      <filter
                        id="filter0_b_5848_86970"
                        x="-4"
                        y="-4"
                        width="32"
                        height="32"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feGaussianBlur
                          in="BackgroundImageFix"
                          stdDeviation="2"
                        ></feGaussianBlur>
                        <feComposite
                          in2="SourceAlpha"
                          operator="in"
                          result="effect1_backgroundBlur_5848_86970"
                        ></feComposite>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_backgroundBlur_5848_86970"
                          result="shape"
                        ></feBlend>
                      </filter>
                      <filter
                        id="filter1_f_5848_86970"
                        x="-15.8823"
                        y="-11.8046"
                        width="27.481"
                        height="35.7304"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="4.47507"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter2_f_5848_86970"
                        x="-3.05182"
                        y="-15.5019"
                        width="35.8833"
                        height="36.1464"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="4.47507"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter3_f_5848_86970"
                        x="-2.33663"
                        y="-3.91915"
                        width="50.4384"
                        height="52.0395"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="8.22276"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter4_f_5848_86970"
                        x="-14.2153"
                        y="-4.17208"
                        width="39.5287"
                        height="44.0531"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="8.22276"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter5_f_5848_86970"
                        x="2.6452"
                        y="8.86236"
                        width="27.7465"
                        height="37.4296"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="4.47507"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter6_f_5848_86970"
                        x="-25.1013"
                        y="-0.455278"
                        width="42.8131"
                        height="48.8549"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="8.22276"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter7_f_5848_86970"
                        x="-23.3783"
                        y="-19.299"
                        width="42.4717"
                        height="50.7211"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="8.22276"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter8_f_5848_86970"
                        x="-12.3703"
                        y="-4.26641"
                        width="28.9684"
                        height="32.5484"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="5.48184"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter9_f_5848_86970"
                        x="-8.17035"
                        y="-21.6406"
                        width="44.4196"
                        height="41.4579"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="4.47507"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter10_f_5848_86970"
                        x="-8.44427"
                        y="1.5666"
                        width="30.032"
                        height="37.0816"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="5.48184"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter11_f_5848_86970"
                        x="-1.70392"
                        y="8.86334"
                        width="27.7465"
                        height="37.4296"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="4.47507"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <filter
                        id="filter12_f_5848_86970"
                        x="-25.0136"
                        y="-3.50118"
                        width="44.6238"
                        height="51.7582"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          stdDeviation="8.22276"
                          result="effect1_foregroundBlur_5848_86970"
                        ></feGaussianBlur>
                      </filter>
                      <clipPath id="clip0_5848_86970">
                        <rect width="24" height="24" rx="4" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Widget Wrapper"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Background color
              </Label>
              <PopOverColorPicker
                color={colors.widget_wrapper ?? ""}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.widget_wrapper = color;
                  });
                }}
              />
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Header"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Text & Icon Color
              </Label>
              <PopOverColorPicker
                color={colors.header.text_and_icon_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.header.text_and_icon_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Bar Fill
              </Label>
              <PopOverColorPicker
                color={colors.header.bar_fill_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.header.bar_fill_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Bar background
              </Label>
              <PopOverColorPicker
                color={colors.header.bar_bg_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.header.bar_bg_color = color;
                  });
                }}
              />
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Buttons"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Text{" "}
              </Label>
              <PopOverColorPicker
                color={colors.button.text_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.button.text_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Text Hover
              </Label>
              <PopOverColorPicker
                color={colors.button.text_hover_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.button.text_hover_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Background Hover
              </Label>
              <PopOverColorPicker
                color={colors.button.bg_hover_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.button.bg_hover_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Background
              </Label>
              <PopOverColorPicker
                color={colors.button.bg_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.button.bg_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Border
              </Label>
              <PopOverColorPicker
                color={colors.button.border_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.button.border_color = color;
                  });
                }}
              />
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Reviews"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Text
              </Label>
              <PopOverColorPicker
                color={colors.reviews.text_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.reviews.text_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Background
              </Label>
              <PopOverColorPicker
                color={colors.reviews.bg_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.reviews.bg_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Background Hover
              </Label>
              <PopOverColorPicker
                color={colors.reviews.bg_hover_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.reviews.bg_hover_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Shadow Color
              </Label>
              <PopOverColorPicker
                color={colors.reviews.shadow_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.reviews.shadow_color = color;
                  });
                }}
              />
            </SidebarDetailField>

            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Separator Color
              </Label>
              <PopOverColorPicker
                color={colors.reviews.separator_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.reviews.separator_color = color;
                  });
                }}
              />
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Replies"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Text
              </Label>
              <PopOverColorPicker
                color={colors.replies.text_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.replies.text_color = color;
                  });
                }}
              />
            </SidebarDetailField>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Background
              </Label>
              <PopOverColorPicker
                color={colors.replies.bg_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.replies.bg_color = color;
                  });
                }}
              />
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>

        <SidebarDetailSection title={"Verified Badge"}>
          <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
            <SidebarDetailField>
              <Label className={"frt-text-xs"} htmlFor="none">
                Icon Color
              </Label>
              <PopOverColorPicker
                color={colors.verified_badge.icon_color}
                onChange={(color: string) => {
                  updateWidgetFields((draftState: any) => {
                    draftState.colors.type = "custom";
                    draftState.colors.verified_badge.icon_color = color;
                  });
                }}
              />
            </SidebarDetailField>
          </div>
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default ProductWidgetColorSetting;

