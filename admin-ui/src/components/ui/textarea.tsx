import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "frt-flex frt-min-h-[60px] frt-w-full frt-rounded-md frt-border frt-border-input frt-bg-transparent frt-px-3 frt-py-2 frt-text-sm frt-shadow-sm placeholder:frt-text-muted-foreground focus-visible:frt-outline-none focus-visible:frt-ring-1 focus-visible:frt-ring-ring disabled:frt-cursor-not-allowed disabled:frt-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
