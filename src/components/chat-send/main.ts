import chatSendData from './data.json';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import chatSendTmpl from './layout.tmpl';

class ChatSend extends Blockator {
    constructor() {
        super('div', chatSendData);
    }

    componentDidMount() {
        this.setProps({
            events: {
                submit: (event: InputEvent) => {
                    event.preventDefault();
                    if (event.target as any) {
                        const target = event.target as HTMLElement;
                        const input = target.querySelector('.chat-current__send-input') as HTMLInputElement;
                        if (input) {
                            input.value = '';
                        }
                    }
                }
            }
        });
    }

    render() {
        return new Templator(chatSendTmpl).compile(this.props);
    }

    _addEvents() {
        const {events = {}} = this.props;
        const input: HTMLInputElement | null = this.getContent().querySelector('.chat-current__send-input');
        if (input) {
            input.addEventListener('input', function () {
                if (input.validity.patternMismatch) {
                    input.setCustomValidity(chatSendData.message);
                } else {
                    input.setCustomValidity('');
                }
            });
        }

        console.log(input);
        Object.keys(events).forEach(eventName => {
            const form = this.getContent().querySelector('form');
            if (form) {
                form.addEventListener(eventName, events[eventName]);
            }
        });
    }
}

export default ChatSend;
