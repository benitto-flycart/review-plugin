import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";

export const ProductWidgetContext = createContext({});

function ProductWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
        view: 'mobile',
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

    useEffect(() => {

    }, [widget]);

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
        }}>
            {children}
        </ProductWidgetContext.Provider>
    );
}

export default ProductWidgetContextAPI;
