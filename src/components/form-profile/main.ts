import formData from './data.json';
import ProfileController from './controller';

import './style.css';

import Form from '../form/main';
import FormField from '../../components/form-field/main';
import formTmpl from './layout.tmpl';
import {ProfileData} from '../../modules/api/users-api';

class FormRegister extends Form {
    DOMstrings!: {[key: string]: string};
    private _controller!: ProfileController;
    private _formData: any;

    constructor() {
        super(formData.form_body, formTmpl);
    }

    componentDidMount() {
        this.DOMstrings = {
            form: '.profile',
            profileForm: 'profile-form',
            avatarForm: '.profile__avatar-form',
            avatarInput: '.profile__avatar-input',
            changeData: 'change-data',
            dataField: '.profile input',
            avatarImg: '.profile__avatar img',
            logout: '.profile__logoutlink'
        };

        this._controller = new ProfileController(this);

        this._controller.getDataFromAPI().then(() => {
            this._formData = this._controller.populateFormData(formData);
            const formFields = this._formData.fields.map((field: {}) => new FormField(field));
            this.addNestedBlocksToTag('fields', formFields);
        });

        this.setProps({
            events: [
                {
                    name: 'submit',
                    selector: this.DOMstrings.form,
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        const profileForm = document.getElementById(this.DOMstrings.profileForm);
                        const changeData = document.getElementById(this.DOMstrings.changeData);
                        if (profileForm && changeData) {
                            const dataFeilds = document.querySelectorAll<HTMLInputElement>(this.DOMstrings.dataField);
                            if (dataFeilds) {
                                if (changeData.dataset.action === 'change') {
                                    event.preventDefault();
                                    dataFeilds.forEach(field => {
                                        field.readOnly = false;
                                    });
                                    changeData.dataset.action = 'save';
                                    if (changeData.firstElementChild) {
                                        changeData.firstElementChild.textContent = formData.form_body.save_data_text;
                                    }
                                } else if (changeData.dataset.action === 'save') {
                                    event.preventDefault();
                                    const dataOutput: ProfileData | {[key: string]: string} = {};
                                    dataFeilds.forEach((field: HTMLInputElement) => {
                                        const dataName = field.dataset.name;
                                        if (dataName) {
                                            dataOutput[dataName] = field.value;
                                        }
                                    });

                                    this._controller.changeProfile(dataOutput as ProfileData).then(res => {
                                        if (res) {
                                            dataFeilds.forEach(field => {
                                                field.readOnly = true;
                                            });
                                            changeData.dataset.action = 'change';
                                            if (changeData.firstElementChild) {
                                                changeData.firstElementChild.textContent = formData.form_body.change_data_text;
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                },
                {
                    name: 'click',
                    selector: this.DOMstrings.logout,
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        this._controller.logout();
                    }
                },
                {
                    name: 'submit',
                    selector: this.DOMstrings.avatarForm,
                    callback: (event: InputEvent) => {
                        event.preventDefault();
                        const form: HTMLFormElement | null = this.getContent().querySelector(this.DOMstrings.avatarForm);
                        if (form) {
                            const formData = new FormData(form);
                            this._controller.changeAvatar(formData);
                        }
                    }
                },
                {
                    name: 'change',
                    selector: this.DOMstrings.avatarInput,
                    callback: () => {
                        const form = this.getContent().querySelector(this.DOMstrings.avatarForm);
                        if (form) {
                            form.dispatchEvent(new Event('submit'));
                        }
                    }
                }
            ]
        });
    }
}

export default FormRegister;
