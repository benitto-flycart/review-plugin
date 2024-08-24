import React from 'react';

const SidebarDetailWrapper = ({children}: any) => {
    return (
        <div className={"frt-flex frt-flex-col frt-divide-y frt-divide-gray-500 frt-gap-2 "}>
            {children}
        </div>
    )
}
export default SidebarDetailWrapper;