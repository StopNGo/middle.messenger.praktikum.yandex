import {AuthAPI, LoginData} from '../../modules/api/auth-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class LoginController {
    private _block: TBlockator;
    private _authAPI: AuthAPI;

    constructor(block: TBlockator) {
        this._block = block;
        this._authAPI = new AuthAPI();
    }

    async login(formData: LoginData) {
        try {
            const data = {
                login: formData.login,
                password: formData.password
            };

            this._authAPI
                .login(data)
                .then(() => {
                    document.location.reload();
                })
                .catch(({reason}) => {
                    this._block.setProps({error: reason});
                });
        } catch (error) {
            console.warn(error);
        }
    }
}
