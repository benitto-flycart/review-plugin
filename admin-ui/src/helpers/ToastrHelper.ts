import {toast} from "sonner"


export const toastrSuccess = (message: any) => {
    console.log(message)
    toast.success(message, {
        position: 'top-right'
    });
}

export const toastrError = (message: any) => {
    console.log(message)
    if (!message) {
        message = 'Error';
    }

    toast.error(message, {
        position: 'top-right'
    });
}