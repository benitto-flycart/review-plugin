import React, {useContext} from "react";

const WidgetPreviewHeader = ({widget, updateWidgetFields} : any) => {

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
                <span
                    className={`wd_preview__mobile_switch_icon frt-cursor-pointer frt-rounded-xl frt-p-1 frt-w-[30px] ${widget.view == 'mobile' ? 'frt-bg-gray-200' : null}`}
                    onClick={() => {
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
    )
}

export default WidgetPreviewHeader;