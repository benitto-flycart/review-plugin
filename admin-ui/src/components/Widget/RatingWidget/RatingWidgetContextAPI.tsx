import React, {createContext, useState} from "react";
import {produce} from "immer";

export const RatingWidgetContext = createContext({});

function RatingWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        layout: 'default',
        widget_alignment: 'left',
        direction: 'icon_first',
        text_content: "{{rating}} - ({{count}})",
        hide_text_content: false,
        font_size: 30,
        rating_icon_size: 20,
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
                color: widget.colors.text_color,
                fontSize: widget.font_size + 'px'
            };
        },
        getRatingContainerStyle: () => {
            let justifyContent = 'start';
            let rowReverse = false;
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

            if (widget.direction == 'text_first') {
                rowReverse = true;
            }

            return {
                justifyContent: justifyContent,
                flexDirection: rowReverse ? 'row-reverse' : 'row'
            }
        },
        getRatingStyles: () => {
            return {
                fontSize: widget.rating_icon_size + 'px',
                color: widget.colors.rating_icon_color,
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
