import React, {useCallback, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";

import useClickOutside from "./useClickOutside";
import {Input} from "../ui/input";


const PopoverPicker = ({color, onChange}: any) => {
    const popover = useRef<any>();
    const [isOpen, toggle] = useState<boolean>(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (

        <div className="review-color-picker">
            <div
                className="review-color-container frt-flex frt-items-center frt-gap-3 frt-p-3">
                <button className={"review-color-swatch frt-flex-basis-[20%] frt-border frt-border-gray-700 "}
                        style={{backgroundColor: color ? color : 'transparent'}}
                        onClick={() => toggle(true)}
                ></button>
                <div className={"frt-flex-basis-[80%]"}>
                    {color ? (<Input
                        value={color}
                        onChange={(e: any) => {
                            onChange(e.target.value)
                        }}/>) : <span>Transparent</span>}
                </div>
            </div>
            {isOpen && (
                <div className="review-color-popover" ref={popover}>
                    <HexColorPicker color={color ? color : ''} onChange={onChange}/>
                </div>
            )}
        </div>
    );
};

export default PopoverPicker;