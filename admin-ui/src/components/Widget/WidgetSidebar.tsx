import React, {useState} from "react";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import {ChevronDown} from "lucide-react";
import {useLocalState} from "../zustand/localState";
import {axiosClient} from "../api/axios";
import {AxiosResponse} from "axios";
import {toastrSuccess} from "../../helpers/ToastrHelper";
import {ApiErrorResponse} from "../api/api.types";
import {LoadingSpinner} from "../ui/loader";


const WidgetSidebar = ({settings, widget, updateWidgetFields}: any) => {

    const {localState} = useLocalState();
    const availableLanguages = localState.available_languages;
    const [loading,setLoading]=useState<boolean>(false)
    const [whichLanguage,setWhichLanguage] = useState({  "label": "English",
        "value": "en_US"});
    const showDropdownOptions = () => {
        return widget.show_setting == '';
    }

    const locale = localState.current_locale;
    const currentLanguage = availableLanguages.find((item: any) => item.value === locale);

    const getPreviousStyles = () => {
        setLoading(true)
        axiosClient
            .post(``, {
                method: "get_previous_styles",
                _wp_nonce_key: "flycart_review_nonce",
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                widget_slug:settings.widget_slug,
                from_lang:whichLanguage.value,
                to_lang:currentLanguage.value
            })
            .then((response: AxiosResponse) => {
                const data: any = response.data.data;
                toastrSuccess(data.message);
            })
            .catch((error: AxiosResponse<ApiErrorResponse>) => {
                // @ts-ignore
                toastrError(getErrorMessage(error));
            })
            .finally(() => {
                setLoading(false)
            });
    }
    return (
        <>
            <div
                className={"frt-top-0 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                {showDropdownOptions() ? (<div
                    className={"wd__sidebar_title  widget-header-title frt-sticky frt-bg-secondary frt-top-0 frt-flex frt-justify-between frt-p-4"}>
                    <span className={"frt-text-primary"}>{settings.title}</span>
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
            { (widget.show_setting=="" && availableLanguages.length>1) ?
                <div className={"frt-flex frt-flex-col frt-gap-y-3"}>
                    <span className={"frt-mx-4"}> Choose language to apply previous style for this widget</span>
                    <div className={"frt-flex frt-gap-5 frt-justify-center"}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={"frt-w-[60%] !frt-justify-between"}>
                                    {whichLanguage.label}
                                    <ChevronDown/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {availableLanguages.map((item: any, index: number) => {
                                    return (
                                        <DropdownMenuItem
                                            className={"frt-flex frt-gap-x-1"}
                                            key={item.value}
                                            defaultValue={whichLanguage.value}
                                            onClick={()=>{
                                                setWhichLanguage(item)
                                            }}
                                        >
                                            {item.label}
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button disabled={loading} onClick={getPreviousStyles}>{loading ? <LoadingSpinner/>: null}Apply</Button>
                    </div>
                </div> : null
            }
        </>
    )
}

export default WidgetSidebar;