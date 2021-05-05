import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormRegister from '../../components/form-register/main';

class RegisterScreen extends Screen {
    formRegister;
    mainWindow;

    constructor() {
        super();

        this.formRegister = new FormRegister();
        this.mainWindow = new MainWindow(screenData);

        this.mainWindow.addNestedBlocksToTag('content', [this.formRegister]);
        this.setMainWindow(this.mainWindow);

        this.setScreenTitle(screenData.screen_title);
    }
}

export default RegisterScreen;
