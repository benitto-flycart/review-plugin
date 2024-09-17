import React from "react";
const ProgressBar = (props:any) => {
    const { completed } = props;

    const fillerStyles: any = {
        width: `${completed}%`,
    }

    // const labelStyles = {
    //     padding: 5,
    //     color: 'white',
    // }

    return (
        <div className={"r_pw_progress_bar_bg"}>
            <div style={fillerStyles} className={"r_pw_progress_bar_fill"}>
                <span className={"r_pw_progress_bar_label"}></span>
            </div>
        </div>
    );
};

export default ProgressBar;