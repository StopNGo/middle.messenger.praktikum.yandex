import Storator from '../../modules/storator/storator';
import {ChatsAPI, ChatData} from '../../modules/api/chats-api';
import {TBlockator} from '../../modules/blockator/blockator';
import ChatList from './main';

export default class ChatListController {
    private _block: TBlockator;
    private _chatsAPI: ChatsAPI;

    constructor(block: TBlockator) {
        this._block = block;
        this._chatsAPI = new ChatsAPI();
    }

    getDataFromAPI() {
        return Storator.rewriteDataFromAPI('chats', this._chatsAPI.getChats.bind(this._chatsAPI));
    }

    populateChatsList(chatListData: any) {
        const data = Storator.getData('chats');
        const items: any[] = [];
        data.forEach((item: ChatData, index: number) => {
            items[index] = {
                id: item.id,
                name: item.title,
                counter: item.unread_count
            };

            if (item.last_message !== null) {
                const last_message = JSON.parse(item.last_message);
                const date = new Date(last_message.time);
                items[index] = {
                    ...items[index],
                    time: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                    text: last_message.content,
                    avatar: this._chatsAPI.getResourceURL(last_message.user.avatar)
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
            let block: ChatList = this._block as ChatList;
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
            return true;
        }

        return false;
    }
}
