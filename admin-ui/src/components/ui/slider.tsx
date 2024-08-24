import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/src/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "frt-relative frt-flex frt-w-full frt-touch-none frt-select-none frt-items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="frt-relative frt-h-1.5 frt-w-full frt-grow frt-overflow-hidden frt-rounded-full frt-bg-primary/20">
      <SliderPrimitive.Range className="frt-absolute frt-h-full frt-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="frt-block frt-h-4 frt-w-4 frt-rounded-full frt-border frt-border-primary/50 frt-bg-background frt-shadow frt-transition-colors focus-visible:frt-outline-none focus-visible:frt-ring-1 focus-visible:frt-ring-ring disabled:frt-pointer-events-none disabled:frt-opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
