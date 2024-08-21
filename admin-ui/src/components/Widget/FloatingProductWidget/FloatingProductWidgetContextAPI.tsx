import React, {createContext, useState} from "react";
import {produce} from "immer";

export const FloatingProductWidgetContext = createContext({});

function FloatingProductWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        text_content: "Reviews",
        font_size: 48,
        text_color: '#141010',
        bg_color: '#b64c4c',
    })

    const widgetMethods = {
        //code
        getFPStyles: () => {
            return {
                backgroundColor: widget.bg_color,
                font_size: widget.font_size + 'px',
                color: widget.text_color,
            }
        }

    }

    const updateWidgetFields = (cb: any) => {
        let newState = produce(widget, draft => {
            return cb(draft)
        })
        setWidget(newState);
    }

    return (
        <FloatingProductWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
        }}>
            {children}
        </FloatingProductWidgetContext.Provider>
    );
}

export default FloatingProductWidgetContextAPI;
