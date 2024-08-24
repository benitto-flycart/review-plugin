import React, {createContext, useState} from "react";
import {produce} from "immer";

export const ReviewFormWidgetContext = createContext({});

function ReviewFormWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        general: {
            button: {
                text_color: 'white',
                bg_color: 'purple',
            },
            input: {
                border_color: 'white',
                border_focus_color: 'purple',
            },
            dialog: {
                bg_color: 'white',
            }
        },
        rating: {
            title: 'How would you rate this item?',
            text_color: 'black',
            icon_color: 'purple',
            font_size: 30,
            icon_size: 30,
        },
        photos: {
            title: 'Show it Off',
            title_text_size: 20,
            title_text_color: 'black',
            description: "We'd love to see it again",
            description_text_size: 10,
            description_color: 'black',
            button_text: 'Add Photos',
            button_text_color: 'white',
            button_text_size: 10,
        },
        review_content: {
            title: 'Tell us more!',
            title_text_size: 30,
            title_text_color: 'black',
            placeholder: 'Share your experience'
        },
        reviewer: {
            title: 'About you',
            title_text_size: 30,
            title_text_color: 'purple',
            label_color: 'purple',
            label_text_size: 16,
            description_color: 'purple',
            description_text_size: 16,
        },
        thank_you: {
            title: 'Thank you',
            title_text_size: 30,
            title_text_color: 'purple',
            description: 'Your Review was submitted',
            description_text_size: 16,
            description_text_color: 'purple',
        }

    })

    const widgetMethods = {
        getThankyouTitleStyles: () => {
            return {
                color: widget.thank_you.title_text_color,
                fontSize: widget.thank_you.title_text_size + 'px'
            }
        },
        getThankyouDescriptionStyles: () => {
            return {
                color: widget.thank_you.description_text_color,
                fontSize: widget.thank_you.description_text_size + 'px'
            }
        },
        getDialogStyles: () => {
            return {
                backgroundColor: widget.general.dialog.bg_color
            }
        },
        ratingTitleStyles: () => {
            return {
                fontSize: widget.rating.font_size + 'px',
                color: widget.rating.text_color,
            }
        },
        ratingIconStyles: () => {
            return {
                fontSize: widget.rating.icon_size + 'px',
                color: widget.rating.icon_color,
            }
        },
        getPhotoTitleStyles: () => {
            return {
                fontSize: widget.photos.title_text_size + 'px',
                color: widget.photos.title_text_color,
            }
        },
        getPhotoDescriptionStyles: () => {
            return {
                fontSize: widget.photos.description_text_size + 'px',
                color: widget.photos.description_color,
            }
        },
        getPhotoButtonStyles: () => {
            return {
                fontSize: widget.photos.button_text_size + 'px',
                color: widget.general.button.text_color,
                backgroundColor: widget.general.button.bg_color
            }
        },
        getFooterButtonStyles: () => {
            return {
                color: widget.general.button.text_color,
                backgroundColor: widget.general.button.bg_color
            }
        },
        getReviewContentStyle: () => {
            return {
                color: widget.review_content.title_text_color,
                fontSize: widget.review_content.title_text_size + 'px',
            }
        },
        getReviewerTitleStyles: () => {
            return {
                color: widget.reviewer.title_text_color,
                fontSize: widget.reviewer.title_text_size + 'px',
            }
        },
        getReviewerDescriptionStyles: () => {
            return {
                color: widget.reviewer.description_color,
                fontSize: widget.reviewer.description_text_size + 'px',
            }
        },
        getReviewerLabelStyles: () => {
            return {
                color: widget.reviewer.label_color,
                fontSize: widget.reviewer.label_text_size + 'px',
            }
        }
    }

    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    return (
        <ReviewFormWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
        }}>
            {children}
        </ReviewFormWidgetContext.Provider>
    );
}

export default ReviewFormWidgetContextAPI;
