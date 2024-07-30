import * as React from "react";
import {useLocalState} from "../zustand/localState";
import {useSearchParams} from "react-router-dom";
import {Tabs, TabsList, TabsTrigger} from "@/src/components/ui/tabs";
import {TabsContent} from "@radix-ui/react-tabs";
import BrandingSetting from "./BrandingSetting";
import GeneralSetting from "./GeneralSetting";
import EmailSetting from "../EmailSetting";
import ManualReviewRequestForm from "./ManualReviewRequestForm";
import DiscountSetting from "./DiscountSetting";


const Setting = () => {
    const {localState} = useLocalState();

    let searchParams: any, setSearchParams: any;

    [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("settings_tab");

    let defaultValue = "review_branding";

    return (
        <div>
            <div className="frt-border-b-gray-500 frt-rounded frt-py-4">
                <Tabs defaultValue={defaultValue} className="frt-w-full frt-flex frt-gap-3" orientation={"vertical"}>
                    <TabsList className="frt-flex frt-flex-col !frt-items-start !frt-justify-start frt-space-x-0">
                        <TabsTrigger className="tabs-trigger frt-w-full" value="review_branding">
                            Branding
                        </TabsTrigger>
                        <TabsTrigger className="tabs-trigger frt-w-full" value="review_general">
                            General
                        </TabsTrigger>
                        <TabsTrigger className="tabs-trigger frt-w-full" value="review_discounts">
                            Discounts
                        </TabsTrigger>
                        <TabsTrigger className="tabs-trigger frt-w-full" value="review_manual_form">
                            Manual Review Request Form
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="review_branding" className="!frt-w-full frt-px-4">
                        <BrandingSetting/>
                    </TabsContent>
                    <TabsContent value="review_general" className="!frt-w-full frt-px-4">
                        <GeneralSetting/>
                    </TabsContent>
                    <TabsContent value="review_discounts" className="!frt-w-full frt-px-4">
                        <DiscountSetting/>
                    </TabsContent>
                    <TabsContent value="review_manual_form" className="!frt-w-full frt-px-4">
                        <ManualReviewRequestForm/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Setting;
