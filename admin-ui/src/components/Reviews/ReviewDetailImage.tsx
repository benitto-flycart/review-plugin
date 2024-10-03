import {Button} from "../ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/src/components/ui/carousel"
import {Card, CardContent} from "../ui/card";

interface ReviewDetailImageProps{
    review:any
}
export  const ReviewDetailImage=<T extends ReviewDetailImageProps> ({review}:T)=>{

    const prevImage = () => {

    }
    const nextImage = () => {

    }
    return (
        <div
            className="frt-m-4 frt-w-[30%] frt-bg-gray-200 frt-p-4 frt-rounded-lg frt-relative">
            <Button variant="ghost" size="icon"
                    className={"frt-absolute frt-right-2 frt-bg-white !frt-w-6 !frt-h-6"}>
                <MoreHorizontal className="frt-h-4 frt-w-4 "/>
            </Button>
            <div className="frt-flex frt-justify-center frt-items-center frt-h-64">
                <Carousel className="frt-w-full frt-max-w-xs">
                    <CarouselContent>
                        {review.images.map((image:any, index:any) => {
                            return<CarouselItem key={index}>
                                <div className="frt-p-1">
                                    <Card>
                                        <CardContent
                                            className="frt-flex frt-aspect-square frt-items-center frt-justify-center frt-p-6">
                                            <img
                                                src={image.variants.full}
                                                alt={`Product image `}
                                                className="frt-max-h-full"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
        </div>

    )
}