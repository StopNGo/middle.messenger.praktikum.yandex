import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormPassword from '../../components/form-password/main';

class PasswordScreen extends Screen {
    formPassword;
    mainWindow;

    constructor() {
        super();

        this.formPassword = new FormPassword();
        this.mainWindow = new MainWindow(screenData);

        this.mainWindow.addNestedBlocksToTag('content', [this.formPassword]);
        this.setMainWindow(this.mainWindow);

        this.setScreenTitle(screenData.screen_title);
    }
}

export default PasswordScreen;
