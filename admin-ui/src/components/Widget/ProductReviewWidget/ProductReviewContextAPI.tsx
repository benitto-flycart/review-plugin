import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";
import {axiosClient} from "../../../helpers/axios";
import {useLocalState} from "../../zustand/localState";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";

export const ProductWidgetContext = createContext({});

function ProductWidgetContextAPI({children}: { children: any }) {
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const {localState} = useLocalState();

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        layout: {
            widget_layout: 'list',
            header_layout: 'compact',
        },
        style: {
            review_card_shadow: 'dark',
            review_card_openers: 'extra_rounded',
        },
        colors: {
            type: 'custom',
            header: {
                text_and_icon_color: '#282828',
                bar_fill_color: '#7b7b7b',
                bar_bg_color: '#f5f5f5',
            },
            button: {
                text_color: '#000000',
                text_hover_color: '#000000',
                bg_color: '#ffffff',
                bg_hover_color: '#e8e8e8',
                border_color: '#e8e8e8',
            },
            reviews: {
                text_color: '#020202',
                bg_color: '#f5c6c6',
                bg_hover_color: '#b45e5e',
                shadow_color: '#ebacac'
            },
            replies: {
                text_color: '#000000',
                bg_color: '#ffffff',
            },
            verified_badge: {
                icon_color: '#282828'
            }
        },
        preferences: {
            icon_size: 'small',
            product_review_widget: '',
            show_write_a_review: true,
            show_review_date: true,
            show_item_type: true,
            thumbnail_size: 'medium',
            reviews_per_page: 5,
            show_sorting_options: true,
            default_sorting: 'newest',
            show_rating_options: true
        }
    })

    const buildStateFromResponse = (settings: any) => {
        updateWidgetFields((draftState: any) => {
            //layout
            draftState.layout = {
                widget_layout: settings?.layout?.widget_layout,
                header_layout: settings?.layout?.header_layout
            }

            draftState.style = {
                review_card_shadow: settings?.style?.review_card_shadow,
                review_card_openers: settings?.style?.review_card_openers
            }

            //colors reviews
            draftState.colors = {
                //colors
                type: settings?.colors?.type,
                //colors header
                header: {
                    text_and_icon_color: settings?.colors.header?.text_and_icon_color,
                    bar_fill_color: settings?.colors.header?.bar_fill_color,
                    bar_bg_color: settings?.colors.header?.bar_bg_color,
                },
                button: {
                    text_color: settings?.colors?.button.text_color,
                    text_hover_color: settings?.colors?.button.text_hover_color,
                    bg_color: settings?.colors?.button.bg_color,
                    bg_hover_color: settings?.colors?.button.bg_hover_color,
                    border_color: settings?.colors?.button.border_color,
                },
                reviews: {
                    text_color: settings?.colors?.reviews?.text_color,
                    bg_color: settings?.colors?.reviews?.bg_color,
                    bg_hover_color: settings?.colors?.reviews?.bg_hover_color,
                    shadow_color: settings?.colors?.reviews?.shadow_color,
                },
                replies: {
                    text_color: settings?.colors?.replies?.text_color,
                    bg_color: settings?.colors?.replies?.bg_color
                },
                verified_badge: {
                    icon_color: settings?.colors?.verified_badge?.icon_color
                }
            };

            draftState.preferences = {
                icon_size: settings?.preferences?.icon_size,
                product_review_widget: settings?.preferences?.product_review_widget,
                show_write_a_review: settings?.preferences?.show_write_a_review,
                show_review_date: settings?.preferences?.show_review_date,
                show_item_type: settings?.preferences?.show_item_type,
                thumbnail_size: settings?.preferences?.thumbnail_size,
                reviews_per_page: settings?.preferences?.reviews_per_page,
                show_sorting_options: settings?.preferences?.show_sorting_options,
                default_sorting: settings?.preferences?.default_sorting,
                show_rating_options: settings?.preferences?.show_rating_options,
            };

            //Colors Verified Badge
        })
    }

    const saveSettings = () => {
        setSaving(true)
        axiosClient.post('', {
            method: 'save_widget_settings',
            widget_type: 'product_widget',
            language: localState.current_locale,
            layout: widget.layout,
            style: widget.style,
            preferences: widget.preferences,
            colors: widget.colors,
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            // buildStateFromResponse(settings);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setSaving(false)
        });
    }

    const fetchProductWidget = () => {
        setLoading(true)
        axiosClient.post('', {
            method: 'get_widget_settings',
            widget_type: 'product_widget',
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
        fetchProductWidget();

        let saveInterval = setInterval(() => {
            // saveSettings();
        }, 15000);

        return () => {
            clearInterval(saveInterval)
        }
    }, []);

    const widgetMethods = {
        isAddReviewEnabled: () => {
            return widget.preferences.show_write_a_review == true;
        },

        isSortingEnabled: () => {
            return widget.preferences.show_sorting_options == true;
        },

        getDefaultSorting: () => {
            return widget.preferences.default_sorting;
        },

        isReviewDateEnabled: () => {
            return widget.preferences.show_review_date;
        },
        getThumbnailSize: () => {
            return {
                width: '50px',
                height: '50px',
            }
        },

        isRatingOptionsEnabled: () => {
            return widget.preferences.show_rating_options == true;
        },

        getButtonStyles: () => {
            return {
                color: widget.colors.button.text_color,
                backgroundColor: widget.colors.button.bg_color,
                borderColor: widget.colors.button.border_color,
            };
        },
        getHeaderTextColor: () => {
            return {
                color: widget.colors.header.text_and_icon_color
            }
        },
        getBarBGColor: () => {
            return widget.colors.header.bar_bg_color
        },
        getBarFillColor: () => {
            return widget.colors.header.bar_fill_color
        }

    }

    //update editor state
    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    return (
        <ProductWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading,
           saving
        }}>
            {children}
        </ProductWidgetContext.Provider>
    );
}

export default ProductWidgetContextAPI;
