import screenData from './data.json';

import Screen from '../../components/screen/main';
import MainWindow from '../../components/main-window/main';
import FormProfile from '../../components/form-profile/main';

class ProfileScreen extends Screen {
    formProfile;
    mainWindow;

    constructor() {
        super();
        this.formProfile = new FormProfile();
        this.mainWindow = new MainWindow(screenData);

        this.mainWindow.addNestedBlocksToTag('content', [this.formProfile]);
        this.setMainWindow(this.mainWindow);

        this.setScreenTitle(screenData.screen_title);
    }
}

export default ProfileScreen;
