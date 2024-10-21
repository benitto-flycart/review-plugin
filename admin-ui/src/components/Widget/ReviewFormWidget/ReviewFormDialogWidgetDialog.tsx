import React, {useContext} from "react";

import "@/src/styles/widgets/widget.css";
import {ReviewFormWidgetContext} from "./ReviewFormWidgetContextAPI";

import ReviewFormWidgetConfigSetting from "./ReviewFormWidgetConfigSetting";
import ReviewFormWidgetPreview from "./ReviewFormWidgetPreview";
import RatingWidgetRatingSetting from "./ReviewFormWidgetRatingSetting";
import RatingWidgetPhotoSetting from "./ReviewFormWidgetPhotoSetting";
import ReviewFormWidgetReviewerSetting from "./ReviewFormWidgetReviewerSetting";
import ReviewFormGetReviewSetting from "./ReviewFormGetReviewSetting";
import ReviewFormWidgetThankyouSetting from "./ReviewFormWidgetThankyouSetting";
import WidgetDialogWrapper from "../WidgetDialogWrapper";
import {getWidthAndHeightForIcons} from "../../../helpers/utils";
import {EyeIcon, HeartHandshakeIcon, ImageIcon, InfoIcon, SettingsIcon, StarIcon} from "lucide-react";

const ReviewFormWidgetDialog = ({show, toggle,currentLocale}: any) => {

    const context = useContext<any>(ReviewFormWidgetContext)

    const settings = {
        title: 'Rating Widget Configuration',
        widget_slug: 'snippet',
        options: [
            {
                key: 'settings',
                name: 'Settings',
                icon: <SettingsIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <ReviewFormWidgetConfigSetting name={"Settings"}/>,
            },
            {
                key: 'rating',
                name: 'Rating',
                icon: <StarIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <RatingWidgetRatingSetting name={"Rating"}/>,
            },
            {
                key: 'photos',
                name: 'Photos',
                icon: <ImageIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <RatingWidgetPhotoSetting name={"Photos"}/>,
            },
            {
                key: 'reviewer_content',
                name: 'Review Content',
                icon: <EyeIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <ReviewFormGetReviewSetting name={"Review Content"}/>,
            },
            {
                key: 'reviewer_info',
                name: 'Reviewer Info',
                icon: <InfoIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
                component: <ReviewFormWidgetReviewerSetting name={"Reviewer Info"}/>,
            },
            {
                key: 'thank_you',
                name: 'Thank you',
                icon: <HeartHandshakeIcon width={getWidthAndHeightForIcons().width} height={getWidthAndHeightForIcons().height}/>,
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
            currentLocale={currentLocale}
        >
            <ReviewFormWidgetPreview/>
        </WidgetDialogWrapper>
    )
}

export default ReviewFormWidgetDialog;