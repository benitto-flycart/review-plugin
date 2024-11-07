interface AjaxRequestConfig {
    url: string;
    method: 'POST' | 'GET';
    data: any;
    contentType?: string;
}





export function ajaxRequest(jquery:any, config: AjaxRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        jquery.ajax({
            url: config.url,
            method: config.method,
            data: config.data,
            contentType: config.contentType || 'application/x-www-form-urlencoded',
        }).then((response: any) => {
            resolve(response);
        }).catch((error: any) => {
            reject(error);
        });
    });
}
