import HTTPTransportator from '../transportator/transportator';
import {BaseAPI, APIResponse, XHROptions} from './base-api';

export type ChatData = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: string;
};

export class ChatsAPI extends BaseAPI {
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

    getChats(): Promise<APIResponse> {
        const options = {
            ...this.options
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/chats`)
            .get(options)
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

    addChat(name: string): Promise<APIResponse> {
        const options = {
            ...this.options,
            data: JSON.stringify({
                title: name
            })
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/chats`)
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

    deleteChat(chatID: number): Promise<APIResponse> {
        const options = {
            ...this.options,
            data: JSON.stringify({
                chatId: chatID
            })
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/chats`)
            .delete(options)
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

    getToken(chatID: number): Promise<APIResponse> {
        const options = {
            ...this.options
        };
        return new HTTPTransportator(`${BaseAPI.HOST}/chats/token/${chatID}`)
            .post(options)
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

    addUserToChat(chatID: number, userID: number): Promise<APIResponse> {
        const options = {
            ...this.options,
            data: JSON.stringify({
                users: [userID],
                chatId: chatID
            })
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/chats/users`)
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

    deleteUserFromChat(chatID: number, userID: number): Promise<APIResponse> {
        const options = {
            ...this.options,
            data: JSON.stringify({
                users: [userID],
                chatId: chatID
            })
        };

        return new HTTPTransportator(`${BaseAPI.HOST}/chats/users`)
            .delete(options)
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

    getUsers(chatID: number): Promise<APIResponse> {
        const options = {
            ...this.options
        };
        return new HTTPTransportator(`${BaseAPI.HOST}/chats/${chatID}/users`)
            .get(options)
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
}
