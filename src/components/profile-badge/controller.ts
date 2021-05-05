import Storator from '../../modules/storator/storator';
import {AuthAPI} from '../../modules/api/auth-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class ProfileBadgeController {
    private _block: TBlockator;
    private _authAPI: AuthAPI;

    constructor(block: TBlockator) {
        this._block = block;
        this._authAPI = new AuthAPI();
    }

    getDataFromAPI() {
        return Storator.saveDataFromAPI('profile', this._authAPI.profile.bind(this._authAPI));
    }

    setAvatar() {
        this.getDataFromAPI().then(() => {
            const avatar = Storator.getData('profile').avatar;
            this._block.props.avatar = avatar;
        });
    }
}
