import React from "react";
const ProgressBar = (props:any) => {
    const { containerColor, bgcolor, completed } = props;

    const containerStyles = {
        height: '100%',
        width: '100%',
        backgroundColor: containerColor,
        borderRadius: 50,
    }

    const fillerStyles: any = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}></span>
            </div>
        </div>
    );
};

export default ProgressBar;