import {Button} from "../ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";

import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/src/components/ui/carousel"
import {Card, CardContent} from "../ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu";
import {axiosClient} from "../api/axios";
import {AxiosResponse} from "axios";
import {toastrSuccess} from "../../helpers/ToastrHelper";
import {ApiErrorResponse} from "../api/api.types";
import {useLocalState} from "../zustand/localState";

interface ReviewDetailImageProps{
    review:any,
    getReviews:()=>void;
}
export  const ReviewDetailImage=<T extends ReviewDetailImageProps> ({review,getReviews}:T)=>{

    const [api, setApi] = React.useState<CarouselApi>()
    const {localState}=useLocalState()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const imageOptions=[
        {
            value: "view_photo",
            label:"View Photo"
        },
        {
            value: "download_photo",
            label:"Download Photo"
        },
        {
            value: "hide_photo",
            label:"Hide Photo"
        }
    ]
    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const imageOptionActions=(status:any)=>{
        const imageId=review.images[current].id;
        axiosClient.post(``, {
            method: "review_action",
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
            status:status,
            id:review.id
        }).then((response: AxiosResponse) => {
            const data:any = response.data.data
            toastrSuccess(data.message)
            getReviews();
        }).catch((error: AxiosResponse<ApiErrorResponse>) => {
            // @ts-ignore
            toastrError(getErrorMessage(error));
        }).finally(() => {

        })
    }
    return (
        <div
            className="frt-m-4 md:frt-w-[30%] frt-bg-gray-200 frt-p-4 frt-rounded-lg frt-relative">

            <div className="frt-flex frt-justify-between frt-items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"
                                className={"frt-absolute frt-right-2 frt-bg-white !frt-w-6 !frt-h-6"}>
                            <MoreHorizontal className="frt-h-4 frt-w-4 "/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"start"}>
                        {
                            imageOptions.map((option) => (
                                <DropdownMenuItem onClick={()=>{
                                    imageOptionActions(option.value)
                                }}
                                    className={"frt-flex frt-gap-x-1"}
                                    key={option.value}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="frt-flex frt-justify-center frt-items-center frt-h-64">
                <Carousel className="frt-w-full frt-max-w-xs" setApi={setApi}>
                    <CarouselContent>
                        {review.images.map((image: any, index: any) => {
                            return <CarouselItem key={index}>
                                <div className="frt-p-1">
                                    <Card>
                                        <CardContent
                                            className="frt-flex frt-aspect-square frt-items-center frt-justify-center frt-p-6">
                                            <img
                                                src={image.variants.full}
                                                alt={`Product image`}
                                                className="frt-max-h-full"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        })}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
        </div>

    )
}