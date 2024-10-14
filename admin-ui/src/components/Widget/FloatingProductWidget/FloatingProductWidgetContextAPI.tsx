import React, {createContext, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";

export const FloatingProductWidgetContext = createContext({});

function FloatingProductWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const {localState} = useLocalState();

    const [widget, setWidget] = useState({
        widget_loading: true,
        view: 'desktop',
        show_setting: '',
        text_content: "Reviews",
        font_size: 48,
        text_color: '#141010',
        bg_color: '#b64c4c',
    })

    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }


    const buildStateFromResponse = (settings: any) => {
        updateWidgetFields((draftState: any) => {
            draftState.text_content = settings?.text_content;
            draftState.font_size = settings?.font_size;
            draftState.text_color = settings?.text_color;
            draftState.bg_color = settings?.bg_color;
        })
    }
    const fetchFloatingProductWidget = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_settings',
            widget_type: 'floating_product_widget',
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
            widget_type: 'floating_product_widget',
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
        //code
        getFPStyles: () => {
            return {
                backgroundColor: widget.bg_color,
                font_size: widget.font_size + 'px',
                color: widget.text_color,
            }
        },
        saveSettings,
        getSettings:fetchFloatingProductWidget
    }

    return (
        <FloatingProductWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading,
            saving,
        }}>
            {children}
        </FloatingProductWidgetContext.Provider>
    );
}

export default FloatingProductWidgetContextAPI;
