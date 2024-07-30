import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/src/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "frt-peer frt-inline-flex frt-h-6 frt-w-11 frt-shrink-0 frt-cursor-pointer frt-items-center frt-rounded-full frt-border-2 frt-border-transparent frt-transition-colors focus-visible:frt-outline-none focus-visible:frt-ring-2 focus-visible:frt-ring-ring focus-visible:frt-ring-offset-2 focus-visible:frt-ring-offset-background disabled:frt-cursor-not-allowed disabled:frt-opacity-50 data-[state=checked]:frt-bg-primary data-[state=unchecked]:frt-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "frt-pointer-events-none frt-block frt-h-5 frt-w-5 frt-rounded-full frt-bg-background frt-shadow-lg frt-ring-0 frt-transition-transform data-[state=checked]:frt-translate-x-5 data-[state=unchecked]:frt-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
