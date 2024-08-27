import React from "react";
import {useLocalState} from "./zustand/localState";

const ReviewIcon = ({color = 'inherit', fontSize = 'inherit', filled = true} : any) => {
    const {localState} = useLocalState();
    const icons = ['gem', 'gem-outline', 'heart', 'heart-outline', 'leaf', 'leaf-outline', 'rocket', 'rocket-outline', 'round-star', 'round-star-outline', 'star-sharp', 'star-sharp-outline', ]
    const icon = icons[Math.floor(Math.random() * icons.length)];

    return (
        <i className={`review-icon review review-${icon} ${filled ? 'review-icon-filled' : 'review-icon-empty'}`}
           style={{fontSize: "inherit", color: "inherit"}}></i>
    );
}

export default  ReviewIcon;

