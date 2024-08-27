import React from "react";
import {ArrowRightIcon} from "@radix-ui/react-icons";


const WidgetSidebar = ({settings, widget, updateWidgetFields}: any) => {

    const showDropdownOptions = () => {
        return widget.show_setting == '';
    }

    return (
        <div
            className={"frt-top-0 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
            {showDropdownOptions() ? (<div
                className={"wd__sidebar_title  widget-header-title frt-sticky frt-bg-primary frt-top-0 frt-flex frt-justify-between frt-p-4"}>
                <span>{settings.title}</span>
            </div>) : null}

            {
                showDropdownOptions() ? <div
                    className={"wd_sidebar_options_container frt-divide-y frt-flex frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000"}>
                    {
                        settings?.options.map((option: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className={"wd_sidebar_options_container__option frt-p-3 frt-cursor-pointer frt-transition-transform frt-duration-1000"}
                                    onClick={() => {
                                        updateWidgetFields((draftState: any) => {
                                            draftState.show_setting = draftState.show_setting == '' ? option.key : ''
                                        })
                                    }}
                                >
                                    <div
                                        className={"wd_sidebar_options_container__option_container frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                    >
                                        <div
                                            className={"wd_sidebar_option frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                            <span>{option.icon}</span>
                                            <span>{option.name}</span>
                                        </div>
                                        <span className={"wd_sidebar_option_goto_icon"}><ArrowRightIcon/></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : null
            }


            {settings.options.map((option: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={`${widget.show_setting == option.key ? 'wd_setting_container show frt-opacity-100' : 'hide frt-opacity-0'}  widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                            {option.component}
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default WidgetSidebar;