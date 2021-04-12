import './style.css';

import Blockator from '../../modules/blockator/blockator';
import formTmpl from './layout.tmpl';

class Form extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || formTmpl);
    }
}

export default Form;
