import {getReviewShadow, REVIEW_OPENERS} from "./Preview/preview-constants";

const getShadowStyles = (widget: any) => {
    return {
        // boxShadow: getReviewShadow(widget.style.review_card_shadow, widget.colors.reviews.shadow_color),
        // borderRadius: opener,
    }
}
export const getReviewCardStyles = (widget: any, isHovered: boolean = false) => {
    let shadow: any = getShadowStyles(widget);

    let others: any = {
        // color: widget.colors.reviews.text_color,
        // backgroundColor: isHovered ? widget.colors.reviews.bg_hover_color : widget.colors.reviews.bg_color,
        // transition: 'background-color 0.3s ease',
    }
    return {
        ...others,
        ...shadow,
        ...opener
    }
}

export const getRepliesStyles = (widget: any) => {
    let others: any = {
        // color: widget.colors.replies.text_color,
        // backgroundColor: widget.colors.replies.bg_color,
    }
    return {
        ...others,

    }
}

export const getVerifiedStyles = (widget: any) => {
    return {
    }
}

