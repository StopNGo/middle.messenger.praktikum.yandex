import Storator from '../../modules/storator/storator';
import {AuthAPI} from '../../modules/api/auth-api';
import {UsersAPI, ProfileData} from '../../modules/api/users-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class ProfileController {
    private _block: TBlockator;
    private _authAPI: AuthAPI;
    private _usersAPI: UsersAPI;

    constructor(block: TBlockator) {
        this._block = block;
        this._authAPI = new AuthAPI();
        this._usersAPI = new UsersAPI();
    }

    getDataFromAPI() {
        return Storator.saveDataFromAPI('profile', this._authAPI.profile.bind(this._authAPI));
    }

    populateFormData(formData: any) {
        const data = Storator.getData('profile');
        this._block.props.id = data.id;
        Object.entries(data as {[key: string]: string}).forEach(([key, value]) => {
            const index = formData.fields.findIndex((el: any) => el.data_name === key);
            if (index >= 0) {
                if (value === null) {
                    value = '';
                }

                formData.fields[index].value = value;
            }
        });

        formData.form_body.avatar = data.avatar;

        return formData;
    }

    async logout() {
        const response = await this._authAPI.logout();
        if (response.status === 'success') {
            Storator.clearAllData();
            document.location.reload();
            return true;
        }

        return false;
    }

    async changeProfile(data: ProfileData) {
        const response = await this._usersAPI.changeProfile(data);
        if (response.status === 'success') {
            Storator.rewriteDataFromAPI('profile', this._authAPI.profile.bind(this._authAPI));
            return true;
        }

        return false;
    }

    async changeAvatar(data: FormData) {
        const response = await this._usersAPI.changeAvatar(data);
        if (response.status === 'success') {
            Storator.rewriteDataFromAPI('profile', this._authAPI.profile.bind(this._authAPI)).then(() => {
                const profile = Storator.getData('profile');
                this._block.props.avatar = profile.avatar;
                return true;
            });
        }

        return false;
    }
}
