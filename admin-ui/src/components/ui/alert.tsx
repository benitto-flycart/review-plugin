import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const alertVariants = cva(
  "frt-relative frt-w-full frt-rounded-lg frt-border frt-px-4 frt-py-3 frt-text-sm [&>svg+div]:frt-translate-y-[-3px] [&>svg]:frt-absolute [&>svg]:frt-left-4 [&>svg]:frt-top-4 [&>svg]:frt-text-foreground [&>svg~*]:frt-pl-7",
  {
    variants: {
      variant: {
        default: "frt-bg-background frt-text-foreground",
        destructive:
          "frt-border-destructive/50 frt-text-destructive dark:frt-border-destructive [&>svg]:frt-text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("frt-mb-1 frt-font-medium frt-leading-none frt-tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("frt-text-sm [&_p]:frt-leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
