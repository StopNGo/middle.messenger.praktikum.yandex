import {AuthAPI, RegisterData} from '../../modules/api/auth-api';
import {TBlockator} from '../../modules/blockator/blockator';

export default class LoginController {
    private _block: TBlockator;

    constructor(block: TBlockator) {
        this._block = block;
    }

    async register(formData: RegisterData) {
        try {
            new AuthAPI().register(formData).then(response => {
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
