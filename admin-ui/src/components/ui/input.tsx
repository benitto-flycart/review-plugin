import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "frt-flex frt-h-9 frt-w-full frt-rounded-md frt-border frt-border-input frt-bg-transparent frt-px-3 frt-py-1 frt-text-sm frt-shadow-sm frt-transition-colors file:frt-border-0 file:frt-bg-transparent file:frt-text-sm file:frt-font-medium placeholder:frt-text-muted-foreground focus-visible:frt-outline-none focus-visible:frt-ring-1 focus-visible:frt-ring-ring disabled:frt-cursor-not-allowed disabled:frt-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
