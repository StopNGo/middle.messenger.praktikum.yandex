import chatCurrentData from './data.json';
import ChatCurrentController from './controller';

import './style.css';

import Blockator, {TBlockator} from '../../modules/blockator/blockator';
import ChatSend from '../../components/chat-send/main';
import chatCurrentTmpl from './layout.tmpl';
import chatChooseTmpl from './layout-choose.tmpl';
import {sanitize} from '../../modules/utils/utils';

class ChatCurrent extends Blockator {
    DOMstrings!: Record<string, string>;
    controller!: ChatCurrentController;
    private _chooseBlock!: TBlockator;

    constructor(props?: {}, tmpl?: string) {
        super('div', props, tmpl || chatCurrentTmpl);
        this.setProps(chatCurrentData.chat_body);
    }

    componentDidMount() {
        this._chooseBlock = new Blockator('div', {choose_message: chatCurrentData.chat_body.choose_message}, chatChooseTmpl);
        this.addNestedBlocksToTag('messages', [this._chooseBlock]);
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
                            this.controller.addUserToChat(Number(sanitize(userID)));
                        }
                    }
                },
                {
                    name: 'click',
                    selector: this.DOMstrings.delete,
                    callback: () => {
                        const userID = prompt(chatCurrentData.chat_body.delete_prompt);
                        if (userID) {
                            this.controller.deleteUserFromChat(Number(sanitize(userID)));
                        }
                    }
                }
            ]
        });
    }

    showChooseBlock() {
        this.addNestedBlocksToTag('messages', [this._chooseBlock]);
    }

    clearMessages() {
        this.deleteNestedBlocksFromTag('messages');
    }

    getConnection() {
        return this.controller.connection;
    }
}

export default ChatCurrent;
