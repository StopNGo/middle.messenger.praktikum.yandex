import Storator from '../../modules/storator/storator';
import {ChatsAPI, ChatData} from '../../modules/api/chats-api';
import ChatList from './main';

export default class ChatListController {
    private _block: ChatList;
    private _chatsAPI: ChatsAPI;

    constructor(block: ChatList) {
        this._block = block;
        this._chatsAPI = new ChatsAPI();
    }

    getDataFromAPI() {
        return Storator.rewriteDataFromAPI('chats', this._chatsAPI.getChats.bind(this._chatsAPI));
    }

    populateChatsList(chatListData: any) {
        const data = Storator.getData('chats');
        const items: any[] = [];
        data.forEach(({id, title, unread_count, last_message}: ChatData, index: number) => {
            items[index] = {
                id: id,
                name: title,
                counter: unread_count
            };

            if (last_message !== null) {
                const lastMessage = JSON.parse(last_message);
                const date = new Date(lastMessage.time);
                items[index] = {
                    ...items[index],
                    time: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                    text: lastMessage.content,
                    avatar: this._chatsAPI.getResourceURL(lastMessage.user.avatar)
                };
            }
        });

        chatListData.items = items;
        return chatListData;
    }

    async addChat(chatName: string) {
        const response = await this._chatsAPI.addChat(chatName);
        if (response.status === 'success') {
            this._block.deleteNestedBlocksFromTag('items');
            const block: ChatList = this._block as ChatList;
            block.refreshList();
            return true;
        }

        return false;
    }

    async deleteChat(chatID: number) {
        const response = await this._chatsAPI.deleteChat(chatID);
        if (response.status === 'success') {
            this._block.deleteNestedBlocksFromTag('items');
            let block: ChatList = this._block as ChatList;
            block.refreshList();
            this._block.chatCurrent.clearMessages();
            this._block.chatCurrent.showChooseBlock();
            return true;
        }

        return false;
    }
}
