import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../api/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";

export const SidebarWidgetContext = createContext({});

function SidebarWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const {localState} = useLocalState();

    const [widget, setWidget] = useState({
        widget_loading: true,
        show_setting: '',
        view: 'mobile',
        position: 'left',
        orientation: 'top_bottom',
        button_text: "Reviews",
        button_bg_color: "#e3b4ec",
        button_text_color: "#000000",
        hide_on_mobile: true,
        show_on_home_page: true,
        show_on_cart_page: true,
        show_on_product_page: true
    })

    //update editor state
    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    const buildStateFromResponse = (settings: any) => {
        updateWidgetFields((draftState: any) => {
            draftState.position = settings?.position;
            draftState.orientation = settings?.orientation;
            draftState.button_text = settings?.button_text;
            draftState.button_bg_color = settings?.button_bg_color;
            draftState.button_text_color = settings?.button_text_color;
            draftState.hide_on_mobile = settings?.hide_on_mobile;
            draftState.show_on_home_page = settings?.show_on_home_page;
            draftState.show_on_cart_page = settings?.show_on_cart_page;
            draftState.show_on_product_page = settings?.show_on_product_page;
        })
    }

    const getSettings = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_settings',
            widget_type: 'sidebar_widget',
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
        setLoading(true)
        axiosClient.post('', {
            method: 'save_widget_settings',
            widget_type: 'sidebar_widget',
            ...widget,
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
        getReviewSidebarPreviewStyles: () => {
            return {
                color: widget.button_text_color,
                backgroundColor: widget.button_bg_color,
            };
        },

        getSidebarPosition : () => {
            switch (widget.position) {
                case 'right':
                    return 'r_sbw__right'
                case 'left':
                    return 'r_sbw__left'
            }
        },

        getPositionAndOrientation : () => {
            if (widget.position == "left" && widget.orientation == "top_bottom") {
                return "r_sbw__pl_tb"
            } else if (widget.position == "right" && widget.orientation == "top_bottom") {
                return "r_sbw__pr_tb"
            } else if (widget.position == "left" && widget.orientation == "bottom_top") {
                return "r_sbw__pl_bt"
            } else {
                return "r_sbw__pr_bt"
            }
        },
        getStyleVars: () => {
            return {
                '--r-r_sbw-text-color': widget.button_text_color,
                '--r-r_sbw-bg-color': widget.button_bg_color,
            };
        },
        saveSettings,
        getSettings
    }

    useEffect(() => {
        getSettings();
    }, []);

    return (
        <SidebarWidgetContext.Provider value={{
            loading,
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
        }}>
            {children}
        </SidebarWidgetContext.Provider>
    );
}

export default SidebarWidgetContextAPI;