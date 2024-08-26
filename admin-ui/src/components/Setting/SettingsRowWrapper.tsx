import React from 'react'

const SettingsRowWrapper = ({children, customClassName}: any) => {
    return (
        <div className={`frt-flex frt-gap-2 ${customClassName}`}>
            {children}
        </div>
    )
}

export default SettingsRowWrapper;