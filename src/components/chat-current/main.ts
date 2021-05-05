import chatCurrentData from './data.json';
import ChatCurrentController from './controller';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import ChatSend from '../../components/chat-send/main';
import chatCurrentTmpl from './layout.tmpl';
import {sanitize} from '../../modules/utils/utils';

class ChatCurrent extends Blockator {
    DOMstrings: {[key: string]: string};
    controller: ChatCurrentController;

    constructor(props?: {}, tmpl?: string) {
        super('div', props, tmpl || chatCurrentTmpl);
        this.setProps(chatCurrentData.chat_body);
    }

    componentDidMount() {
        const chooseBlockTmpl = `<div class="chat-current__choose">{{choose}}</div>`;
        const chooseBlock = new Blockator('div', {choose: 'Выберите чат'}, chooseBlockTmpl);
        this.addNestedBlocksToTag('messages', [chooseBlock]);
        this.addNestedBlocksToTag('send', [new ChatSend(this)]);

        this.controller = new ChatCurrentController(this);

        this.DOMstrings = {
            add: '.chat-current__action--add-user',
            delete: '.chat-current__action--delete-user'
        };

        this.setProps({
            events: [
                {
                    name: 'click',
                    selector: this.DOMstrings.add,
                    callback: () => {
                        const userID = prompt(chatCurrentData.chat_body.add_prompt);
                        if (userID) {
                            this.controller.addUserToChat(Number(sanitize(userID))).then(() => {});
                        }
                    }
                },
                {
                    name: 'click',
                    selector: this.DOMstrings.delete,
                    callback: () => {
                        const userID = prompt(chatCurrentData.chat_body.delete_prompt);
                        if (userID) {
                            this.controller.addUserToChat(Number(sanitize(userID))).then(() => {});
                        }
                    }
                }
            ]
        });
    }
}

export default ChatCurrent;
