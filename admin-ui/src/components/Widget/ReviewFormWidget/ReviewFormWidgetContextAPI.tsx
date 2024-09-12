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
            title_color: '#f20ba9',
            description_color: '#ec07a3',
            button_text_color: '#f20ba9',
            button_bg_color: '#fbddef',
            input_label_color: '#ff47d7',
            input_border_color: '#f4d4ed',
            input_error_color: '#ff0808',
            dialog_bg_color: '#fffafd',
            rating_icon_color: '#f178bb',
        },
        rating: {
            title: 'How would you rate {product_name?}',
        },
        photos: {
            title: 'Show it Off',
            description: "We'd love to see it again",
            button_text: 'Add Photos',
            discount_text: 'Get {{discount_value}} off your next purchase!'
        },
        review_content: {
            title: 'Tell us more!',
            placeholder: 'Share your experience'
        },
        reviewer: {
            title: 'About you',
            label_color: 'purple',
            description_color: 'purple',
        },
        thank_you: {
            title: 'Thank you',
            description: 'Your Review was submitted',
        }
    })

    const widgetMethods = {
        getAddPhotosDivStyles: () => {
            return {
                borderWidth: "1px",
                borderStyle: 'dashed',
                borderColor: widget.general.button_text_color,
                color: widget.general.button_text_color,
            }
        },
        getRatingTitle: () => {
            let title =  widget.rating.title;

            if(title) {
                title = title?.replace("{product_name}?", "<span className='r_rfw_rating-title__product_name'>{product_name}?</span>")
            }

           return title;
        },
        getReviewFormVariables: () => {
            return {
                "--r-rfw-dialog-bg-color": widget.general.dialog_bg_color,
                "--r-rfw-rating-icon-color": widget.general.rating_icon_color,
                "--r-rfw-input-label-color": widget.general.input_label_color,
                "--r-rfw-input-border-color": widget.general.input_border_color,
                "--r-rfw-input-error-color": widget.general.input_error_color,
                "--r-rfw-title-color": widget.general.title_color,
                "--r-rfw-description-color": widget.general.description_color,
                "--r-rfw-btn-text-color": widget.general.button_text_color,
                "--r-rfw-btn-bg-color": widget.general.button_bg_color,
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
