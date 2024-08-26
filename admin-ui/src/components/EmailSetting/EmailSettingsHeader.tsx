import React from "react";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "../ui/alert";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../ui/select";
import {useLocalState} from "../zustand/localState";

const EmailSettingsHeader = ({locale}: any) => {
    const {localState} = useLocalState();

    const available_languages = localState.available_languages;

    const currentLanguage = available_languages.find((item: any) => item.value === locale);

    return (
        <Alert>
            <AlertCircle className="frt-h-4 frt-w-4"/>
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
                <div className={"frt-flex frt-flex-col frt-gap-2"}>
                    <span>Changes Applied to {currentLanguage.label}</span>
                    <div className={"frt-flex frt-flex-col frt-gap-2"}>
                        <p>Duplicate Email Settings From</p>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Language"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Language</SelectLabel>
                                    {available_languages.map((item: any, index: number) => {
                                        return (
                                            <SelectItem
                                                value={item.value}>{item.label}</SelectItem>)
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </AlertDescription>
        </Alert>
    )
}

export default EmailSettingsHeader;