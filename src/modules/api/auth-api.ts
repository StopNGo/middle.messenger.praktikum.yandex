import HTTPTransportator from '../transportator/transportator';
import {BaseAPI, APIResponse, XHROptions} from './base-api';

export type LoginData = {
    login: string;
    password: string;
};

export type RegisterData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export class AuthAPI extends BaseAPI {
    options: XHROptions;

    constructor() {
        super();
        this.options = {
            credentials: 'included',
            headers: {
                'content-type': 'application/json'
            }
        };
    }

    login(data: LoginData): Promise<APIResponse> {
        const options = {
            ...this.options,
            data: JSON.stringify(data)
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/auth/signin`)
            .post(options)
            .then(
                (): APIResponse => ({
                    status: 'success'
                })
            )
            .catch(
                (err): APIResponse => {
                    return {
                        status: 'failed',
                        reason: err.reason
                    };
                }
            );
    }

    logout(): Promise<APIResponse> {
        const options = {
            ...this.options
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/auth/logout`)
            .post(options)
            .then(
                (): APIResponse => ({
                    status: 'success'
                })
            )
            .catch(
                (err): APIResponse => {
                    return {
                        status: 'failed',
                        reason: err.reason
                    };
                }
            );
    }

    register(data: RegisterData): Promise<APIResponse> {
        const options = {
            ...this.options,
            data: JSON.stringify(data)
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/auth/signup`)
            .post(options)
            .then(
                (): APIResponse => ({
                    status: 'success'
                })
            )
            .catch(
                (err): APIResponse => {
                    return {
                        status: 'failed',
                        reason: err.reason
                    };
                }
            );
    }

    profile(): Promise<APIResponse> {
        const options = {
            ...this.options
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/auth/user`)
            .get(options)
            .then((response: any) => {
                try {
                    response.avatar = this.getResourceURL(response.avatar);
                    return response;
                } catch {
                    return response;
                }
            })
            .then(
                (response): APIResponse => ({
                    status: 'success',
                    data: response
                })
            )
            .catch(
                (err): APIResponse => {
                    return {
                        status: 'failed',
                        reason: err.reason
                    };
                }
            );
    }

    async isLogedIn() {
        const response = await this.profile();
        if (response.status === 'success') {
            return true;
        }

        return false;
    }
}
