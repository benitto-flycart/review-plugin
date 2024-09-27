import React, {createContext, useContext, useEffect, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";
import {SampleReviewsContext} from "../SampleReviewsAPI";


export const ReviewDetailWidgetContext = createContext({});

function ReviewDetailWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(true)
    const {localState} = useLocalState();

    const {reviews, refetch} = useContext<any>(SampleReviewsContext)

    const [widget, setWidget] = useState({
        widget_loading: true,
        view: 'desktop',
        show_setting: '',
        colors: {
            dialog_bg_color: '#fbbfe2',
            rating_icon_color: '#f20ba9',
            text_color: '#f20ba9',
            button_text_color: '#fcf9fb',
            button_bg_color: '#f20ba9',
        }
    })

    const buildStateFromResponse = (settings: any) => {
        updateWidgetFields((draftState: any) => {
            draftState.colors.dialog_bg_color = settings?.colors.dialog_bg_color;
            draftState.colors.rating_icon_color = settings?.colors.rating_icon_color;
            draftState.colors.text_color = settings?.colors.text_color;
            draftState.colors.button_text_color = settings?.colors.button_text_color;
            draftState.colors.button_bg_color = settings?.colors.button_bg_color;
        })
    }

    const saveSettings = () => {
        setSaving(true)
        axiosClient.post('', {
            method: 'save_widget_settings',
            widget_type: 'review_detail_widget',
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
        getReviewDetailVariables: () => {
            return {
                "--r-rdw-dialog-bg-color": widget.colors.dialog_bg_color,
                "--r-rdw-rating-icon-color": widget.colors.rating_icon_color,
                "--r-rdw-text-color": widget.colors.text_color,
                "--r-rdw-btn-text-color": widget.colors.button_text_color,
                "--r-rdw-btn-bg-color": widget.colors.button_bg_color,
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
            widget_type: 'review_detail_widget',
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
        <ReviewDetailWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading,
            sampleReviews: reviews,
        }}>
            {children}
        </ReviewDetailWidgetContext.Provider>
    );
}

export default ReviewDetailWidgetContextAPI;
