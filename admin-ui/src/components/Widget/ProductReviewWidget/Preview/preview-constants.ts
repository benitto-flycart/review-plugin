export const REVIEW_SHADOWS: {[index: string]:any} = {
    classic : {
        boxShadow: "0 0 8px #00000040"
    },
    dark: {
        'boxShadow': "0 6px 14px #00000036"
    },
    light: {
        boxShadow: "0 6px 14px -4px #00000024"
    },
    none: {
        boxShadow: "none"
    }
};

export const REVIEW_OPENERS: {[index: string]:any} = {
    sharp : {
        borderRadius: "2px"
    },
    slightly_rounded: {
        borderRadius: "4px"
    },
    rounded: {
        borderRadius: "8px"
    },
    extra_rounded: {
        borderRadius: "16px"
    }
};

export const WIDGET_COLOR_DEFAULTS = {
    dark_text: {
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
            text_color: '#000000',
            bg_color: '#ffffff',
            bg_hover_color: '#f8f8f8',
        },
        replies: {
            text_color: '#000000',
            bg_color: '#ffffff',
        },
        verified_badge: {
            icon_color: '#282828'
        }
    },
    light_text: {
        header: {
            text_and_icon_color: '##ffffff',
            bar_fill_color: '#7b7b7b',
            bar_bg_color: '#000000',
        },
        button: {
            text_color: '#ffffff',
            text_hover_color: '#282828',
            bg_color: '#000000',
            bg_hover_color: '#ffffff',
            border_color: '#ffffff',
        },
        reviews: {
            text_color: '#000000',
            bg_color: '#ffffff',
            bg_hover_color: '#f8f8f8',
        },
        replies: {
            text_color: '#000000',
            bg_color: '#ffffff',
        },
        verified_badge: {
            icon_color: '#282828'
        }
    }
}