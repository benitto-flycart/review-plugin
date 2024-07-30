import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "frt-inline-flex frt-items-center frt-rounded-md frt-border frt-px-2.5 frt-py-0.5 frt-text-xs frt-font-semibold frt-transition-colors focus:frt-outline-none focus:frt-ring-2 focus:frt-ring-ring focus:frt-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "frt-border-transparent frt-bg-primary frt-text-primary-foreground frt-shadow hover:frt-bg-primary/80",
        secondary:
          "frt-border-transparent frt-bg-secondary frt-text-secondary-foreground hover:frt-bg-secondary/80",
        destructive:
          "frt-border-transparent frt-bg-destructive frt-text-destructive-foreground frt-shadow hover:frt-bg-destructive/80",
        outline: "frt-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
