import React from "react";
import WidgetPreviewHeader from "./WidgetPreviewHeader";
import Frame from "react-frame-component";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { LoadingSpinner } from "../ui/loader";

const WidgetMainContentWrapper = ({
  children,
  widget,
  updateWidgetFields,
  currentLocale,
}: any) => {
  const sidePanelHeight = widget.view == "mobile" ? 30 : 0;

  return (
    <div
      className={
        "wd_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"
      }
    >
      <WidgetPreviewHeader
        widget={widget}
        updateWidgetFields={updateWidgetFields}
        currentLocale={currentLocale}
      />
      <ResizablePanelGroup
        direction="horizontal"
        key={`side_panel_key_${100 - sidePanelHeight}`}
      >
        <ResizablePanel
          defaultSize={sidePanelHeight}
          className="frt-flex frt-items-center frt-justify-center"
          style={{ writingMode: "vertical-lr", transform: "rotateZ(180deg)" }}
        >
          Adjust the width to check responsiveness
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={100 - sidePanelHeight * 2} minSize={20}>
          <div
            className={
              "wd_preview__main_content preview-widget wd_review_form_preview frt-relative"
            }
          >
            <div className={"frt-h-full"}>
              {widget.widget_loading ? <LoadingSpinner /> : null}
              <Frame
                className={`frt-h-full frt-w-full ${widget.widget_loading ? "frt-hidden" : null}`}
                id={"widget_preview_iframe"}
              >
                {children}
              </Frame>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={sidePanelHeight}
          className="frt-flex frt-items-center frt-justify-center"
          style={{ writingMode: "vertical-lr" }}
        >
          Adjust the width to check responsiveness
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default WidgetMainContentWrapper;

