import * as React from "react";
import {useLocalState} from "../zustand/localState";
import {useSearchParams} from "react-router-dom";
import {Tabs, TabsList, TabsTrigger} from "@/src/components/ui/tabs";
import {TabsContent} from "@radix-ui/react-tabs";
import BrandingSetting from "./BrandingSetting";
import GeneralSetting from "./GeneralSetting";
import DiscountSetting from "./DiscountSetting";

const Setting = () => {
  const { localState } = useLocalState();

  let searchParams: any, setSearchParams: any;

  [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("settings_tab");

  let defaultValue = "review_branding";

  return (
    <div>
      <div className="frt-border-b-gray-500 frt-rounded frt-py-4">
        <Tabs defaultValue={defaultValue} className="frt-gap-3">
          <TabsList className="frt-my-2">
            <TabsTrigger
              className="tabs-trigger frt-w-full"
              value="review_branding"
            >
              Branding
            </TabsTrigger>
            <TabsTrigger
              className="tabs-trigger frt-w-full"
              value="review_general"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              className="tabs-trigger frt-w-full"
              value="review_discounts"
            >
              Discounts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="review_branding" className="!frt-w-full">
            <BrandingSetting />
          </TabsContent>
          <TabsContent value="review_general" className="!frt-w-full">
            <GeneralSetting />
          </TabsContent>
          <TabsContent value="review_discounts" className="!frt-w-full">
            <DiscountSetting />
          </TabsContent>
        </Tabs>
      </div>
      <div></div>
    </div>
  );
};

export default Setting;
