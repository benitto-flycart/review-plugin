import * as React from 'react'
import {cn} from "@/src/lib/utils"

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
    size?: string;
    className?: string;
}

export const LoadingSpinner = ({
                                   size = "24px",
                                   className,
                                   ...props
                               }: ISVGProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{margin: 'auto'}}
            className={cn("frt-animate-spin frt-m-auto frt-h-full", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
    );
};