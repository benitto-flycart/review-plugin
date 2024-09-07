import * as React from "react"
import { cn } from "@/src/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("frt-animate-pulse frt-rounded-md frt-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
