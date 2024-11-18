import React, { useContext } from "react";
import { ProductWidgetContext } from "./ProductReviewContextAPI";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import SidebarDetailWrapper from "../Sidebar/SidebarDetailWrapper";
import DetailHeading from "../Sidebar/DetailHeading";
import SidebarDetail from "../Sidebar/SidebarDetail";
import SidebarDetailSection from "../Sidebar/SidebarDetailSection";
import SidebarDetailField from "../Sidebar/SidebarDetailField";

const ProductWidgetStyleSetting = ({ name }: { name: string }) => {
  const { widget, updateWidgetFields } = useContext<any>(ProductWidgetContext);

  return (
    <SidebarDetailWrapper>
      <DetailHeading name={name} updateWidgetFields={updateWidgetFields} />
      <SidebarDetail>
        <SidebarDetailSection title={"Review Card Shadow"}>
          <SidebarDetailField>
            <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.style.review_card_shadow = "classic";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.style.review_card_shadow == "classic"}
                    value={"classic"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="none">
                    Classic
                  </Label>
                </div>
                <div>
                  <svg
                    style={{
                      boxShadow: "0 0 8px #00000040",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_e99jr_1 _svg__classic_e99jr_5"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="3.5"
                      fill="white"
                      stroke="#DCE3E9"
                    ></rect>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.style.review_card_shadow = "dark";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.style.review_card_shadow == "dark"}
                    value={"dark"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="nondark">
                    Dark
                  </Label>
                </div>
                <div>
                  <svg
                    style={{
                      boxShadow: "0 6px 14px #00000036",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_e99jr_1 _svg__dark_e99jr_8"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="3.5"
                      fill="white"
                      stroke="#DCE3E9"
                    ></rect>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.style.review_card_shadow = "light";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.style.review_card_shadow == "light"}
                    value={"light"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="nondark">
                    Light
                  </Label>
                </div>
                <div>
                  <svg
                    style={{
                      boxShadow: "0 6px 14px -4px #00000024",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_e99jr_1 _svg__light_e99jr_11"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="3.5"
                      fill="white"
                      stroke="#DCE3E9"
                    ></rect>
                  </svg>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.style.review_card_shadow = "none";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.style.review_card_shadow == "none"}
                    value={"none"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="none">
                    None
                  </Label>
                </div>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="_svg_e99jr_1"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="3.5"
                      fill="white"
                      stroke="#DCE3E9"
                    ></rect>
                  </svg>
                </div>
              </div>
            </div>
          </SidebarDetailField>
        </SidebarDetailSection>
        <SidebarDetailSection title={"Review Card Openers"}>
          <SidebarDetailField>
            <div className={"frt-grid frt-grid-cols-2 frt-gap-2"}>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    console.log("sharp rounded clicked");
                    draftState.style.review_card_openers = "sharp";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.style.review_card_openers == "sharp"}
                    value={"sharp"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="sharp">
                    Sharp
                  </Label>
                </div>
                <div>
                  <i className="farp farp-sharp frt-text-2xl !frt-font-bold"></i>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  console.log("slightly rounded clicked");
                  updateWidgetFields((draftState: any) => {
                    draftState.style.review_card_openers = "slightly_rounded";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={
                      widget.style.review_card_openers == "slightly_rounded"
                    }
                    value={"slightly_rounded"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="slightly_rounded">
                    Slightly Rounded
                  </Label>
                </div>
                <div>
                <i className="farp farp-slightly-rounded frt-text-2xl !frt-font-bold"></i>
                </div>
              </div>

              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    console.log("rounded clicked");
                    draftState.style.review_card_openers = "rounded";
                  });
                }}
              >
                <div>
                  <div className={"frt-flex frt-gap-1 frt-items-center"}>
                    <Checkbox
                      checked={widget.style.review_card_openers == "rounded"}
                      value={"rounded"}
                    />
                    <Label className={"frt-text-xs"} htmlFor="rounded">
                      Rounded
                    </Label>
                  </div>
                </div>
                <div>
                <i className="farp farp-rounded frt-text-2xl !frt-font-bold"></i>
                </div>
              </div>

              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    console.log("extra rounded clicked");
                    draftState.style.review_card_openers = "extra_rounded";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={
                      widget.style.review_card_openers == "extra_rounded"
                    }
                    value={"extra_rounded"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="extra_rounded">
                    Extra Rounded
                  </Label>
                </div>
                <div>
                <i className="farp farp-extra-rounded frt-text-2xl !frt-font-bold"></i>
                </div>
              </div>
              <div
                className={
                  "frt-cursor-pointer frt-rounded-xl frt-h-[100px] frt-text-center frt-border frt-border-black-100 frt-border-collapse frt-flex frt-flex-col frt-justify-center frt-items-center frt-gap-2"
                }
                onClick={() => {
                  updateWidgetFields((draftState: any) => {
                    draftState.style.review_card_openers = "none";
                  });
                }}
              >
                <div className={"frt-flex frt-gap-1 frt-items-center"}>
                  <Checkbox
                    checked={widget.style.review_card_openers == "none"}
                    value={"none"}
                  />
                  <Label className={"frt-text-xs"} htmlFor="extra_rounded">
                    None
                  </Label>
                </div>
              </div>
            </div>
          </SidebarDetailField>
        </SidebarDetailSection>
      </SidebarDetail>
    </SidebarDetailWrapper>
  );
};

export default ProductWidgetStyleSetting;
