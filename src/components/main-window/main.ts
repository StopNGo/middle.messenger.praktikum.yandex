import './../../style/normalize.css';
import './../../style/theme.css';
import './../../style/common.css';
import './../../style/typo.css';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import mainWindowTmpl from './layout.tmpl';

class MainWindow extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || mainWindowTmpl);
    }
}

export default MainWindow;
