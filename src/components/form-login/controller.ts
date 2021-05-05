import {AuthAPI, LoginData} from '../../modules/api/auth-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class LoginController {
    private _block: TBlockator;

    constructor(block: TBlockator) {
        this._block = block;
    }

    async login(formData: LoginData) {
        try {
            const data = {
                login: formData.login,
                password: formData.password
            };

            new AuthAPI().login(data).then(response => {
                const res = response;
                if (res.status === 'success') {
                    document.location.reload();
                } else {
                    this._block.setProps({error: response.reason});
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }
}
