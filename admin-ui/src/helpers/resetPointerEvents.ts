export const resetPointerEvents = (isOpen: boolean) => {
    if (!isOpen) {
        setTimeout(() => {
            document.body.style.pointerEvents = '';
        }, 500);
    }
};
