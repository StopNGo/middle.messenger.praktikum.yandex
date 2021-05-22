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
            ...this.options,
            path: '/chats'
        };

        return this.transportator
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
            }),
            path: '/chats'
        };

        return this.transportator
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
            }),
            path: '/chats'
        };

        return this.transportator
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
            ...this.options,
            path: `/chats/token/${chatID}`
        };
        return this.transportator
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
            }),
            path: '/chats/users'
        };

        return this.transportator
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
            }),
            path: '/chats/users'
        };

        return this.transportator
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
            ...this.options,
            path: `/chats/${chatID}/users`
        };
        return this.transportator
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
