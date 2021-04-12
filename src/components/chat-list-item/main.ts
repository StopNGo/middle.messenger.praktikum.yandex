import './style.css';

import Blockator from '../../modules/blockator/blockator';
import chatListItemTmpl from './layout.tmpl';

class ChatListItem extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || chatListItemTmpl);
    }
}

export default ChatListItem;
