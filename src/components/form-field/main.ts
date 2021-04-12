import Blockator from '../../modules/blockator/blockator';
import formFieldTmpl from './layout.tmpl';

class FormField extends Blockator {
    constructor(props?: {}, tmpl?: string) {
        super('div', props, tmpl || formFieldTmpl);
    }

    componentDidMount() {
        this.setProps({
            events: [
                {
                    name: 'focus',
                    selector: 'input',
                    callback:
                        (event: FocusEvent) => {
                            if ((event.target as HTMLInputElement)) {
                                (event.target as HTMLInputElement).reportValidity();
                            }
                        }
                },
                {
                    name: 'blur',
                    selector: 'input',
                    callback:
                        (event: FocusEvent) => {
                            if ((event.target as HTMLInputElement)) {
                                (event.target as HTMLInputElement).reportValidity();
                            }
                        }
                },
                {
                    name: 'click',
                    selector: 'input',
                    callback:
                        (event: MouseEvent) => {
                            event.stopPropagation();
                        }
                }
            ]
        });
    }
}

export default FormField;
