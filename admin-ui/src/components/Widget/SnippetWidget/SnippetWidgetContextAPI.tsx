import React, {createContext, useState} from "react";
import {produce} from "immer";
import {getReviewBorderRadius, getReviewShadow} from "./preview-constants";

export const SnippetWidgetContext = createContext({});

function SnippetWidgetContextAPI({children}: { children: any }) {

    const [widget, setWidget] = useState({
        view: 'desktop',
        show_setting: '',
        widget_alignment: 'left',
        width: 'fill',
        shadow_type: 'spread',
        show_rating: true,
        show_review_image: true,
        hide_arrows_on_mobile: true,
        font_size: 16,
        name_font_size: 16,
        icon_font_size: 16,
        no_of_reviews_to_display: 10,
        style: {
            review_card_shadow: 'dark',
            review_card_openers: 'extra_rounded',
        },
        colors: {
            text_color: '#141010',
            bg_color: '#ebcccc',
            name_color: '#d74949',
            rating_icon_color: '#b64c4c',
            border_color: '#4b0b0b',
            shadow_color: '#ab5d5d'
        }
    })

    const getAlignmentStyle = () => {
        let alignment = '0 0 0 auto';
        switch (widget.widget_alignment) {
            case 'left' :
                alignment = '0 auto 0 0';
                break;
            case 'right':
                alignment = '0 0 0 auto';
                break
            case 'center':
                alignment = '0 0 0 auto'
                break;
        }
        return {
            margin: alignment
        }
    }

    const getWidgetWidth = () => {

        if (widget.width == 'fill') {
            return {};
        }
        let width = "736px";
        switch (widget.width) {
            case 'small':
                width = '364px';
                break
            case 'medium':
                width = '544px'
                break;
            case 'large':
                width = '736px'
                break;
        }
        return {
            maxWidth: width
        }
    }

    const getOtherStyles = () => {
        return {
            backgroundColor: widget.colors.bg_color,
            borderColor: widget.colors.border_color,
            boxShadow: getReviewShadow(widget.style.review_card_shadow, widget.colors.shadow_color),
            borderRadius: getReviewBorderRadius(widget.style.review_card_openers)
        }
    }
    const widgetMethods = {
        getStyles: () => {
            return {
                ...getAlignmentStyle(),
                ...getWidgetWidth(),
                ...getOtherStyles(),

            };
        },
        getReviewStyles: () => {
            return {
                color: widget.colors.text_color,
                fontSize: widget.font_size + 'px',
            }
        },
        getReviewerNameStyle: () => {
            return {
                color: widget.colors.name_color,
                fontSize: widget.name_font_size + 'px'
            }
        },
        getRatingIconStyles: () => {
            return {
               color:  widget.colors.rating_icon_color,
                fontSize: widget.icon_font_size + 'px'
            }
        },
        getCarosualActionStyle: () => {
            return {
                backgroundColor: widget.colors.bg_color,
                color: widget.colors.text_color,
                borderRadius: "50%"
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
        <SnippetWidgetContext.Provider value={{
            widget: widget,
            updateWidgetFields,
            methods: widgetMethods,
        }}>
            {children}
        </SnippetWidgetContext.Provider>
    );
}

export default SnippetWidgetContextAPI;
