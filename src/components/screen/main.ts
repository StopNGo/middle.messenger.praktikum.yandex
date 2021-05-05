import Blockator, {TBlockator} from '../../modules/blockator/blockator';

export type TScreen = InstanceType<typeof Screen>;

class Screen extends Blockator {
    static TITLE_SEPARATOR: string = '-';

    constructor() {
        super('screen', {}, '<div></div>');
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

    setScreenTitle(title: string) {
        document.title = `${title} ${Screen.TITLE_SEPARATOR} ${document.title}`;
    }
}

export default Screen;
