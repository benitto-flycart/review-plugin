import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {useLocalState} from "../../zustand/localState";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";

export const RatingWidgetContext = createContext({});

function RatingWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(true)
    const {localState} = useLocalState();

    const [widget, setWidget] = useState({
        widget_loading: true,
        view: 'desktop',
        show_setting: '',
        layout: 'default',
        widget_alignment: 'left',
        direction: 'icon_first',
        text_content: "{{rating}} - ({{count}})",
        hide_text_content: false,
        style: {},
        colors: {
            text_color: '#141010',
            rating_icon_color: '#b64c4c',
        }
    })


    const saveSettings = () => {
        setSaving(true)
        axiosClient.post('', {
            method: 'save_widget_settings',
            widget_type: 'rating_widget',
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

    const getWidgetAlignment = () => {
        let justifyContent = 'start';
        switch (widget.widget_alignment) {
            case 'right':
                justifyContent = 'end'
                break;
            case 'left':
                justifyContent = 'start'
                break;
            case 'center':
                justifyContent = 'center'
                break;
        }

        return justifyContent;
    }

    const widgetMethods = {
        getWidgetTextContent: () => {
            let content = widget.text_content;
            return content.replace("{{rating}}", "3.5").replace("{{count}}", "20");
        },
        getWidgetVars: () => {
            return {
                "--r-rw-icon-color": widget.colors.rating_icon_color,
                "--r-rw-text-color": widget.colors.text_color,
                "--r-rw-flex-direction": widget.direction == 'text_first' ? 'row-reverse' : 'row',
                "--r-rw-flex-justify-content": getWidgetAlignment(),
            };
        },
        saveSettings
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
    const getSettings = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_settings',
            widget_type: 'rating_widget',
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
        getSettings();

        let saveInterval = setInterval(() => {
            // saveSettings();
        }, 15000);

        return () => {
            clearInterval(saveInterval)
        }
    }, []);

    return (
        <RatingWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading
        }}>
            {children}
        </RatingWidgetContext.Provider>
    );
}

export default RatingWidgetContextAPI;
