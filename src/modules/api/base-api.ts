export type APIResponse = {
    status: 'success' | 'failed';
    data?: unknown;
    reason?: unknown;
};

export type XHROptions = {
    [key: string]: string | {[key: string]: string};
};

export class BaseAPI {
    static HOST: string = 'https://ya-praktikum.tech/api/v2';

    create() {
        throw new Error('Not implemented');
    }

    request() {
        throw new Error('Not implemented');
    }

    update() {
        throw new Error('Not implemented');
    }

    delete() {
        throw new Error('Not implemented');
    }

    getResourceURL(url: string) {
        if (url !== null) {
            url = url.startsWith('/') ? url : `/${url}`;
            return `${BaseAPI.HOST}/resources${url}`;
        }

        return '';
    }
}
