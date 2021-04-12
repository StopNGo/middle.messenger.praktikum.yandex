import chatCurrentData from './data.json';
import './style.css';

import Blockator from '../../modules/blockator/blockator';
import ChatMessage from '../../components/chat-message/main';
import ChatSend from '../../components/chat-send/main';
import chatCurrentTmpl from './layout.tmpl';

class ChatCurrent extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || chatCurrentTmpl);
        this.setProps(chatCurrentData.chat_body);
    }

    componentDidMount() {
        let chatMessages = chatCurrentData.messages.map((message: {}) => new ChatMessage(message));
        this.addNestedBlocksToTag('messages', chatMessages);
        this.addNestedBlocksToTag('send', [new ChatSend()]);
    }
}

export default ChatCurrent;
