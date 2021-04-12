import formData from './data.json';

import './style.css';
import './global-events.ts';

import Form from '../form/main';
import FormField from '../../components/form-field/main';
import formTmpl from './layout.tmpl';

class FormRegister extends Form {
    constructor() {
        super(formData.form_body, formTmpl);
    }

    componentDidMount() {
        const formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);
    }
}

export default FormRegister;
