import {getReviewShadow, REVIEW_OPENERS} from "./Preview/preview-constants";

const getShadowStyles = (widget: any) => {
    let opener: any = REVIEW_OPENERS[widget.style.review_card_openers]
    return {
        // boxShadow: getReviewShadow(widget.style.review_card_shadow, widget.colors.reviews.shadow_color),
        // borderRadius: opener,
        '--r-pw--review-box-shadow': getReviewShadow(widget.style.review_card_shadow, widget.colors.reviews.shadow_color),
        '--r-pw-review-border-radius': opener,
    }
}
export const getReviewCardStyles = (widget: any, isHovered: boolean = false) => {
    let shadow: any = getShadowStyles(widget);

    let others: any = {
        // color: widget.colors.reviews.text_color,
        // backgroundColor: isHovered ? widget.colors.reviews.bg_hover_color : widget.colors.reviews.bg_color,
        // transition: 'background-color 0.3s ease',
        '--r-pw-review-color': widget.colors.reviews.text_color,
        '--r-pw-review-bg-color': widget.colors.reviews.bg_color,
        '--r-pw-review-bg-hover-color': widget.colors.reviews.bg_hover_color,
    }
    console.log('return');
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
        '--r-pw-review-replies-color': widget.colors.replies.text_color,
        '--r-pw-review-replies-bg-color': widget.colors.replies.bg_color,
    }
}

export const getVerifiedStyles = (widget: any) => {
    return {
        '--r-pw-review-verified-color': widget.colors.verified_badge.icon_color
    }
}

