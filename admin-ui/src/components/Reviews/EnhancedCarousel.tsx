'use client'

import * as React from "react";
// import Image from "next/image"; // Uncomment the import
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { cn } from "@/src/lib/utils";
import { set } from "react-hook-form";

interface EnhancedCarouselProps {
  images?: string[];
  api: CarouselApi | undefined;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | undefined>>; 
}

export default function EnhancedCarousel({ images, setApi, api }: EnhancedCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
      setCurrentIndex(index);
    },
    [api]
  );

  React.useEffect(() => {
    if (api) {
      onSelect();
      api.on("select", onSelect);
    }
  }, [api, onSelect]);

  return (
    <div className="frt-w-full frt-max-w-3xl frt-mx-auto frt-space-y-4">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {(images ?? []).map((src, index) => (
            <CarouselItem key={index}>
            <div className="frt-p-1">
              <Card>
                <CardContent className="frt-flex frt-aspect-square frt-items-center frt-justify-center frt-p-6">
                  <img src={src} alt={`Slide ${index + 1}`} width={600} height={400} className="frt-max-h-full" />
                </CardContent>
              </Card>
            </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="frt-flex frt-justify-center frt-space-x-2 frt-overflow-x-auto frt-py-2">
        {(images ?? []).map((src, index) => 
        {
            //  console.log("index: ",index, "current index: ", currentIndex);
        
        return (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "frt-p-0 frt-overflow-hidden",
              index === currentIndex && "frt-ring-primary frt-ring-offset-2 frt-bg-background"
            )}
            onClick={() => {
              scrollTo(index);
            //   console.log("button clicked", index);
              
            }}
          >
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              width={500}
              height={500}
              className={cn(
                "frt-object-cover frt-transition-opacity frt-duration-300",
                index === currentIndex ? "frt-opacity-100" : "frt-opacity-50"
              )}
            />
          </Button>
        )}
        )}
      </div>
    </div>
  );
}
