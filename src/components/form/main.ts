import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import formTmpl from './layout.tmpl';

class Form extends Blockator {
    constructor(props: {}) {
        super('div', props);
    }

    render() {
        return new Templator(formTmpl).compile(this.props);
    }
}

export default Form;
