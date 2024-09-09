import React from "react";
import {Cross1Icon} from "@radix-ui/react-icons";

const DetailHeading = ({name, updateWidgetFields}: any) => {
    return (
        <div className={"frt-sticky frt-top-0 frt-flex frt-justify-between frt-p-4 frt-bg-secondary frt-z-10"}>
            <span className={"frt-text-primary"}>{name}</span>
            <span className={"frt-cursor-pointer"} onClick={() => {
                updateWidgetFields((draftState: any) => {
                    draftState.show_setting = ''
                })
            }}>
                    <Cross1Icon/>
                </span>
        </div>
    );
}

export default DetailHeading;