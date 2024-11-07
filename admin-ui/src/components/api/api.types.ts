export type ApiResponse<T> = {
    data: T;
};


export type ApiErrorResponse = {
    data?: {
        [field: string]: string[]; // Each field (e.g., `first_name`, `email`) has an array of error messages
    };
    message?: string;
    success: boolean;
};
