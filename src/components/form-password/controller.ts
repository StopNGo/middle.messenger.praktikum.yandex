import formData from './data.json';

import {UsersAPI, PasswordData} from '../../modules/api/users-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class LoginController {
    private _block: TBlockator;
    private _usersAPI: UsersAPI;

    constructor(block: TBlockator) {
        this._block = block;
        this._usersAPI = new UsersAPI();
    }

    async changePassword(data: PasswordData) {
        const response = await this._usersAPI.changePassword(data);
        console.log(formData);
        if (response.status === 'success') {
            console.log(response);
            this._block.setProps({confirmation: formData.form_body.confirmation_text});
            this._block.setProps({error: ''});
            const form = this._block.getContent().querySelector('form');
            if (form) {
                form.reset();
            }

            return true;
        }

        this._block.setProps({error: response.reason});
        this._block.setProps({confirmation: ''});
        return false;
    }
}
