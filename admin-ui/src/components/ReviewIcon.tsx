import React from "react";
import {useLocalState} from "./zustand/localState";

const ReviewIcon = ({color = 'inherit', fontSize = 'inherit', filled = true} : any) => {
    const {localState} = useLocalState();
    const icon = 'Heart'
    return (
        <i className={`review-icon review review-${icon} ${filled ? 'review-icon-filled' : 'review-icon-empty'}`}
           style={{fontSize: "inherit", color: "inherit"}}></i>
    );
}

export default  ReviewIcon;

