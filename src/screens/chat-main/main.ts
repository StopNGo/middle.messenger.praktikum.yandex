import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import ChatList from '../../components/chat-list/main';
import ChatCurrent from '../../components/chat-current/main';
import ProfileBadge from '../../components/profile-badge/main';
import chatWindowTmpl from './layout.tmpl';

class ChatListScreen extends Screen {
    chatList;
    chatCurrent;
    mainWindow;

    constructor() {
        super();

        this.chatCurrent = new ChatCurrent();
        this.chatList = new ChatList(this.chatCurrent);
        this.mainWindow = new MainWindow(screenData, chatWindowTmpl);

        this.mainWindow.addNestedBlocksToTag('list', [this.chatList]);
        this.mainWindow.addNestedBlocksToTag('chat', [this.chatCurrent]);
        this.mainWindow.addNestedBlocksToTag('badge', [new ProfileBadge()]);
        this.setMainWindow(this.mainWindow);

        this.setScreenTitle(screenData.screen_title);
    }
}

export default ChatListScreen;
