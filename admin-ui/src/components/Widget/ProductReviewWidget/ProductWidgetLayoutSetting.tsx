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
                <div className="frt-bg-[#F2F4F6] frt-h-auto frt-w-auto frt-p-2 frt-flex frt-justify-center frt-items-center">
                  <i className="farp farp-grid  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
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
                <div className="frt-bg-[#F2F4F6] frt-h-auto frt-w-auto frt-p-2 frt-flex frt-justify-center frt-items-center">
                  <i className="farp farp-list  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
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
                <div className="frt-bg-[#F2F4F6] frt-h-auto frt-w-auto frt-p-2 frt-flex frt-justify-center frt-items-center">
                <i className="farp farp-mosaic frt-text-2xl"></i>
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
                <div className="frt-bg-[#F2F4F6] frt-h-auto frt-w-auto frt-p-2 frt-flex frt-justify-center frt-items-center">
                <i className="farp farp-minimal  frt-text-xs"></i>
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
                <div className="frt-bg-[#F2F4F6] frt-h-auto frt-w-auto frt-p-2 frt-flex frt-justify-center frt-items-center">
                <i className="farp farp-compact  frt-text-[38px]"></i>
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
                <div className="frt-bg-[#F2F4F6] frt-h-auto frt-w-auto frt-p-2 frt-flex frt-justify-center frt-items-center">
                <i className="farp farp-expanded  frt-text-2xl"></i>
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

