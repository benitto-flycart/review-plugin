import React, {Children} from "react";

const SidebarDetailSection = ({children, title}: any) => {
    const arrayChildren = Children.toArray(children);

    return (
        <div className={"frt-flex frt-flex-col frt-gap-2 frt-py-4 frt-border frt-border-b-gray-500"}>
            <div className={"frt-px-4"}>
                <span className={"frt-font-extrabold"}>{title}</span>
            </div>
            <div className={"frt-flex frt-flex-col frt-gap-4 frt-divide-y frt-divide-gray-100"}>
                {
                    Children.map(arrayChildren, (child, index) => {
                        return <div className={"frt-p-4"}>
                            {child}
                        </div>;
                    })
                }
            </div>
        </div>
    )
}

export default SidebarDetailSection;