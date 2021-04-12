import chatSendData from './data.json';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import chatSendTmpl from './layout.tmpl';

class ChatSend extends Blockator {
    constructor(props?: {}, tmpl?: string) {
        super('div', props, tmpl || chatSendTmpl);
        this.setProps(chatSendData);
    }

    componentDidMount() {
        this.setProps({
            events: [
                {
                    name: 'submit',
                    selector: 'form',
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        if (event.target as any) {
                            const target = event.target as HTMLElement;
                            const input = target.querySelector('.chat-current__send-input') as HTMLInputElement;
                            if (input) {
                                input.value = '';
                            }
                        }
                    }
                },
                {
                    name: 'input',
                    selector: 'input',
                    callback: (event: InputEvent) => {
                        const target = event.target as HTMLInputElement;
                        if (target) {
                            if (target.validity.patternMismatch) {
                                target.setCustomValidity(chatSendData.message);
                            } else {
                                target.setCustomValidity('');
                            }
                        }
                    }
                }
            ]
        });
    }
}

export default ChatSend;
