import React, {createContext, useState} from "react";
import {produce} from "immer";

export const RatingWidgetContext = createContext({});

function RatingWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        layout: 'default',
        widget_alignment: 'left',
        text_content: "{{rating}} - ({{count}})",
        hide_text_content: false,
        font_size: 48,
        style: {},
        colors: {
            text_color: '#141010',
            rating_icon_color: '#b64c4c',
        }
    })

    const widgetMethods = {
        getWidgetTextContent: () => {
            let content = widget.text_content;
            return content.replace("{{rating}}", "3.5").replace("{{count}}", "20");
        },
        getTextStyles: () => {
            return {
                color: widget.colors.text_color
            };
        },
        getRatingStyles: () => {
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

            return {
                justifyContent: justifyContent
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
        <RatingWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
        }}>
            {children}
        </RatingWidgetContext.Provider>
    );
}

export default RatingWidgetContextAPI;
