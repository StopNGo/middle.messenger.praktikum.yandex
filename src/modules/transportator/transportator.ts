enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type XMLHttpRequestResponseType = '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';

type Options = {
    method: METHOD;
    credentials?: any;
    responseType?: XMLHttpRequestResponseType;
    headers?: any;
    data?: any;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransportator {
    static METHOD = METHOD;
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    get(options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(this.url, {...options, method: METHOD.GET});
    }

    put(options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(this.url, {...options, method: METHOD.PUT});
    }

    post(options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(this.url, {...options, method: METHOD.POST});
    }

    patch(options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(this.url, {...options, method: METHOD.PATCH});
    }

    delete(options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(this.url, {...options, method: METHOD.DELETE});
    }

    request(url: string, options: Options = {method: METHOD.GET}, timeout: number = 5000): Promise<XMLHttpRequest> {
        const {method, data, headers = {}} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === METHOD.GET) {
                if (data) {
                    url += this._queryStringify(data);
                }
            }

            xhr.timeout = timeout;
            xhr.open(method, url);

            xhr.responseType = options.responseType ?? 'json';

            if (options.credentials === 'included') {
                xhr.withCredentials = true;
            }

            for (let header in headers) {
                if (Object.prototype.hasOwnProperty.call(headers, header)) {
                    xhr.setRequestHeader(header, headers[header]);
                }
            }

            xhr.onload = function () {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = function () {
                reject();
                throw new Error(`Request Timed Out after ${timeout} ms`);
            };

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }

    private _queryStringify(data: {[key: string]: any} = {}) {
        let query = '?';
        for (let key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                query += `${key}=${data[key]}&`;
            }
        }

        return query.slice(0, -1);
    }
}
