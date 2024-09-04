import React from "react";
import {useLocalState} from "./zustand/localState";
import {reviewIcons} from "../helpers/icons";

const ReviewIcon = ({icon = '', color = 'inherit', fontSize = 'inherit', filled = true, className=''}: {
    icon?: string,
    color?: string,
    fontSize?: string,
    filled?: boolean,
    className?: string
}) => {
    const {localState} = useLocalState();

    //@ts-ignore
    const reviewicon: string = reviewIcons[icon].filled;
    return (
        <i className={`review-icon review review-${reviewicon} ${filled ? 'review-icon-filled' : 'review-icon-empty'} ${className}`}
           style={{fontSize: fontSize, color: color}}></i>
    );
}

export default ReviewIcon;

