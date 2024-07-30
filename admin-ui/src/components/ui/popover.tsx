import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/src/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "frt-z-50 frt-w-72 frt-rounded-md frt-border frt-bg-popover frt-p-4 frt-text-popover-foreground frt-shadow-md frt-outline-none data-[state=open]:frt-animate-in data-[state=closed]:frt-animate-out data-[state=closed]:frt-fade-out-0 data-[state=open]:frt-fade-in-0 data-[state=closed]:frt-zoom-out-95 data-[state=open]:frt-zoom-in-95 data-[side=bottom]:frt-slide-in-from-top-2 data-[side=left]:frt-slide-in-from-right-2 data-[side=right]:frt-slide-in-from-left-2 data-[side=top]:frt-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
