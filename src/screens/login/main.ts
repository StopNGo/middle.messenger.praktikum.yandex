import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormLogin from '../../components/form-login/main';

const loginScreen = new Screen();
const formLogin = new FormLogin();
const mainWindow = new MainWindow(screenData);
mainWindow.addNestedBlocksToTag('content', [formLogin]);

loginScreen.setMainWindow(mainWindow);
loginScreen.place('body');
