import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import ErrorPage from '../../components/error-page/main';

class Error505Screen extends Screen {
    errorPage;
    mainWindow;

    constructor() {
        super();

        this.errorPage = new ErrorPage(screenData);
        this.mainWindow = new MainWindow(screenData);

        this.mainWindow.addNestedBlocksToTag('content', [this.errorPage]);
        this.setMainWindow(this.mainWindow);

        this.setScreenTitle(screenData.screen_title);
    }
}

export default Error505Screen;
