import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import chatMessageTmpl from './layout.tmpl';

class ChatMessage extends Blockator {
    render() {
        return new Templator(chatMessageTmpl).compile(this.props);
    }
}

export default ChatMessage;
