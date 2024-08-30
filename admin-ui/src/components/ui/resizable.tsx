import React from "react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/src/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "frt-flex frt-h-full frt-w-full data-[panel-group-direction=vertical]:frt-flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "frt-relative frt-flex frt-w-px frt-items-center frt-justify-center frt-bg-border after:frt-absolute after:frt-inset-y-0 after:frt-left-1/2 after:frt-w-1 after:frt--translate-x-1/2 focus-visible:frt-outline-none focus-visible:frt-ring-1 focus-visible:frt-ring-ring focus-visible:frt-ring-offset-1 data-[panel-group-direction=vertical]:frt-h-px data-[panel-group-direction=vertical]:frt-w-full data-[panel-group-direction=vertical]:after:frt-left-0 data-[panel-group-direction=vertical]:after:frt-h-1 data-[panel-group-direction=vertical]:after:frt-w-full data-[panel-group-direction=vertical]:after:frt--translate-y-1/2 data-[panel-group-direction=vertical]:after:frt-translate-x-0 [&[data-panel-group-direction=vertical]>div]:frt-rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="frt-z-10 frt-flex frt-h-4 frt-w-3 frt-items-center frt-justify-center frt-rounded-sm frt-border frt-bg-border">
        <DragHandleDots2Icon className="frt-h-2.5 frt-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
