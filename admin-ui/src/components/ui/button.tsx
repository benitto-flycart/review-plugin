import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "frt-inline-flex frt-items-center frt-justify-center frt-whitespace-nowrap frt-rounded-md frt-text-sm frt-font-medium frt-ring-offset-background frt-transition-colors focus-visible:frt-outline-none focus-visible:frt-ring-2 focus-visible:frt-ring-ring focus-visible:frt-ring-offset-2 disabled:frt-pointer-events-none disabled:frt-opacity-50",
  {
    variants: {
      variant: {
        default: "frt-bg-primary frt-text-primary-foreground hover:frt-bg-primary/90",
        destructive:
          "frt-bg-destructive frt-text-destructive-foreground hover:frt-bg-destructive/90",
        outline:
          "frt-border frt-border-input frt-bg-background hover:frt-bg-accent hover:frt-text-accent-foreground",
        secondary:
          "frt-bg-secondary frt-text-secondary-foreground hover:frt-bg-secondary/80",
        ghost: "hover:frt-bg-accent hover:frt-text-accent-foreground",
        link: "frt-text-primary frt-underline-offset-4 hover:frt-underline",
      },
      size: {
        default: "frt-h-10 frt-px-4 frt-py-2",
        sm: "frt-h-9 frt-rounded-md frt-px-3",
        lg: "frt-h-11 frt-rounded-md frt-px-8",
        icon: "frt-h-10 frt-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
