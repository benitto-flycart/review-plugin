import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";


export const ReviewFormWidgetContext = createContext({});

function ReviewFormWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const {localState}=useLocalState();

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

    const buildStateFromResponse = (settings: any) => {
        updateWidgetFields((draftState: any) => {
            draftState.widget_alignment = settings?.widget_alignment;
            draftState.width = settings?.width;
            draftState.shadow_type = settings?.shadow_type;
            draftState.show_rating = settings?.show_rating;
            draftState.show_review_image = settings?.show_review_image;
            draftState.hide_arrows_on_mobile = settings?.hide_arrows_on_mobile;
            draftState.font_size = settings?.font_size;
            draftState.name_font_size = settings?.name_font_size;
            draftState.icon_font_size = settings?.icon_font_size;
            draftState.no_of_reviews_to_display = settings?.no_of_reviews_to_display;
            draftState.style = {
                review_card_shadow: settings?.style?.review_card_shadow,
                review_card_openers: settings?.style?.review_card_openers,
            };
            draftState.colors = {
                text_color: settings?.colors?.text_color,
                bg_color: settings?.colors?.bg_color,
                name_color: settings?.colors?.name_color,
                rating_icon_color: settings?.colors?.rating_icon_color,
                border_color: settings?.colors?.border_color,
                shadow_color: settings?.colors?.shadow_color,
            }
        })
    }

    const saveSettings = () => {
        setSaving(true)
        axiosClient.post('', {
            method: 'save_widget_settings',
            widget_type: 'review_form_widget',
            language: localState.current_locale,
            ...widget,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            buildStateFromResponse(settings);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setSaving(false)
        });
    }

    const getSettings = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_settings',
            widget_type: 'review_form_widget',
            language: localState.current_locale,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            buildStateFromResponse(settings);
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    }

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
        },
        saveSettings,
        getSettings
    }

    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    useEffect(() => {
        getSettings()
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    return (
        <ReviewFormWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading,
            saving
        }}>
            {children}
        </ReviewFormWidgetContext.Provider>
    );
}

export default ReviewFormWidgetContextAPI;
