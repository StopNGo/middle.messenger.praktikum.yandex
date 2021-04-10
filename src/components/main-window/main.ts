import './../../style/normalize.css';
import './../../style/theme.css';
import './../../style/common.css';
import './../../style/typo.css';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import mainWindowTmpl from './layout.tmpl';

class MainWindow extends Blockator {
    tmpl: string;
    constructor(props: {}, tmpl?: string) {
        super('div');
        this.setProps(props);
        if (tmpl) {
            this.tmpl = tmpl;
        } else {
            this.tmpl = mainWindowTmpl;
        }
    }

    render() {
        if (this.tmpl) {
            return new Templator(this.tmpl).compile(this.props);
        }

        return new Templator(mainWindowTmpl).compile(this.props);
    }
}

export default MainWindow;
