import formData from './data.json';

import Form from '../form/main';
import FormField from '../../components/form-field/main';

class FormLogin extends Form {
    constructor() {
        super(formData.form_body);
    }

    componentDidMount() {
        let formFields = formData.fields.map((field: {}) => new FormField(field));
        this.addNestedBlocksToTag('fields', formFields);
    }
}

export default FormLogin;
