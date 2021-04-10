import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import chatListItemTmpl from './layout.tmpl';

class ChatListItem extends Blockator {
    render() {
        return new Templator(chatListItemTmpl).compile(this.props);
    }
}

export default ChatListItem;
