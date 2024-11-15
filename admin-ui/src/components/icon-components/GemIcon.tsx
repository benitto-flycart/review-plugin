import React from "react";
import {getIconStyles} from "../../icons/icon-components/icon-helpers";

const GemIcon = ({size, color, filledColor = ''}: {
    size: string,
    color: string,
    filledColor?: string,
}) => {
    return (
        <span style={getIconStyles(size, color, filledColor)} >
            <i className={'farp-icon farp farp-Gem'}></i>
        </span>
    )
}

export default GemIcon;