
import React, {useCallback, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";

import useClickOutside from "./useClickOutside";
import {Input} from "../ui/input";


const PopoverPicker = ({color, onChange}: any) => {
    const popover = useRef<any>();
    const [isOpen, toggle] = useState<boolean>(false);
    const colorInputFieldRef=useRef<any>()
    const close = useCallback(() => toggle(false), []);
    const [colorPickerPosition, setColorPickerPosition] = React.useState<any>({
        top:0,
    })
    const isFieldContainsEmptyData=()=>{
        if(!color){
            onChange("transparent")
        }
    }

    useClickOutside(popover, close);
    useClickOutside(colorInputFieldRef,isFieldContainsEmptyData );
    return (

        <div className="review-color-picker">
            <div
                className="review-color-container frt-flex frt-items-center frt-gap-3 frt-p-3">
                <button className={"review-color-swatch frt-flex-basis-[20%] frt-border frt-border-gray-700 "}
                        style={{backgroundColor: color ? color : 'transparent'}}
                        onClick={(e:any) => {toggle(true)
                            const {top}=e.target.getBoundingClientRect()
                            setColorPickerPosition({top})}}
                ></button>
                <div className={"frt-flex-basis-[80%]"}
                >
                    <Input ref={colorInputFieldRef}
                           value={color}
                           onChange={(e: any) => {
                               onChange(e.target.value)
                           }}/>
                </div>
            </div>
            {isOpen && (
                <div className={`review-color-popover`} ref={popover} style={colorPickerPosition}>
                    <HexColorPicker className={`frt-z-50`} color={color ? color : ''} onChange={onChange}/>
                </div>
            )}
        </div>
    );
};

export default PopoverPicker;
