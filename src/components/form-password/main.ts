import formData from './data.json';
import PasswordController from './controller';

import Form from '../form/main';
import FormField from '../form-field/main';

class FormPassword extends Form {
    DOMstrings!: {[key: string]: string};

    constructor() {
        super(formData.form_body);
    }

    componentDidMount() {
        let formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);

        this.DOMstrings = {
            form: '.password-form',
            passwordOld: '.password-form__password-old-input',
            password: '.password-form__password-input',
            passwordRepeat: '.password-form__password-repeat-input'
        };

        this.setProps({
            events: [
                {
                    /**
                     * Проверяем совпадение паролей
                     */
                    name: 'input',
                    selector: this.DOMstrings.password,
                    callback: () => {
                        const passwordField: HTMLInputElement | null = document.querySelector(this.DOMstrings.password);
                        const passwordRepeatField: HTMLInputElement | null = document.querySelector(this.DOMstrings.passwordRepeat);
                        if (passwordField && passwordRepeatField) {
                            passwordField.addEventListener('input', () => {
                                passwordRepeatField.pattern = passwordField.value;
                            });
                        }
                    }
                },
                {
                    name: 'submit',
                    selector: this.DOMstrings.form,
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        const passwordOld: HTMLInputElement | null = document.querySelector(this.DOMstrings.passwordOld);
                        const password: HTMLInputElement | null = document.querySelector(this.DOMstrings.password);
                        const passwordRepeat: HTMLInputElement | null = document.querySelector(this.DOMstrings.passwordRepeat);
                        if (passwordOld && password && passwordRepeat) {
                            const data = {
                                oldPassword: passwordOld.value,
                                newPassword: password.value
                            };

                            new PasswordController(this).changePassword(data);
                        }
                    }
                }
            ]
        });
    }
}

export default FormPassword;
