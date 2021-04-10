import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import ErrorPage from '../../components/error-page/main';

const errorScreen = new Screen();
const errorPage = new ErrorPage(screenData);
const mainWindow = new MainWindow(screenData);
mainWindow.addNestedBlocksToTag('content', [errorPage]);

errorScreen.setMainWindow(mainWindow);
errorScreen.place('body');
