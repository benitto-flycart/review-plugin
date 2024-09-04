import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";

export const ReviewFormWidgetContext = createContext({});

function ReviewFormWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(true)
    const {localState}=useLocalState();

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        general: {
            button: {
                text_color: '#E70680',
                bg_color: '#FED2EA',
            },
            input: {
                border_color: 'white',
                border_focus_color: 'purple',
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
        getFooterButtonStyles: () => {
            return {
                color: widget.general.button.text_color,
                backgroundColor: widget.general.button.bg_color,
                borderColor: `${widget.general.button.text_color}`,
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
        saveSettings
    }

    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
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
            loading
        }}>
            {children}
        </ReviewFormWidgetContext.Provider>
    );
}

export default ReviewFormWidgetContextAPI;
