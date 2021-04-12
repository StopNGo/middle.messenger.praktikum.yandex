import formData from './data.json';

import './style.css';

import Form from '../form/main';
import FormField from '../../components/form-field/main';

class FormRegister extends Form {
    constructor() {
        super(formData.form_body);
    }

    componentDidMount() {
        const formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);
    }
}

export default FormRegister;
