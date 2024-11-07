import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import "@/src/styles/widgets/widget.css";
import { LoadingSpinner } from "../ui/loader";
import Frame from "react-frame-component";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

interface PreviewEmailDialogProps {
  show: boolean;
  toggle: (open: boolean) => void;
  loadingPreview: boolean;
  previewContent: any;
  title: string;
}
const PreviewEmailDialog = <T extends PreviewEmailDialogProps>({
  show,
  toggle,
  loadingPreview,
  previewContent,
  title,
}: T) => {
  const [view, setView] = useState("desktop");

  const sidePanelHeight = view == "mobile" ? 30 : 0;

  return (
    <Dialog open={show} onOpenChange={toggle}>
      <DialogContent
        className={
          "!frt-flex !frt-flex-col !frt-max-w-[1000px] frt-rounded-md frt-min-h-[600px] frt-z-[1000]"
        }
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
      >
        <div className="frt-flex frt-flex-row frt-justify-center frt-gap-2 frt-h-[30px]">
          <span
            className={`frt-cursor-pointer frt-p-1 frt-w-[30px] frt-rounded-xl ${view == "desktop" ? "frt-bg-gray-200" : null}`}
            onClick={() => {
              setView("desktop");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_5236_21393" fill="white">
                <path d="M2.07886 7.40888C2.07886 6.63078 2.70963 6 3.48774 6H20.67C21.4481 6 22.0789 6.63078 22.0789 7.40888V18H2.07886V7.40888Z"></path>
              </mask>
              <path
                d="M2.07886 7.40888C2.07886 6.63078 2.70963 6 3.48774 6H20.67C21.4481 6 22.0789 6.63078 22.0789 7.40888V18H2.07886V7.40888Z"
                stroke="#091218"
                strokeWidth="3"
                mask="url(#path-1-inside-1_5236_21393)"
              ></path>
              <rect
                x="23"
                y="18"
                width="22"
                height="1"
                rx="0.500001"
                transform="rotate(180 23 18)"
                fill="#091218"
              ></rect>
              <path
                d="M10 7H14V8.58236C14 8.81302 13.813 9 13.5824 9H10.4176C10.187 9 10 8.81302 10 8.58236V7Z"
                fill="#091218"
              ></path>
            </svg>
          </span>
          <span
            className={`frt-cursor-pointer frt-rounded-xl frt-p-1 frt-w-[30px] ${view == "mobile" ? "frt-bg-gray-200" : null}`}
            onClick={() => {
              setView("mobile");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="7.25"
                y="3.25"
                width="9.5"
                height="16.5"
                rx="1.75"
                stroke="#091218"
                strokeWidth="1.5"
              ></rect>
              <rect
                x="11"
                y="5"
                width="2"
                height="1"
                rx="0.5"
                fill="#091218"
              ></rect>
              <rect
                x="10"
                y="17"
                width="4"
                height="1"
                rx="0.5"
                fill="#091218"
              ></rect>
            </svg>
          </span>
        </div>
        <DialogTitle>
          <span>{title}</span>
        </DialogTitle>
        {loadingPreview ? (
          <LoadingSpinner />
        ) : (
          <>
            <ResizablePanelGroup
              direction="horizontal"
              key={`side_panel_key_${100 - sidePanelHeight}`}
            >
              <ResizablePanel
                defaultSize={sidePanelHeight}
                className="frt-flex frt-items-center frt-justify-center"
                style={{
                  writingMode: "vertical-lr",
                  transform: "rotateZ(180deg)",
                }}
              >
                Adjust the width to check responsiveness
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel
                defaultSize={100 - sidePanelHeight * 2}
                minSize={20}
              >
                <Frame className="frt-h-full frt-min-h-[600px] frt-w-full">
                  <div
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                  ></div>
                </Frame>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewEmailDialog;
