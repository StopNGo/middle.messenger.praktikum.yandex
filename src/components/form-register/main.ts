import formData from './data.json';
import RegisterController from './controller';

import './style.css';

import Form from '../form/main';
import FormField from '../../components/form-field/main';
import {RegisterData} from '../../modules/api/auth-api';

class FormRegister extends Form {
    DOMstrings!: {[key: string]: string};

    constructor() {
        super(formData.form_body);
    }

    componentDidMount() {
        const formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);

        this.DOMstrings = {
            form: '.register-form',
            dataField: '.register-form input',
            password: '.register-form__password-input',
            passwordRepeat: '.register-form__password-repeat-input'
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
                        const dataFeilds = document.querySelectorAll<HTMLInputElement>(this.DOMstrings.dataField);
                        const data: RegisterData | {[key: string]: string} = {};
                        dataFeilds.forEach(field => {
                            const dataName = field.dataset.name;
                            if (dataName && dataName !== 'password_repeat') {
                                data[dataName] = field.value;
                            }
                        });
                        new RegisterController(this).register(data as RegisterData);
                    }
                }
            ]
        });
    }
}

export default FormRegister;
