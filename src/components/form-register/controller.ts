import {AuthAPI, RegisterData} from '../../modules/api/auth-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class LoginController {
    private _block: TBlockator;
    private _authAPI: AuthAPI;

    constructor(block: TBlockator) {
        this._block = block;
        this._authAPI = new AuthAPI();
    }

    async register(formData: RegisterData) {
        try {
            this._authAPI.register(formData).then(response => {
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
