import {Input} from "../../ui/input";
import React from "react";
import {Slider} from "../../ui/slider";

const InputFontSize = ({onChange, value, min, max, step}: any) => {
    const UNIT = 'px'
    const getValidatedValue = (selectedValue: number) => {
        if (selectedValue > max) return max;
        if (selectedValue < min) return min;

        return selectedValue;
    }
    return (
        <div className={"frt-flex frt-gap-2 frt-items-center"}>
            <Slider
                className={"frt-basis-[60%]"}
                min={min}
                max={max}
                step={step}
                value={[value]}
                onValueChange={(value: any) => {
                    onChange(getValidatedValue(value[0]))
                }}
            />
            <div className={"frt-basis-[40%] frt-flex frt-gap-1 frt-items-center"}>
                <Input
                    type={"number"}
                    min={16}
                    max={50}
                    value={value}
                    onChange={(e: any) => {
                        onChange(getValidatedValue(e.target.value))
                    }}/>
                <span>{UNIT}</span>
            </div>
        </div>
    )
}

export default InputFontSize;