import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/src/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "frt-peer frt-h-4 frt-w-4 frt-shrink-0 frt-rounded-sm frt-border frt-border-primary frt-shadow focus-visible:frt-outline-none focus-visible:frt-ring-1 focus-visible:frt-ring-ring disabled:frt-cursor-not-allowed disabled:frt-opacity-50 data-[state=checked]:frt-bg-primary data-[state=checked]:frt-text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("frt-flex frt-items-center frt-justify-center frt-text-current")}
    >
      <CheckIcon className="frt-h-4 frt-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
