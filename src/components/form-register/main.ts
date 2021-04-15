import formData from './data.json';

import './style.css';
import './global-events.ts';

import Form from '../form/main';
import FormField from '../../components/form-field/main';

class FormRegister extends Form {
    constructor() {
        super(formData.form_body);
    }

    componentDidMount() {
        const formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);

        this.setProps({
            events: [
                {
                    /**
                     * Проверяем совпадение паролей
                     */
                    name: 'input',
                    selector: '.register-form__password-input',
                    callback: () => {
                        const passwordField: HTMLInputElement | null = document.querySelector('.register-form__password-input');
                        const passwordRepeatField: HTMLInputElement | null = document.querySelector('.register-form__password-repeat-input');
                        if (passwordField && passwordRepeatField) {
                            passwordField.addEventListener('input', () => {
                                passwordRepeatField.pattern = passwordField.value;
                            });
                        }
                    }
                }
            ]
        });
    }
}

export default FormRegister;
