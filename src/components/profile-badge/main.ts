import profileBadgeData from './data.json';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import profileBadgeTmpl from './layout.tmpl';

class ProfileBadge extends Blockator {
    constructor(addProps?: {}) {
        super('div', profileBadgeData.badge_body);
        this.setProps(addProps);
    }

    render() {
        return new Templator(profileBadgeTmpl).compile(this.props);
    }
}

export default ProfileBadge;
