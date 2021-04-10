import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import ChatList from '../../components/chat-list/main';
import ChatCurrent from '../../components/chat-current/main';
import ProfileBadge from '../../components/profile-badge/main';
import chatWindowTmpl from './layout.tmpl';

const chatListScreen = new Screen();
const chatList = new ChatList();
const chatCurrent = new ChatCurrent();
const mainWindow = new MainWindow(screenData, chatWindowTmpl);
mainWindow.addNestedBlocksToTag('list', [chatList]);
mainWindow.addNestedBlocksToTag('chat', [chatCurrent]);
mainWindow.addNestedBlocksToTag('badge', [new ProfileBadge()]);

chatListScreen.setMainWindow(mainWindow);
chatListScreen.place('body');
