const getResponseError = (error: any) => {
    const errors = error?.response?.data?.data;
    const code = error?.response?.status;
    console.log(code, errors)
    return [code, errors];
}

const getResponseData = (response: any) => {
    const data = response?.data?.data;
    const code = response?.status;
    return [code, data];
}
const isValidationError = (code: number) => {
    return code < 500 && code > 400;
}

export const ClientResponse = {
    getResponseData,
    getResponseError,
    isValidationError
}