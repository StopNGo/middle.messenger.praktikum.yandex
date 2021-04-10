import Blockator, {TBlockator} from '../../modules/blockator/blockator';
import Templator from '../../modules/templator/templator';

class Screen extends Blockator {
    constructor() {
        super('screen');
    }

    render() {
        return new Templator('<div></div>').compile(this.props);
    }

    place(query: string) {
        const root = document.querySelector(query);
        if (root) {
            root.appendChild(this.getContent());
        } else {
            throw new Error('Элемент для вставки экрана не найдет');
        }

        return root;
    }

    setMainWindow(window: TBlockator) {
        const screenElement = this.getContent();
        screenElement.replaceChild(window.getContent(), screenElement.childNodes[0]);
    }
}

export default Screen;
