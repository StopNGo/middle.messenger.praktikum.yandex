import Storator from '../../modules/storator/storator';
import ChatListItem from './main';
import Blockator, {TBlockator} from '../../modules/blockator/blockator';

export default class ChatListController {
    private _block: ChatListItem;

    constructor(block: ChatListItem) {
        this._block = block;
    }

    setHighlighState() {
        const currentChat = Storator.getData('currentChat');
        const chatList = this._block.chatList;
        if (chatList) {
            chatList.props[Blockator.NESTED_BLOCKS_PROPS].items.forEach((item: TBlockator) => {
                if (currentChat === Number(item.props.id)) {
                    item.props.classes = 'chat-list-item--active';
                } else {
                    item.props.classes = '';
                }
            });
        }
    }
}
