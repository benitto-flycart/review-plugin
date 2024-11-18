import React from "react";
import {Badge} from "../ui/badge";
import {useLocalState} from "../zustand/localState";

const WidgetPreviewHeader = ({widget, updateWidgetFields,currentLocale}: any) => {

    const savedRef = React.useRef();
    const {localState}=useLocalState()

    const availableLanguages = localState.available_languages;
    const currentLanguageLabel=availableLanguages.find((allLang:any)=>{
        return allLang.value===currentLocale
    }).label

    return (
        <div className={"wd_preview_header widget-header-title"}>
            <div
                className={"wd_preview__view_container frt-flex frt-flex-row frt-gap-3 frt-items-center frt-justify-center"}>
                                    <span
                                        className={`wd_preview__desktop_switch_icon frt-cursor-pointer frt-p-1 frt-w-[30px] frt-rounded-xl ${widget.view == 'desktop' ? 'frt-bg-gray-200' : null}`}
                                        onClick={() => {
                                            updateWidgetFields((draftState: any) => {
                                                draftState.view = 'desktop'
                                            })
                                        }}
                                    >
                                            <i className="farp farp-desktop frt-text-2xl"></i>
                                    </span>
                <span
                    className={`wd_preview__mobile_switch_icon frt-cursor-pointer frt-rounded-xl frt-p-1 frt-w-[30px] ${widget.view == 'mobile' ? 'frt-bg-gray-200' : null}`}
                    onClick={() => {
                        updateWidgetFields((draftState: any) => {
                            draftState.view = 'mobile'
                        })
                    }}>
                                            <i className="farp farp-mobile frt-text-2xl"></i>
                                    </span>
            </div>
            <div className={"frt-mx-auto frt-max-w-max frt-my-2"}>
                <Badge>Changes Applied to {currentLanguageLabel} Language</Badge>
            </div>
        </div>
    )
}

export default WidgetPreviewHeader;