import formData from './data.json';
import LoginController from './controller';

import Form from '../form/main';
import FormField from '../../components/form-field/main';

class FormLogin extends Form {
    DOMstrings: {[key: string]: string};

    constructor() {
        super(formData.form_body);
    }

    componentDidMount() {
        let formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);

        this.DOMstrings = {
            form: '.login-form',
            login: '.login-form__login-input',
            password: '.login-form__password-input'
        };

        this.setProps({
            events: [
                {
                    name: 'submit',
                    selector: this.DOMstrings.form,
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        const login: HTMLInputElement | null = document.querySelector(this.DOMstrings.login);
                        const password: HTMLInputElement | null = document.querySelector(this.DOMstrings.password);
                        if (login && password) {
                            const data = {
                                login: login.value,
                                password: password.value
                            };

                            new LoginController(this).login(data);
                        }
                    }
                }
            ]
        });
    }
}

export default FormLogin;
