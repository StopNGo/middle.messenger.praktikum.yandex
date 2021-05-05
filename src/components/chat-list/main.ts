import chatListData from './data.json';
import './style.css';
import ChatListController from './controller';

import Blockator from '../../modules/blockator/blockator';
import ChatListItem from '../../components/chat-list-item/main';
import chatListTmpl from './layout.tmpl';
import {sanitize} from '../../modules/utils/utils';

class ChatList extends Blockator {
    DOMstrings: {[key: string]: string};
    controller: ChatListController;
    private _chatListData: any;
    private _chatCurrent: any;

    constructor(chatCurrent: any, props?: {}, tmpl?: string) {
        super('div', props, tmpl || chatListTmpl);
        this.setProps(chatListData.list_body);

        this._chatCurrent = chatCurrent;
        if (this._chatCurrent) {
            this._chatListData = chatListData;
        }
    }

    componentDidMount() {
        this.controller = new ChatListController(this);

        this.refreshList();

        this.DOMstrings = {
            add: '.chat-list__add-button'
        };

        this.setProps({
            events: [
                {
                    name: 'click',
                    selector: this.DOMstrings.add,
                    callback: () => {
                        const chatName = prompt(chatListData.list_body.add_text);
                        if (chatName) {
                            this.controller.addChat(sanitize(chatName)).then(() => {});
                        }
                    }
                }
            ]
        });
    }

    refreshList() {
        this.controller.getDataFromAPI().then(() => {
            this._chatListData = this.controller.populateChatsList(this._chatListData);
            const chatListItems = this._chatListData.items.map((item: {}) => new ChatListItem(this, item));
            this.addNestedBlocksToTag('items', chatListItems);
        });
    }
}

export default ChatList;
