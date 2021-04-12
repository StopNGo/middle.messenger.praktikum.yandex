import './style.css';

import Blockator from '../../modules/blockator/blockator';
import errorPageTmpl from './layout.tmpl';

class ErrorPage extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || errorPageTmpl);
    }
}

export default ErrorPage;
