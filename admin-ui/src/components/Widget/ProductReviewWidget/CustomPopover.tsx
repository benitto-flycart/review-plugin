import React, { useState, useRef, useEffect } from 'react';
import './Popover.css';

const CustomPopover = ({ children, content }: any) => {
    const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
    const popoverRef = useRef(null); // Reference to the popover element
    const triggerRef = useRef(null); // Reference to the button element that triggers the popover

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event:any) => {
            //@ts-ignore
            if (popoverRef?.current && !popoverRef?.current.contains(event.target) && !triggerRef?.current.contains(event.target)
            ) {
                setIsVisible(false); // Close the popover if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="popover-container">
            <button
                ref={triggerRef}
                onClick={toggleVisibility}
                className="popover-trigger"
                aria-haspopup="true"
                aria-expanded={isVisible}
                aria-controls="popover-content"
            >
                {children}
            </button>
            {isVisible && (
                <div
                    id="popover-content"
                    ref={popoverRef}
                    className="popover-content"
                    role="dialog"
                    aria-modal="true"
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default CustomPopover;