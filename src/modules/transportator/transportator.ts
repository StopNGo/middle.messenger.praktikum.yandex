enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHOD;
    data?: any;
    headers?: any;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransportator {
    static METHOD = METHOD;

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.GET});
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.PUT});
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.POST});
    }

    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.PATCH});
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.DELETE});
    }

    request(url: string, options: Options = {method: METHOD.GET}, timeout: number = 5000): Promise<XMLHttpRequest> {
        const {method, data, headers = {}} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            xhr.open(method, url);

            if (method === METHOD.GET) {
                url += this._queryStringify(data);
            }

            for (let header of headers) {
                if (Object.prototype.hasOwnProperty.call(headers, header)) {
                    xhr.setRequestHeader(header, headers[header]);
                }
            }

            xhr.onload = function () {
                resolve(xhr);
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
