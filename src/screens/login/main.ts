import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormLogin from '../../components/form-login/main';

class LoginScreen extends Screen {
    formLogin;
    mainWindow;

    constructor() {
        super();

        this.formLogin = new FormLogin();
        this.mainWindow = new MainWindow(screenData);

        this.mainWindow.addNestedBlocksToTag('content', [this.formLogin]);
        this.setMainWindow(this.mainWindow);

        this.setScreenTitle(screenData.screen_title);
    }
}

export default LoginScreen;
