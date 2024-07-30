import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { CardContent } from "@/src/components/ui/card";

export const SettingsSkeleton = () => {
  return (
    <>
      <CardContent className="rwt-flex rwt-gap-1 !rwt-p-0 rwt-w-full">
        <div className="rwt-w-1/2 rwt-p-2">
          <Skeleton className="!rwt-animate-rwt-pulse-0.5 rwt-h-20" />
        </div>
        <div className="rwt-w-1/2 rwt-p-2">
          <Skeleton className="!rwt-animate-rwt-pulse-0.5 rwt-h-20" />
        </div>
      </CardContent>
    </>
  );
};
