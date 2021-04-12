import chatListData from './data.json';
import './style.css';

import Blockator from '../../modules/blockator/blockator';
import ChatListItem from '../../components/chat-list-item/main';
import chatListTmpl from './layout.tmpl';

class ChatList extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || chatListTmpl);
        this.setProps(chatListData.list_body);
    }

    componentDidMount() {
        let chatListItems = chatListData.items.map((item: {}) => new ChatListItem(item));
        this.addNestedBlocksToTag('items', chatListItems);
    }
}

export default ChatList;
