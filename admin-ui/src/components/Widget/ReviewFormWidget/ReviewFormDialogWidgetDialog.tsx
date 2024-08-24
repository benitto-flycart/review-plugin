import React, {useContext} from "react";
import {Dialog, DialogContent} from "../../ui/dialog";
import WidgetPreviewHeader from "../WidgetPreviewHeader";

import "@/src/styles/widgets/widget.css";
import WidgetSidebar from "../WidgetSidebar";
import {LayoutIcon} from "@radix-ui/react-icons";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";

import ReviewFormWidgetConfigSetting from "./ReviewFormWidgetConfigSetting";
import ReviewFormWidgetPreview from "./ReviewFormWidgetPreview";
import './preview.css'
import RatingWidgetRatingSetting from "./ReviewFormWidgetRatingSetting";
import RatingWidgetPhotoSetting from "./ReviewFormWidgetPhotoSetting";
import ReviewFormWidgetReviewerSetting from "./ReviewFormWidgetReviewerSetting";
import ReviewFormGetReviewSetting from "./ReviewFormGetReviewSetting";
import ReviewFormWidgetThankyouSetting from "./ReviewFormWidgetThankyouSetting";


const ReviewFormWidgetDialog = ({show, toggle}: any) => {

    const {widget, updateWidgetFields} = useContext<any>(ReviewFormWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <LayoutIcon/>,
                component: <ReviewFormWidgetConfigSetting name={"Settings"}/>,
            },
            {
                key: 'rating',
                name: 'Rating',
                icon: <LayoutIcon/>,
                component: <RatingWidgetRatingSetting name={"Rating"}/>,
            },
            {
                key: 'photos',
                name: 'Photos',
                icon: <LayoutIcon/>,
                component: <RatingWidgetPhotoSetting name={"Photos"}/>,
            },
            {
                key: 'reviewer_content',
                name: 'Review Content',
                icon: <LayoutIcon/>,
                component: <ReviewFormGetReviewSetting name={"Review Content"}/>,
            },
            {
                key: 'reviewer_info',
                name: 'Reviewer Info',
                icon: <LayoutIcon/>,
                component: <ReviewFormWidgetReviewerSetting name={"Reviewer Info"}/>,
            },
            {
                key: 'thank_you',
                name: 'Thank you',
                icon: <LayoutIcon/>,
                component: <ReviewFormWidgetThankyouSetting name={"Thank you"}/>,
            }
        ]
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={toggle}>
                <DialogContent
                    className={"wd_container widget_snippet review-widget-preview !frt-p-0"}>
                    <div
                        className={"wd__sidebar frt-divide-y frt-divide-black-400 frt-col-span-1 frt-flex frt-flex-col frt-gap-2 frt-border-r frt-border-black-400"}>
                        <WidgetSidebar settings={settings} widget={widget} updateWidgetFields={updateWidgetFields}/>
                    </div>
                    <div
                        className={"wd_preview frt-col-span-4 frt-flex frt-flex-col frt-gap-2 frt-shadow-2xl"}>
                        <WidgetPreviewHeader widget={widget} updateWidgetFields={updateWidgetFields}/>
                        <div className={"wd_preview__main_content preview-widget wd_review_form_preview"}>
                            <ReviewFormWidgetPreview/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReviewFormWidgetDialog;