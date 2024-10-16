import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import "@/src/styles/widgets/widget.css";
import { LoadingSpinner } from "../ui/loader";
import Frame from "react-frame-component";

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
  return (
    <Dialog open={show} onOpenChange={toggle}>
      <DialogContent
        className={"frt-rounded-md frt-min-h-[600px] "}
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
      >
        {" "}
        {loadingPreview ? (
          <LoadingSpinner />
        ) : (
          <>
            <DialogTitle>
              <span>{title}</span>
            </DialogTitle>
            <Frame className="frt-h-full frt-min-h-[600px] frt-w-full">
              <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
            </Frame>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewEmailDialog;
