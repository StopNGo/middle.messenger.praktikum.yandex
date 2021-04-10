import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import errorPageTmpl from './layout.tmpl';

class ErrorPage extends Blockator {
    constructor(props?: {}) {
        super('div');
        this.setProps(props);
    }

    render() {
        return new Templator(errorPageTmpl).compile(this.props);
    }
}

export default ErrorPage;
