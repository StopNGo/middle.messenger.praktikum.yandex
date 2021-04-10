import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormRegister from '../../components/form-register/main';

const loginScreen = new Screen();
const formRegister = new FormRegister();
const mainWindow = new MainWindow(screenData);
mainWindow.addNestedBlocksToTag('content', [formRegister]);

loginScreen.setMainWindow(mainWindow);
loginScreen.place('body');
