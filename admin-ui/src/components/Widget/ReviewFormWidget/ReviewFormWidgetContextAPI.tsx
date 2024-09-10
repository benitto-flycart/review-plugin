import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";

export const ReviewFormWidgetContext = createContext({});

function ReviewFormWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(true)

    const [widget, setWidget] = useState({
        widget_loading: true,
        view: 'desktop',
        show_setting: '',
        general: {
            button: {
                text_color: '#000000',
                bg_color: '#ffffff',
            },
            input: {
                border_color: 'white',
            },
            dialog: {
                bg_color: '#FED2EA',
            }
        },
        rating: {
            title: 'How would you rate this item?',
            text_color: '#6D033D',
            icon_color: '#6D033D',
        },
        photos: {
            title: 'Show it Off',
            title_text_color: 'black',
            description: "We'd love to see it again",
            description_color: 'black',
            button_text: 'Add Photos',
            button_text_color: 'white',
            discount_text:'Get {{discount_value}} off your next purchase!\n'
        },
        review_content: {
            title: 'Tell us more!',
            title_text_color: 'black',
            placeholder: 'Share your experience'
        },
        reviewer: {
            title: 'About you',
            title_text_color: 'purple',
            label_color: 'purple',
            description_color: 'purple',
        },
        thank_you: {
            title: 'Thank you',
            title_text_color: 'purple',
            description: 'Your Review was submitted',
            description_text_color: 'purple',
        }
    })

    const widgetMethods = {
        getThankyouTitleStyles: () => {
            return {
                color: widget.thank_you.title_text_color,
            }
        },
        getThankyouDescriptionStyles: () => {
            return {
                color: widget.thank_you.description_text_color,
            }
        },
        getDialogStyles: () => {
            return {
                backgroundColor: widget.general.dialog.bg_color
            }
        },
        ratingTitleStyles: () => {
            return {
                color: widget.rating.text_color,
            }
        },
        ratingIconStyles: () => {
            return {
                color: widget.rating.icon_color,
            }
        },
        getPhotoTitleStyles: () => {
            return {
                color: widget.photos.title_text_color,
            }
        },
        getPhotoDescriptionStyles: () => {
            return {
                color: widget.photos.description_color,
            }
        },
        getPhotoButtonStyles: () => {
            return {
                color: widget.general.button.text_color,
                backgroundColor: widget.general.button.bg_color,
                borderColor: widget.general.button.text_color
            }
        },
        getAddPhotosDivStyles:()=>{
            return {
                borderWidth:"1px",
                borderStyle:'dashed',
                borderColor:widget.general.button.text_color,
                color:widget.general.button.text_color,
            }
        },
        getFooterButtonStyles: () => {
            return {
                color: widget.general.button.text_color,
                backgroundColor: widget.general.button.bg_color,
            }
        },
        getFooterBackButtonStyles: () => {
            return {
                color: widget.general.button.bg_color,
                backgroundColor:'transparent',
            }
        },
        getReviewContentStyle: () => {
            return {
                color: widget.review_content.title_text_color,
            }
        },
        getReviewerTitleStyles: () => {
            return {
                color: widget.reviewer.title_text_color,
            }
        },
        getReviewerDescriptionStyles: () => {
            return {
                color: widget.reviewer.description_color,
            }
        },
        getReviewerLabelStyles: () => {
            return {
                color: widget.reviewer.label_color,
            }
        },
        getInputStyles: () => {
            return {
                borderColor: widget.general.input.border_color,
            }
        }
    }

    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    return (
        <ReviewFormWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading
        }}>
            {children}
        </ReviewFormWidgetContext.Provider>
    );
}

export default ReviewFormWidgetContextAPI;
