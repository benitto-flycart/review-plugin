import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {getReviewBorderRadius, getReviewShadow} from "./preview-constants";
import {useLocalState} from "../../zustand/localState";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";

export const SnippetWidgetContext = createContext({});

function SnippetWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const {localState} = useLocalState();

    const [widget, setWidget] = useState({
        widget_loading: true,
        view: 'desktop',
        show_setting: '',
        shadow_type: 'spread',
        show_rating: true,
        show_review_image: true,
        hide_arrows_on_mobile: true,
        position_to_show:"before_product",
        no_of_reviews_to_display: 10,
        style: {
            review_card_shadow: 'dark',
            review_card_openers: 'extra_rounded',
        },
        colors: {
            text_color: '#141010',
            bg_color: '#ebcccc',
            name_color: '#d74949',
            rating_icon_color: '#b64c4c',
            border_color: '#4b0b0b',
            shadow_color: '#ab5d5d'
        }
    })

    const getOtherStyles = () => {
        return {
            backgroundColor: widget.colors.bg_color,
            borderColor: widget.colors.border_color,
            boxShadow: getReviewShadow(widget.style.review_card_shadow, widget.colors.shadow_color),
            borderRadius: getReviewBorderRadius(widget.style.review_card_openers)
        }
    }


    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }


    const buildStateFromResponse = (settings: any) => {
        updateWidgetFields((draftState: any) => {
            draftState.widget_alignment = settings?.widget_alignment;
            draftState.width = settings?.width;
            draftState.shadow_type = settings?.shadow_type;
            draftState.show_rating = settings?.show_rating;
            draftState.show_review_image = settings?.show_review_image;
            draftState.hide_arrows_on_mobile = settings?.hide_arrows_on_mobile;
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
    const getSettings = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_settings',
            widget_type: 'snippet_widget',
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

    const saveSettings = () => {
        setSaving(true)
        axiosClient.post('', {
            method: 'save_widget_settings',
            widget_type: 'snippet_widget',
            language: localState.current_locale,
            ...widget,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setSaving(false)
        });
    }

    const widgetMethods = {
        getStyles: () => {
            return {
                ...getOtherStyles(),

            };
        },
        getReviewStyles: () => {
            return {
                color: widget.colors.text_color,
            }
        },
        getReviewerNameStyle: () => {
            return {
                color: widget.colors.name_color,
            }
        },
        getRatingIconStyles: () => {
            return {
                color: widget.colors.rating_icon_color,
            }
        },
        getCarosualActionStyle: () => {
            return {
                backgroundColor: widget.colors.bg_color,
                color: widget.colors.text_color,
                borderRadius: "50%"
            }
        },
        saveSettings,
        getSettings
    }

    useEffect(() => {
        getSettings();
    }, []);

    return (
        <SnippetWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading,
            saving
        }}>
            {children}
        </SnippetWidgetContext.Provider>
    );
}

export default SnippetWidgetContextAPI;
