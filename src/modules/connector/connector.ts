import {ChatsAPI} from '../../modules/api/chats-api';
import EventBusator, {TEventBusator} from '../event-busator/event-busator';

enum EVENTS {
    INIT = 'init',
    CLOSE = 'onClose',
    MESSAGE = 'onMessage',
    ERROR = 'onError'
}

enum MessageTypes {
    MESSAGE = 'message',
    FILE = 'file',
    USER_CONNECTED = 'user connected',
    GET_OLD = 'get old',
    ERROR = 'error'
}

export type TMessage = {
    user_id: number;
    chat_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file: any;
    id: number;
};

export default class Connector {
    static HOST: string = 'wss://ya-praktikum.tech/ws/chats';
    static MSGTYPE = MessageTypes;
    static EVENTS = EVENTS;

    private _socket: WebSocket | null = null;
    private _userID: number;
    private _chatID: number;
    private _host = '';
    eventBus: () => any;

    constructor(userID: number, chatID: number) {
        const eventBus: TEventBusator = new EventBusator();

        this._userID = userID;
        this._chatID = chatID;
        this.eventBus = () => eventBus;
    }

    addOnMeassageAction(callback: (args: any) => void): void {
        this.eventBus().on(Connector.EVENTS.MESSAGE, callback);
    }

    private onOpen = () => {
        console.log('Подключились!');
        this.fetch();
    };

    private onClose = (event: CloseEvent) => {
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        if (event.wasClean) {
            console.log('Нормальное отключение');
        } else {
            console.warn('Потеря связи');
            try {
                console.log('Переподключение');
                this.init();
            } catch (error) {
                console.warn(error);
            }
        }
    };

    private onMessage = (event: MessageEvent & {data: string}) => {
        try {
            const data = JSON.parse(event.data);
            this.eventBus().emit(Connector.EVENTS.MESSAGE, data);
        } catch (error) {
            console.error(error.message);
        }
    };

    private onError = (event: ErrorEvent) => {
        console.error('Ошибка', event.message);
    };

    async init() {
        try {
            if (this._socket) {
                this.destroy();
            }

            const token = await (async () => {
                try {
                    const response: any = await new ChatsAPI().getToken(this._chatID);
                    if (response.status === 'success') {
                        return response.data.token;
                    }
                } catch (error) {
                    console.error(error);
                }
            })();

            this._host = `${Connector.HOST}/${this._userID}/${this._chatID}/${token}`;

            this._socket = new WebSocket(this._host);

            this._socket.addEventListener('open', this.onOpen);
            this._socket.addEventListener('close', this.onClose);
            this._socket.addEventListener('message', this.onMessage);
            this._socket.addEventListener('error', this.onError);

            return true;
        } catch (error) {
            console.log('Ошибка соединения:', error);
        }
    }

    async send(content: string, type = Connector.MSGTYPE.MESSAGE) {
        const options = JSON.stringify({
            content,
            type
        });

        try {
            if (this._socket?.readyState === 1) {
                this._socket.send(options);
            } else {
                setTimeout(() => {
                    if (this._socket) {
                        this._socket.send(options);
                    }
                }, 500);
            }
        } catch (error) {
            console.error('Send message error', error);
        }
    }

    async fetch(lastFetchedMessageId: number = 0) {
        try {
            await this.send(lastFetchedMessageId.toString(), Connector.MSGTYPE.GET_OLD);
        } catch (error) {
            console.error('Send message error', error);
        }
    }

    destroy() {
        if (this._socket) {
            this._socket.removeEventListener('open', this.onOpen);
            this._socket.removeEventListener('close', this.onClose);
            this._socket.removeEventListener('message', this.onMessage);
            this._socket.removeEventListener('error', this.onError);
            this._socket = null;
        }
    }

    close(reason: string = 'Чат удален') {
        if (this._socket) {
            this._socket.close(1000, reason);
            this.destroy();
            console.log('Чат закрыт');
        }
    }
}
