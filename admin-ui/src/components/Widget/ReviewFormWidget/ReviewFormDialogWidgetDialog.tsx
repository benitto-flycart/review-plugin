import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
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
import RatingWidgetPreview from "../RatingWidget/RatingWidgetPreview";
import WidgetDialogWrapper from "../WidgetDialogWrapper";


const ReviewFormWidgetDialog = ({show, toggle}: any) => {

    const context = useContext<any>(ReviewFormWidgetContext)

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
        <WidgetDialogWrapper
            show={show}
            toggle={toggle}
            context={context}
            settings={settings}
        >
            <ReviewFormWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default ReviewFormWidgetDialog;