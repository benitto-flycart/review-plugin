import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "../../ui/breadcrumb";
import {Link} from "react-router-dom";
import React from "react";

const EmailNavigation = (props: any) => {
    const {to, title} = props;
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild className={"frt-p-2"}>
                        <Link to="/email-settings">Email Settings</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild className={"frt-text-gray-600 frt-p-2"}>
                        <Link to={to}>{title}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default EmailNavigation;