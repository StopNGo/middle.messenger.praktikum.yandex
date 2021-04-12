import './style.css';

import Blockator from '../../modules/blockator/blockator';
import chatMessageTmpl from './layout.tmpl';

class ChatMessage extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || chatMessageTmpl);
    }
}

export default ChatMessage;
