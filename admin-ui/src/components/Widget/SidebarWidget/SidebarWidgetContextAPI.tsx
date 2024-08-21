import React, {createContext, useEffect, useState} from "react";
import {produce} from "immer";

export const SidebarWidgetContext = createContext({});

function SidebarWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
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

    useEffect(() => {
    }, [widget]);

    const widgetMethods = {
        getReviewSidebarPreviewStyles: () => {
            return {
                color: widget.button_text_color,
                backgroundColor: widget.button_bg_color,
            };
        },
        // getReviewProductStyles: () => {
        //     return {
        //         color: widget.colors.product.text_color,
        //     };
        // }
    }

    //update editor state
    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    return (
        <SidebarWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
        }}>
            {children}
        </SidebarWidgetContext.Provider>
    );
}

export default SidebarWidgetContextAPI;
