import Blockator from '../../modules/blockator/blockator';
import formFieldTmpl from './layout.tmpl';

class FormField extends Blockator {
    firstInput: boolean;

    constructor(props?: {}, tmpl?: string) {
        super('div', props, tmpl || formFieldTmpl);

        /**
         * Чтобы не выводить ошибку при первом вводе зафиксируем,
         * что это первый ввод
         */
        this.firstInput = true;
    }

    componentDidMount() {
        if (this.props.validationMessage) {
            const input = this.getContent().querySelector('input');
            if (input) {
                input.setCustomValidity(this.props.validationMessage);
            }
        }

        this.setProps({
            events: [
                {
                    name: 'blur',
                    selector: 'input',
                    callback: (event: FocusEvent) => {
                        const target = event.target as HTMLInputElement;
                        if (target) {
                            if (!target.validity.valid) {
                                target.classList.add('form__input--error');
                                this.showValidationMessage(target, this.props.validationMessage);
                            }
                        }

                        this.firstInput = !this.firstInput;
                    }
                },
                {
                    name: 'input',
                    selector: 'input',
                    callback: (event: FocusEvent) => {
                        const target = event.target as HTMLInputElement;
                        if (target) {
                            /**
                             * Убираем подсветку поля с ошибкой,
                             * чтобы не мозолить глаза, но сообщение оставляем
                             */
                            target.classList.remove('form__input--error');
                            if (target.validity.valid) {
                                this.showValidationMessage(target, '');
                            } else if (!this.firstInput || this.props.permanentHint) {
                                /**
                                 * Чтобы не надоедать, выводим ошикбу только тогда,
                                 * когда это уже вторая поптыка.
                                 * Если нам нужна постоянная подсказака,
                                 * то выводим сразу, но не со стилем ошибки
                                 */

                                const parent = target.parentNode;
                                if (parent) {
                                    const span = parent.querySelector('span');
                                    if (span) {
                                        if (this.firstInput) {
                                            span.classList.add('form__field-error--silent');
                                        } else {
                                            span.classList.remove('form__field-error--silent');
                                        }
                                    }
                                }

                                const message = this.props.validationMessage;
                                if (message && !target.validity.valueMissing && this.props) {
                                    this.showValidationMessage(target, message);
                                }
                            }
                        }
                    }
                },
                {
                    name: 'invalid',
                    selector: 'input',
                    callback: (event: FocusEvent) => {
                        const target = event.target as HTMLInputElement;
                        if (target) {
                            this.showValidationMessage(target, this.props.validationMessage);
                        }
                    }
                },
                {
                    name: 'click',
                    selector: 'input',
                    callback: (event: MouseEvent) => {
                        event.stopPropagation();
                    }
                }
            ]
        });
    }

    showValidationMessage(element: HTMLInputElement, msg: string) {
        const parent = element.parentNode;
        if (parent) {
            if (msg !== '') {
                /**
                 * Если поле обязательно к заполнение и пустое - используем системное
                 * сообщение о необходимости заполнить, а не о несоотвествии паттерну
                 * проверки
                 */
                if (this.props.validationMessage && !element.validity.valueMissing) {
                    msg = this.props.validationMessage;
                } else {
                    msg = element.validationMessage;
                }
            }

            const span = parent.querySelector('span');
            if (span) {
                span.innerText = msg;
            }
        }
    }
}

export default FormField;
