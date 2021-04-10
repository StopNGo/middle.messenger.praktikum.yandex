import chatCurrentData from './data.json';
import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import ChatMessage from '../../components/chat-message/main';
import ChatSend from '../../components/chat-send/main';
import chatCurrentTmpl from './layout.tmpl';

class ChatCurrent extends Blockator {
    constructor(addProps?: {}) {
        super('div', {});
        this.setProps(addProps);
        this.setProps(chatCurrentData.chat_body);
    }

    render() {
        return new Templator(chatCurrentTmpl).compile(this.props);
    }

    componentDidMount() {
        let chatMessages = chatCurrentData.messages.map((message: {}) => new ChatMessage('div', message));
        this.addNestedBlocksToTag('messages', chatMessages);
        this.addNestedBlocksToTag('send', [new ChatSend()]);
    }
}

export default ChatCurrent;
