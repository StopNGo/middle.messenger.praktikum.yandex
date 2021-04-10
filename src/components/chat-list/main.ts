import chatListData from './data.json';
import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import ChatListItem from '../../components/chat-list-item/main';
import chatListTmpl from './layout.tmpl';

class ChatList extends Blockator {
    constructor(addProps?: {}) {
        super('div', {});
        this.setProps(addProps);
        this.setProps(chatListData.list_body);
    }

    render() {
        return new Templator(chatListTmpl).compile(this.props);
    }

    componentDidMount() {
        let chatListItems = chatListData.items.map((field: {}) => new ChatListItem('div', field));
        this.addNestedBlocksToTag('items', chatListItems);
    }
}

export default ChatList;
