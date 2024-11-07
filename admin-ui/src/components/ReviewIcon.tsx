import React from "react";
import {useLocalState} from "./zustand/localState";
import {reviewIcons} from "../helpers/icons";

const ReviewIcon = ({icon = 'gem', color = 'inherit', fontSize = 'inherit', filled = true, className=''}: {
    icon?: string,
    color?: string,
    fontSize?: string,
    filled?: boolean,
    className?: string
}) => {
    const {localState} = useLocalState();

    //@ts-ignore
    let reviewicon;

    if(filled){
        //@ts-ignore
        reviewicon=reviewIcons[icon].filled
    }else{
        //@ts-ignore
        reviewicon=reviewIcons[icon].outlined
    }
    return (
        <i className={`review-icon review review-${reviewicon} ${className}`}
           style={{fontSize: fontSize, color: color}}></i>
    );
}

export default ReviewIcon;

