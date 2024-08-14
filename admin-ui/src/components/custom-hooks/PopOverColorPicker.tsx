import React, {useCallback, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";

import useClickOutside from "./useClickOutside";

const PopoverPicker = ({color, onChange}: any) => {
    const popover = useRef<any>();
    const [isOpen, toggle] = useState<boolean>(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <div className="review-color-picker">
            <div
                className="review-color-container frt-flex frt-items-center frt-gap-3 frt-p-3"
                onClick={() => toggle(true)}
            >
                <div className={"review-color-swatch "}
                      style={{backgroundColor: color}}
                ></div>
                <div className={""}>{color}</div>
            </div>

            {isOpen && (
                <div className="review-color-popover" ref={popover}>
                    <HexColorPicker color={color} onChange={onChange}/>
                </div>
            )}
        </div>
    );
};

export default PopoverPicker;