export const ICON_SIZE: any = {
    small: {
        width: '10px',
        height: '10px',
    },
    medium: {
        width: '20px',
        height: '20px',
    },
    large: {
        width: '30px',
        height: '30px',
    }
}

const getWidthAndHeight = (size: string) => {
    return ICON_SIZE[size];
}

export const getIconStyles = (size: string, color: string, filledColor: string = '') => {
    return {
        color: filledColor ? filledColor : color,
    }
}

