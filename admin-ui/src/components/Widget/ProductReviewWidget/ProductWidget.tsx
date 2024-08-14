import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import {ProductWidgetContext} from "./ProductReviewContextAPI";
import ProductWidgetLayoutSetting from "./ProductWidgetLayoutSetting";
import ProductWidgetStyleSetting from "./ProductWidgetStyleSetting";
import PreviewProductWidget from "./Preview/PreviewProductWidget";
import ProductWidgetColorSetting from "./ProductWidgetColorSetting";
import ProductWidgetPreferenceSetting from "./ProductWidgetPreferenceSetting";
import "@/src/styles/widgets/widget.css";
import "./styles/preview-mobile.css";
import {ArrowRightIcon, ColorWheelIcon, DashboardIcon, FontStyleIcon, LayoutIcon} from "@radix-ui/react-icons";

const ProductWidget = ({show, toggle}: any) => {
    const {widget, updateWidgetFields} = useContext<any>(ProductWidgetContext)

    const showDropdownOptions = () => {
        return widget.show_setting == '';
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <DialogContent
                    className={"review-widget-preview !frt-p-0 !frt-max-w-[98vw] frt-min-h-[90vh] frt-max-h-[90vh] !frt-z-[50000] frt-overflow-scroll"}>
                    <div className={"frt-grid frt-grid-cols-5 frt-border-collapse"}>
                        <div
                            className={"frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                            {showDropdownOptions() ? (<div className={"widget-header-title"}>
                                    <span>Product Reviews Widget</span>
                                </div>
                            ) : null}

                            {
                                showDropdownOptions() ? (
                                    <div
                                        className={"frt-divide-y frt-flex frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000"}>
                                        <div
                                            className={"frt-p-3 frt-cursor-pointer frt-transition-transform frt-duration-1000"}
                                            onClick={() => {
                                                updateWidgetFields((draftState: any) => {
                                                    draftState.show_setting = draftState.show_setting == '' ? 'layout' : ''
                                                })
                                            }}
                                        >
                                            <div
                                                className={"frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                            >
                                                <div className={"frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                                    <span><LayoutIcon/></span>
                                                    <span>Layout</span>
                                                </div>
                                                <span><ArrowRightIcon/></span>
                                            </div>
                                        </div>
                                        <div className={"frt-p-3 frt-cursor-pointer"} onClick={() => {
                                            updateWidgetFields((draftState: any) => {
                                                draftState.show_setting = draftState.show_setting == '' ? 'style' : ''
                                            })
                                        }}>
                                            <div
                                                className={"frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                            >
                                                <div className={"frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                                    <span><FontStyleIcon/></span>
                                                    <span>Style</span>
                                                </div>
                                                <span><ArrowRightIcon/></span>
                                            </div>
                                        </div>
                                        <div className={"frt-p-3 frt-cursor-pointer"}
                                             onClick={() => {
                                                 updateWidgetFields((draftState: any) => {
                                                     draftState.show_setting = draftState.show_setting == '' ? 'color' : ''
                                                 })
                                             }}
                                        >
                                            <div
                                                className={"frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                            >
                                                <div className={"frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                                    <span><ColorWheelIcon/></span>
                                                    <span>Color</span>
                                                </div>
                                                <span><ArrowRightIcon/></span>
                                            </div>
                                        </div>
                                        <div className={"frt-p-3 frt-cursor-pointer"}
                                             onClick={() => {
                                                 updateWidgetFields((draftState: any) => {
                                                     draftState.show_setting = draftState.show_setting == '' ? 'preferences' : ''
                                                 })
                                             }}
                                        >
                                            <div
                                                className={"frt-flex frt-flex-row frt-justify-between frt-items-center"}
                                            >
                                                <div className={"frt-flex frt-flex-row frt-items-center frt-gap-4"}>
                                                    <span><DashboardIcon/></span>
                                                    <span>Preferences</span>
                                                </div>
                                                <span><ArrowRightIcon/></span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }

                            <div
                                className={`${widget.show_setting == 'layout' ? 'show frt-opacity-100' : 'hide frt-opacity-0'} widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                                <ProductWidgetLayoutSetting/>
                            </div>


                            <div
                                className={`${widget.show_setting == 'style' ? 'show frt-opacity-100' : 'hide frt-opacity-0'} widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                                <ProductWidgetStyleSetting/>
                            </div>

                            <div
                                className={`${widget.show_setting == 'color' ? 'show frt-opacity-100' : 'hide frt-opacity-0'} widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                                <ProductWidgetColorSetting/>
                            </div>

                            <div
                                className={`${widget.show_setting == 'preferences' ? 'show frt-opacity-100' : 'hide frt-opacity-0'} widget-setting-transform frt-flex-col frt-flex-1 frt-transition-transform frt-duration-1000`}>
                                <ProductWidgetPreferenceSetting/>
                            </div>

                        </div>
                        <div
                            className={"frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                            <div className={"widget-header-title"}>
                                <div className={"frt-flex frt-flex-row frt-gap-3 frt-items-center frt-justify-center"}>
                                    <span className={`frt-cursor-pointer frt-p-1 frt-w-[30px] frt-rounded-xl ${widget.view == 'desktop' ? 'frt-bg-gray-200' : null}`}
                                          onClick={() => {
                                              updateWidgetFields((draftState: any) => {
                                                  draftState.view = 'desktop'
                                              })
                                          }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_5236_21393"
                                                                                      fill="white"><path
                                            d="M2.07886 7.40888C2.07886 6.63078 2.70963 6 3.48774 6H20.67C21.4481 6 22.0789 6.63078 22.0789 7.40888V18H2.07886V7.40888Z"></path></mask><path
                                            d="M2.07886 7.40888C2.07886 6.63078 2.70963 6 3.48774 6H20.67C21.4481 6 22.0789 6.63078 22.0789 7.40888V18H2.07886V7.40888Z"
                                            stroke="#091218" stroke-width="3"
                                            mask="url(#path-1-inside-1_5236_21393)"></path><rect x="23" y="18"
                                                                                                 width="22" height="1"
                                                                                                 rx="0.500001"
                                                                                                 transform="rotate(180 23 18)"
                                                                                                 fill="#091218"></rect><path
                                            d="M10 7H14V8.58236C14 8.81302 13.813 9 13.5824 9H10.4176C10.187 9 10 8.81302 10 8.58236V7Z"
                                            fill="#091218"></path></svg>
                                    </span>
                                    <span className={`frt-cursor-pointer frt-rounded-xl frt-p-1 frt-w-[30px] ${widget.view == 'mobile' ? 'frt-bg-gray-200' : null}`} onClick={() => {
                                        updateWidgetFields((draftState: any) => {
                                           draftState.view = 'mobile'
                                        })
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg"><rect x="7.25" y="3.25" width="9.5"
                                                                                      height="16.5" rx="1.75"
                                                                                      stroke="#091218"
                                                                                      stroke-width="1.5"></rect><rect
                                            x="11" y="5" width="2" height="1" rx="0.5" fill="#091218"></rect><rect
                                            x="10" y="17" width="4" height="1" rx="0.5" fill="#091218"></rect></svg>
                                    </span>
                                </div>
                            </div>
                            <div className={"review-preview-product-widget frt-min-h-[90vh]"}>
                                <PreviewProductWidget/>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductWidget;