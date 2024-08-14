import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/src/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "frt-fixed frt-inset-0 frt-z-50 frt-bg-black/80 frt- data-[state=open]:frt-animate-in data-[state=closed]:frt-animate-out data-[state=closed]:frt-fade-out-0 data-[state=open]:frt-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "frt-fixed frt-left-[50%] frt-top-[50%] frt-z-50 frt-grid frt-w-full frt-max-w-lg frt-translate-x-[-50%] frt-translate-y-[-50%] frt-gap-4 frt-border frt-bg-background frt-p-6 frt-shadow-lg frt-duration-200 data-[state=open]:frt-animate-in data-[state=closed]:frt-animate-out data-[state=closed]:frt-fade-out-0 data-[state=open]:frt-fade-in-0 data-[state=closed]:frt-zoom-out-95 data-[state=open]:frt-zoom-in-95 data-[state=closed]:frt-slide-out-to-left-1/2 data-[state=closed]:frt-slide-out-to-top-[48%] data-[state=open]:frt-slide-in-from-left-1/2 data-[state=open]:frt-slide-in-from-top-[48%] sm:frt-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="frt-absolute frt-right-4 frt-top-4 frt-rounded-sm frt-opacity-70 frt-ring-offset-background frt-transition-opacity hover:frt-opacity-100 focus:frt-outline-none focus:frt-ring-2 focus:frt-ring-ring focus:frt-ring-offset-2 disabled:frt-pointer-events-none data-[state=open]:frt-bg-accent data-[state=open]:frt-text-muted-foreground">
        <Cross2Icon className="frt-h-4 frt-w-4" />
        <span className="frt-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "frt-flex frt-flex-col frt-space-y-1.5 frt-text-center sm:frt-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "frt-flex frt-flex-col-reverse sm:frt-flex-row sm:frt-justify-end sm:frt-space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "frt-text-lg frt-font-semibold frt-leading-none frt-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("frt-text-sm frt-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
