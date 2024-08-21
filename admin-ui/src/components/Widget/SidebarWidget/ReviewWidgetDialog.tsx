import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// import PopupWidgetConfigSetting from "./PopupWidgetConfigSetting";
// import PopupWidgetColorSetting from "./PopupWidgetColorSetting";
import {ArrowRightIcon, ColorWheelIcon, LayoutIcon} from "@radix-ui/react-icons";
import "@/src/styles/widgets/widget.css";
import {SidebarWidgetContext} from "./SidebarWidgetContextAPI";
import SidebarWidgetConfigSetting from "./SidebarWidgetConfigSetting";
import WidgetPreviewHeader from "../WidgetPreviewHeader";
import PreviewSidebarWidget from "./PreviewSidebarWidget";
import SidebarWidgetConfigPages from "./SidebarWidgetConfigPages";

const SidebarWidgetDialog = ({show, toggle}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(SidebarWidgetContext)

    console.log(widget)

    const schema = yup.object().shape({});

    const form = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const values = form.watch();

    const showDropdownOptions = () => {
        return widget.show_setting == '';
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <DialogContent
                    className={"review-widget-preview !frt-max-w-[98vw] frt-min-h-[90vh] frt-max-h-[90vh] !frt-z-[50000] frt-overflow-scroll"}>
                    <div className={"frt-grid frt-grid-cols-5 frt-border-collapse"}>
                        <div
                            className={"frt-border frt-border-black-400 frt-flex frt-flex-col frt-divide-y frt-divide-gray-500 frt-gap-2"}>
                            <div className={"frt-flex frt-justify-between frt-p-4"}>
                                <span>Review Sidebar Widget Configuration</span>
                            </div>
                            {
                                showDropdownOptions() ? <div
                                    className={"frt-divide-y frt-flex frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000"}>
                                    <div
                                        className={"frt-p-3 frt-cursor-pointer frt-transition-transform frt-duration-1000"}
                                        onClick={() => {
                                            updateWidgetFields((draftState: any) => {
                                                draftState.show_setting = draftState.show_setting == '' ? 'settings' : ''
                                            })
                                        }}
                                    >
                                        <div
                                            className={"frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                        >
                                            <div className={"frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                                <span><LayoutIcon/></span>
                                                <span>Settings</span>
                                            </div>
                                            <span><ArrowRightIcon/></span>
                                        </div>
                                    </div>

                                    <div className={"frt-p-3 frt-cursor-pointer"}
                                         onClick={() => {
                                             updateWidgetFields((draftState: any) => {
                                                 draftState.show_setting = draftState.show_setting == '' ? 'pages' : ''
                                             })
                                         }}
                                    >
                                        <div
                                            className={"frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                        >
                                            <div className={"frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                                <span><ColorWheelIcon/></span>
                                                <span>Pages</span>
                                            </div>
                                            <span><ArrowRightIcon/></span>
                                        </div>
                                    </div>

                                </div> : null}

                            <div
                                className={`${widget.show_setting == 'settings' ? 'show frt-opacity-100' : 'hide frt-opacity-0'}  widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                                <SidebarWidgetConfigSetting/>
                            </div>
                            <div
                                className={`${widget.show_setting == 'pages' ? 'show frt-opacity-100' : 'hide frt-opacity-0'}  widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                                <SidebarWidgetConfigPages/>
                            </div>
                        </div>
                        <div
                            className={"wd_preview wd_snippet_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                            <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                            <div
                                className={"wd_sidebar_widget_preview preview-widget review-preview-sidebar-widget frt-flex frt-justify-center frt-min-h-[100vh]"}>
                                <PreviewSidebarWidget/>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SidebarWidgetDialog;