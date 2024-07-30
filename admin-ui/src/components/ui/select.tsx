import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/src/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "frt-flex frt-h-10 frt-w-full frt-items-center frt-justify-between frt-rounded-md frt-border frt-border-input frt-bg-background frt-px-3 frt-py-2 frt-text-sm frt-ring-offset-background placeholder:frt-text-muted-foreground focus:frt-outline-none focus:frt-ring-2 focus:frt-ring-ring focus:frt-ring-offset-2 disabled:frt-cursor-not-allowed disabled:frt-opacity-50 [&>span]:frt-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="frt-h-4 frt-w-4 frt-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "frt-flex frt-cursor-default frt-items-center frt-justify-center frt-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="frt-h-4 frt-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "frt-flex frt-cursor-default frt-items-center frt-justify-center frt-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="frt-h-4 frt-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "frt-relative frt-z-50 frt-max-h-96 frt-min-w-[8rem] frt-overflow-hidden frt-rounded-md frt-border frt-bg-popover frt-text-popover-foreground frt-shadow-md data-[state=open]:frt-animate-in data-[state=closed]:frt-animate-out data-[state=closed]:frt-fade-out-0 data-[state=open]:frt-fade-in-0 data-[state=closed]:frt-zoom-out-95 data-[state=open]:frt-zoom-in-95 data-[side=bottom]:frt-slide-in-from-top-2 data-[side=left]:frt-slide-in-from-right-2 data-[side=right]:frt-slide-in-from-left-2 data-[side=top]:frt-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:frt-translate-y-1 data-[side=left]:frt--translate-x-1 data-[side=right]:frt-translate-x-1 data-[side=top]:frt--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "frt-p-1",
          position === "popper" &&
            "frt-h-[var(--radix-select-trigger-height)] frt-w-full frt-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("frt-py-1.5 frt-pl-8 frt-pr-2 frt-text-sm frt-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "frt-relative frt-flex frt-w-full frt-cursor-default frt-select-none frt-items-center frt-rounded-sm frt-py-1.5 frt-pl-8 frt-pr-2 frt-text-sm frt-outline-none focus:frt-bg-accent focus:frt-text-accent-foreground data-[disabled]:frt-pointer-events-none data-[disabled]:frt-opacity-50",
      className
    )}
    {...props}
  >
    <span className="frt-absolute frt-left-2 frt-flex frt-h-3.5 frt-w-3.5 frt-items-center frt-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="frt-h-4 frt-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("frt--mx-1 frt-my-1 frt-h-px frt-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
