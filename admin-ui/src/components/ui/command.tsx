import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/src/lib/utils"
import { Dialog, DialogContent } from "@/src/components//ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "frt-flex frt-h-full frt-w-full frt-flex-col frt-overflow-hidden frt-rounded-md frt-bg-popover frt-text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="frt-overflow-hidden frt-p-0">
        <Command className="[&_[cmdk-group-heading]]:frt-px-2 [&_[cmdk-group-heading]]:frt-font-medium [&_[cmdk-group-heading]]:frt-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:frt-pt-0 [&_[cmdk-group]]:frt-px-2 [&_[cmdk-input-wrapper]_svg]:frt-h-5 [&_[cmdk-input-wrapper]_svg]:frt-w-5 [&_[cmdk-input]]:frt-h-12 [&_[cmdk-item]]:frt-px-2 [&_[cmdk-item]]:frt-py-3 [&_[cmdk-item]_svg]:frt-h-5 [&_[cmdk-item]_svg]:frt-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="frt-flex frt-items-center frt-border-b frt-px-3" cmdk-input-wrapper="">
    <MagnifyingGlassIcon className="frt-mr-2 frt-h-4 frt-w-4 frt-shrink-0 frt-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "frt-flex frt-h-10 frt-w-full frt-rounded-md frt-bg-transparent frt-py-3 frt-text-sm frt-outline-none placeholder:frt-text-muted-foreground disabled:frt-cursor-not-allowed disabled:frt-opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("frt-max-h-[300px] frt-overflow-y-auto frt-overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="frt-py-6 frt-text-center frt-text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "frt-overflow-hidden frt-p-1 frt-text-foreground [&_[cmdk-group-heading]]:frt-px-2 [&_[cmdk-group-heading]]:frt-py-1.5 [&_[cmdk-group-heading]]:frt-text-xs [&_[cmdk-group-heading]]:frt-font-medium [&_[cmdk-group-heading]]:frt-text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("frt--mx-1 frt-h-px frt-bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "frt-relative frt-flex frt-cursor-default frt-select-none frt-items-center frt-rounded-sm frt-px-2 frt-py-1.5 frt-text-sm frt-outline-none data-[disabled=true]:frt-pointer-events-none data-[selected=true]:frt-bg-accent data-[selected=true]:frt-text-accent-foreground data-[disabled=true]:frt-opacity-50",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "frt-ml-auto frt-text-xs frt-tracking-widest frt-text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
