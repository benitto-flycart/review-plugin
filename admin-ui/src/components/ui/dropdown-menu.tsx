import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/src/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "frt-flex frt-cursor-default frt-select-none frt-items-center frt-rounded-sm frt-px-2 frt-py-1.5 frt-text-sm frt-outline-none focus:frt-bg-accent data-[state=open]:frt-bg-accent",
      inset && "frt-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="frt-ml-auto frt-h-4 frt-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "frt-z-50 frt-min-w-[8rem] frt-overflow-hidden frt-rounded-md frt-border frt-bg-popover frt-p-1 frt-text-popover-foreground frt-shadow-lg data-[state=open]:frt-animate-in data-[state=closed]:frt-animate-out data-[state=closed]:frt-fade-out-0 data-[state=open]:frt-fade-in-0 data-[state=closed]:frt-zoom-out-95 data-[state=open]:frt-zoom-in-95 data-[side=bottom]:frt-slide-in-from-top-2 data-[side=left]:frt-slide-in-from-right-2 data-[side=right]:frt-slide-in-from-left-2 data-[side=top]:frt-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "frt-z-50 frt-min-w-[8rem] frt-overflow-hidden frt-rounded-md frt-border frt-bg-popover frt-p-1 frt-text-popover-foreground frt-shadow-md",
        "data-[state=open]:frt-animate-in data-[state=closed]:frt-animate-out data-[state=closed]:frt-fade-out-0 data-[state=open]:frt-fade-in-0 data-[state=closed]:frt-zoom-out-95 data-[state=open]:frt-zoom-in-95 data-[side=bottom]:frt-slide-in-from-top-2 data-[side=left]:frt-slide-in-from-right-2 data-[side=right]:frt-slide-in-from-left-2 data-[side=top]:frt-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "frt-relative frt-flex frt-cursor-default frt-select-none frt-items-center frt-rounded-sm frt-px-2 frt-py-1.5 frt-text-sm frt-outline-none frt-transition-colors focus:frt-bg-accent focus:frt-text-accent-foreground data-[disabled]:frt-pointer-events-none data-[disabled]:frt-opacity-50",
      inset && "frt-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "frt-relative frt-flex frt-cursor-default frt-select-none frt-items-center frt-rounded-sm frt-py-1.5 frt-pl-8 frt-pr-2 frt-text-sm frt-outline-none frt-transition-colors focus:frt-bg-accent focus:frt-text-accent-foreground data-[disabled]:frt-pointer-events-none data-[disabled]:frt-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="frt-absolute frt-left-2 frt-flex frt-h-3.5 frt-w-3.5 frt-items-center frt-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="frt-h-4 frt-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "frt-relative frt-flex frt-cursor-default frt-select-none frt-items-center frt-rounded-sm frt-py-1.5 frt-pl-8 frt-pr-2 frt-text-sm frt-outline-none frt-transition-colors focus:frt-bg-accent focus:frt-text-accent-foreground data-[disabled]:frt-pointer-events-none data-[disabled]:frt-opacity-50",
      className
    )}
    {...props}
  >
    <span className="frt-absolute frt-left-2 frt-flex frt-h-3.5 frt-w-3.5 frt-items-center frt-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="frt-h-4 frt-w-4 frt-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "frt-px-2 frt-py-1.5 frt-text-sm frt-font-semibold",
      inset && "frt-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("frt--mx-1 frt-my-1 frt-h-px frt-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("frt-ml-auto frt-text-xs frt-tracking-widest frt-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
