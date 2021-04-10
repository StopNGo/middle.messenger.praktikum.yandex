import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormProfile from '../../components/form-profile/main';

const loginScreen = new Screen();
const formProfile = new FormProfile();
const mainWindow = new MainWindow(screenData);
mainWindow.addNestedBlocksToTag('content', [formProfile]);

loginScreen.setMainWindow(mainWindow);
loginScreen.place('body');
