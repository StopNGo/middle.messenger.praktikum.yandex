import Blockator from '../../modules/blockator/blockator';
import formFieldTmpl from './layout.tmpl';

class FormField extends Blockator {
    constructor(props: {}, tmpl?: string) {
        super('div', props, tmpl || formFieldTmpl);
    }

    componentDidMount() {
        this.setProps({
            events: {
                focus: (event: FocusEvent) => {
                    if ((event.target as HTMLInputElement)) {
                        (event.target as HTMLInputElement).reportValidity();
                    }
                },
                blur: (event: FocusEvent) => {
                    if ((event.target as HTMLInputElement)) {
                        (event.target as HTMLInputElement).reportValidity();
                    }
                },
                click: (event: MouseEvent) => {
                    event.stopPropagation();
                }
            }
        });
    }

    _addEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            const input = this.getContent().querySelector('input');
            if (input) {
                input.addEventListener(eventName, events[eventName]);
            }
        });
    }
}

export default FormField;
