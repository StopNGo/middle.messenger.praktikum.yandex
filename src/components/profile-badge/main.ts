import profileBadgeData from './data.json';
import ProfileBadgeController from './controller';

import './style.css';

import Blockator from '../../modules/blockator/blockator';
import profileBadgeTmpl from './layout.tmpl';

class ProfileBadge extends Blockator {
    DOMstrings: {[key: string]: string};
    private _controller: ProfileBadgeController;

    constructor() {
        super('div', profileBadgeData.badge_body, profileBadgeTmpl);
    }

    componentDidMount() {
        this.DOMstrings = {
            avatar: '.profile-badge__avatar img'
        };

        this._controller = new ProfileBadgeController(this);

        this._controller.setAvatar();
    }
}

export default ProfileBadge;
