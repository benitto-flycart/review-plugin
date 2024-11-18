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
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.colors.type == "dark_text"}
                    value={"dark_text"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="none">
                    Dark Text
                  </Label>
                </div>
                <div>
                  <i className="farp farp-dark !frt-text-3xl"></i>
                  {/* <svg
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
                  </svg> */}
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
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.colors.type == "light_text"}
                    value={"light_text"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="light_text">
                    Light Text
                  </Label>
                </div>
                <div>
                  <i className="farp farp-light !frt-text-3xl"></i>
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
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.colors.type == "custom"}
                    value={"custom"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="nondark">
                    Custom
                  </Label>
                </div>
                <div>
                  <i className="farp farp-custom !frt-text-3xl"></i>
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

