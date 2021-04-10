import Blockator from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';
import formFieldTmpl from './layout.tmpl';

class FormField extends Blockator {
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

    render() {
        return new Templator(formFieldTmpl).compile(this.props);
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
