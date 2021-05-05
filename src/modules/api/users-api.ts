import HTTPTransportator from '../transportator/transportator';
import {BaseAPI, APIResponse, XHROptions} from './base-api';

export type ProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

export type PasswordData = {
    oldPassword: string,
    newPassword: string
};

export class UsersAPI extends BaseAPI {
    options: XHROptions;

    constructor() {
        super();
        this.options = {
            credentials: 'included'
        };
    }

    changeProfile(data: ProfileData): Promise<APIResponse> {
        const options = {
            ...this.options,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/user/profile`)
            .put(options)
            .then(
                (): APIResponse => ({
                    status: 'success'
                })
            )
            .catch(
                (err): APIResponse => {
                    if (err.reason === 'User already in system') {
                        return {status: 'success'};
                    }

                    return {
                        status: 'failed',
                        reason: err.reason
                    };
                }
            );
    }

    changeAvatar(data: FormData): Promise<APIResponse> {
        const options = {
            ...this.options,
            data
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/user/profile/avatar`)
            .put(options)
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

    changePassword(data: PasswordData): Promise<APIResponse> {
        const options = {
            ...this.options,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/user/password`)
            .put(options)
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
}
