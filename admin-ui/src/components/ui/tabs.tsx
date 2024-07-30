import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/src/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "frt-inline-flex frt-h-10 frt-items-center frt-justify-center frt-rounded-md frt-bg-muted frt-p-1 frt-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "frt-inline-flex frt-items-center frt-justify-center frt-whitespace-nowrap frt-rounded-sm frt-px-3 frt-py-1.5 frt-text-sm frt-font-medium frt-ring-offset-background frt-transition-all focus-visible:frt-outline-none focus-visible:frt-ring-2 focus-visible:frt-ring-ring focus-visible:frt-ring-offset-2 disabled:frt-pointer-events-none disabled:frt-opacity-50 data-[state=active]:frt-bg-background data-[state=active]:frt-text-foreground data-[state=active]:frt-shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "frt-mt-2 frt-ring-offset-background focus-visible:frt-outline-none focus-visible:frt-ring-2 focus-visible:frt-ring-ring focus-visible:frt-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
