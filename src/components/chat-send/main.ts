import chatSendData from './data.json';
import ChatSendController from './controller';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import {sanitize, sleep} from '../../modules/utils/utils';
import chatSendTmpl from './layout.tmpl';

class ChatSend extends Blockator {
    DOMstrings!: Record<string, string>;
    private _controller: ChatSendController;
    chatCurrent: any;

    constructor(chatCurrent: any, props?: {}, tmpl?: string) {
        super('div', props, tmpl || chatSendTmpl);
        this.setProps(chatSendData);
        this._controller = new ChatSendController(this);
        this.chatCurrent = chatCurrent;
    }

    componentDidMount() {
        this.DOMstrings = {
            input: '.chat-current__send-input',
            send: '.chat-current__send-button'
        };

        this.setProps({
            events: [
                {
                    name: 'submit',
                    selector: 'form',
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        sleep(5).then(() => {
                            if (event.target as any) {
                                const target = event.target as HTMLElement;
                                const input = target.querySelector<HTMLInputElement>(this.DOMstrings.input);
                                if (input && input.value !== '') {
                                    this._controller.sendMessage(sanitize(input.value));
                                    input.value = '';
                                }
                            }
                        });
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

    switchForm() {
        const elements = [
            this.getContent().querySelector<HTMLInputElement>(this.DOMstrings.input),
            this.getContent().querySelector<HTMLInputElement>(this.DOMstrings.send)
        ];

        elements.forEach(el => {
            if (el) {
                if (el.disabled) {
                    el.disabled = false;
                }
            }
        });
    }
}

export default ChatSend;
