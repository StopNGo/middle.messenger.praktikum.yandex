import formData from './data.json';

import './style.css';
import './global-events.ts';

import Templator from '../../modules/templator/templator';
import Form from '../form/main';
import FormField from '../../components/form-field/main';
import formTmpl from './layout.tmpl';

class FormRegister extends Form {
    constructor(addProps?: {}) {
        super({});
        this.setProps(addProps);
        this.setProps(formData.form_body);
    }

    componentDidMount() {
        const formFields = formData.fields.map((field: {}) => new FormField('div', field));
        this.addNestedBlocksToTag('fields', formFields);
    }

    render() {
        return new Templator(formTmpl).compile(this.props);
    }
}

export default FormRegister;
