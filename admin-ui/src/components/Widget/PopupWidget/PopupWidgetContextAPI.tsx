import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";

export const PopupWidgetContext = createContext({});

function PopupWidgetContextAPI({children}: { children: any }) {

    const [loading, setLoading] = useState(false)
    const [widget, setWidget] = useState({
        show_setting: '',
        view:'mobile',
        position: 'top_left',
        corner_radius: 'sharp',
        minimum_rating: '3_stars',
        initial_delay: "1",
        delay_between_popup: "1",
        popup_display_time: "1",
        show_product_thumbnail: true,
        hide_on_mobile: true,
        auto_play_video: true,
        show_on_home_page: true,
        show_on_cart_page: true,
        show_on_product_page: true,

        colors: {
            review: {
                text_color: '#000000',
                bg_color: '#d3adad',
            },
            product: {
                text_color: '#020202',
            },
            close_icon: {
                text_color: '#000000',
                bg_color: '#d3adad',
            }
        }
    })

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)

    }, []);

    const widgetMethods = {
        getPopupPreviewStyles: () => {
                return {
                    color: widget.colors.review.text_color,
                    backgroundColor: widget.colors.review.bg_color,
                    display: 'block'
                };
        },
        getPopupProductStyles: () => {
            return {
                color: widget.colors.product.text_color,
            };
        },
        getCloseIconStyles: () => {
            return {
                color: widget.colors.close_icon.text_color,
                backgroundColor: widget.colors.close_icon.bg_color,
            }
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
        <PopupWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
            loading
        }}>
            {children}
        </PopupWidgetContext.Provider>
    );
}

export default PopupWidgetContextAPI;
