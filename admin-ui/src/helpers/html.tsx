import React from "react";

export const showValidationError = (errors: Record<any, string[]>, fields: string | string[]) => {
    if (!errors) return null;

    let error: string = '';

    if (typeof fields === 'string') {
        // If fields is a single string, check if it exists in errors and add its message to fieldErrors
        if (errors[fields]) {
            error = errors[fields][0]; // Assuming each error field contains an array of messags
        }
    } else if (Array.isArray(fields)) {
        // If fields is an array, iterate over it and add any found errors to fieldErrors
        fields.forEach(field => {
            if (errors[field]) {
                error = errors[field][0]; // Assuming each error field contains an array of messages
                console.log(error)
            }
        });
    }

    // If no errors were found for the specified fields, return null
    if (!error) return null;

    // Return the error messages for the specified fields
    return <p className="frt-text-xs frt-mt-2 frt-text-destructive">{error}</p>
}