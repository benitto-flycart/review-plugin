import React, { useEffect, useState } from "react";
import { useLocalState } from "../zustand/localState";
import "../../main.css";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Branding from "./Branding";
import Setting from "./Setting";

const EmailSetting = () => {
  const { localState, setLocalState } = useLocalState();
  const [currentTab, setCurrentTab] = useState<string>("branding");
  const [loading, setLoading] = useState<boolean>(false);

  const availableLanguages = localState.available_languages;

  const handleTabChange = (value: string) => {
    setLoading(true);
    setCurrentTab(value);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
      <Tabs
        defaultValue="branding"
        className="frt-gap-3"
        onValueChange={handleTabChange}
      >
        <TabsList className="frt-my-2">
          <TabsTrigger className="tabs-trigger frt-w-full" value="branding">
            Branding
          </TabsTrigger>
          <TabsTrigger className="tabs-trigger frt-w-full" value="general">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="branding" className="!frt-w-full">
          <Branding />
        </TabsContent>
        <TabsContent value="general" className="!frt-w-full">
          <Setting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailSetting;
