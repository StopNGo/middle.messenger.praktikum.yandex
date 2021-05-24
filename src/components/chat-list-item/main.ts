import chatItemData from './data.json';
import './style.css';
import ChatListItemController from './controller';

import Blockator from '../../modules/blockator/blockator';
import ChatList from '../../components/chat-list/main';
import chatListItemTmpl from './layout.tmpl';

class ChatListItem extends Blockator {
    DOMstrings!: Record<string, string>;
    chatList: ChatList;
    private _controller!: ChatListItemController;

    constructor(chatList: ChatList, props: {}, tmpl?: string) {
        super('div', props, tmpl || chatListItemTmpl);
        this.chatList = chatList;
    }

    componentDidMount() {
        this.DOMstrings = {
            delete: '.chat-list-item__delete',
            item: '.chat-list-item'
        };

        this._controller = new ChatListItemController(this);
        this._controller.setHighlighState();

        this.setProps({
            events: [
                {
                    name: 'click',
                    selector: this.DOMstrings.delete,
                    callback: (e: MouseEvent) => {
                        e.stopPropagation();
                        if (confirm(chatItemData.delete_text)) {
                            this.chatList.controller.deleteChat(this.props.id);
                        }
                    }
                },
                {
                    name: 'click',
                    selector: this.DOMstrings.item,
                    callback: () => {
                        this.chatList.chatCurrent.controller.changeChat(this.props.id);
                        this._controller.setHighlighState();
                    }
                }
            ]

        });
    }
}

export default ChatListItem;
