import React from 'react'

const SettingsColWrapper = ({children, customClassName}: any) => {
    return (
        <div className={`frt-flex frt-flex-1 frt-flex-col frt-gap-2 ${customClassName}`}>
            {children}
        </div>
    )
}

export default SettingsColWrapper;