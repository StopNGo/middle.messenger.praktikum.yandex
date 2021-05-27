import chatCurrentData from './data.json';

import Storator from '../../modules/storator/storator';
import Connector, {TMessage} from '../../modules/connector/connector';
import {ChatsAPI} from '../../modules/api/chats-api';
import Blockator from '../../modules/blockator/blockator';
import ChatMessage from '../../components/chat-message/main';
import {sanitize} from '../../modules/utils/utils';
import ChatCurrent from './main';

export default class ChatCurrentController {
    private _block: ChatCurrent;
    private _chatsAPI: ChatsAPI;
    connection!: Connector;

    constructor(block: ChatCurrent) {
        this._block = block;
        this._chatsAPI = new ChatsAPI();
    }

    changeChat(chatID: number) {
        let currentChat = Storator.getData('currentChat');

        if (currentChat !== chatID) {
            if (this.connection) {
                this.connection.close();
            }
        }

        if (!currentChat || currentChat !== chatID) {
            Storator.saveData('currentChat', chatID);
        }

        this.getUsersDataFromAPI(chatID).then(() => {
            return true;
        });

        const profile = Storator.getData('profile');
        const chats = Storator.getData('chats');
        const chat =
            chats[
                chats.findIndex((item: any) => {
                    return item.id === chatID;
                })
            ];

        this._block.props.name = chat.title;

        if (!this.connection || currentChat !== chatID) {
            this.connection = new Connector(profile.id, chat.id);
            this.connection.addOnMeassageAction((data: any) => {
                if (Array.isArray(data)) {
                    this._block.chatSend.switchForm();
                    this._block.deleteNestedBlocksFromTag('messages');
                    data.forEach(message => this.addMessage(message, true));
                } else {
                    this.addMessage(data);
                }
            });
            this.connection.init();
        }
    }

    async addUserToChat(userID: number) {
        const currentChat = Storator.getData('currentChat');
        const response = await this._chatsAPI.addUserToChat(currentChat, userID);
        if (response.status === 'success') {
            this.getUsersDataFromAPI(currentChat).then(() => {
                return true;
            });
        }

        return false;
    }

    async deleteUserFromChat(userID: number) {
        const currentChat = Storator.getData('currentChat');
        const response = await this._chatsAPI.deleteUserFromChat(currentChat, userID);
        if (response.status === 'success') {
            console.log(response);
            this.getUsersDataFromAPI(currentChat).then(() => {
                return true;
            });
        }

        return false;
    }

    getUsersDataFromAPI(chatID: number) {
        return Storator.rewriteDataFromAPI('chat_users', this._chatsAPI.getUsers.bind(this._chatsAPI, chatID));
    }

    addMessage(message: TMessage, old = false) {
        if (message !== null && message !== undefined) {
            let messageClass = '';
            let chatMessageData = {};
            const currentUserID = Storator.getData('profile').id;

            if (message.type === Connector.MSGTYPE.MESSAGE) {
                if (Number(currentUserID) === message.user_id) {
                    messageClass = 'chat-message--outcome';
                } else {
                    messageClass = 'chat-message--income';
                }

                chatMessageData = {
                    time: message.time,
                    content: sanitize(message.content),
                    classes: messageClass
                };
            }

            if (message.type === Connector.MSGTYPE.USER_CONNECTED) {
                const users = Storator.getData('chat_users');
                const user = users.findIndex((item: any) => item.id === Number(message.content));
                const {first_name: userFirstName, display_name: userDisplayName} = users[user];
                messageClass = 'chat-message--notification';
                chatMessageData = {
                    content: `${chatCurrentData.chat_body.user_connected_text} ${userDisplayName === null ? userFirstName : userDisplayName}`,
                    classes: messageClass
                };
            }

            if (old) {
                this._block.props[Blockator.NESTED_BLOCKS_PROPS].messages.push(new ChatMessage(chatMessageData));
            } else {
                this._block.props[Blockator.NESTED_BLOCKS_PROPS].messages.unshift(new ChatMessage(chatMessageData));
            }
        }
    }
}
