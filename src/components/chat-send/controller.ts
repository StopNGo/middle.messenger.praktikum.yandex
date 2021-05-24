import ChatSend from './main';

export default class ChatSendController {
    private _block: ChatSend;

    constructor(block: ChatSend) {
        this._block = block;
    }

    sendMessage(message: string) {
        const connection = this._block.chatCurrent.getConnection();
        if (connection) {
            connection.send(message);
        }
    }
}
