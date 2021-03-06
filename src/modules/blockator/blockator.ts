import EventBusator, {TEventBusator} from '../event-busator/event-busator';
import uuidator, {TUUID} from '../uuidator/uuidator';
import Templator from '../templator/templator';
export type TBlockator = InstanceType<typeof Blockator>;
interface IMeta {
    tagName: string;
    props: {};
}

enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export default class Blockator {
    static EVENTS = EVENTS;

    static NESTED_BLOCKS_PROPS: string = 'nestedBlocks';

    private _id: TUUID;
    private _element: HTMLElement;
    private _meta: IMeta;
    eventBus: () => any;
    props: {[propName: string]: any};
    tmpl: string;

    /**
     * @constructor
     *
     * @param tagName Тег, которым будет обернут элемент
     * @param props Параметры блока
     * @param tmpl Строка шаблона блока
     *
     * @memberof Blockator
     */
    constructor(tagName: string = 'div', props: {} = {}, tmpl: string = '') {
        const eventBus: TEventBusator = new EventBusator();
        this._meta = {
            tagName,
            props
        };
        this._id = uuidator();
        this.props = props;

        this.setProps({__id: this._id});
        this.setProps({[Blockator.NESTED_BLOCKS_PROPS]: {}});

        this.tmpl = tmpl;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Blockator.EVENTS.INIT);
    }

    /**
     * Привязка массива ссылок на блоки к тегу в шаблоне
     *
     * @param tagNameFromTemplate Тег, к которому будет привязан массив блоков
     * @param nestedBlocks Массив ссылок на блоки
     *
     * @memberof Blockator
     */
    addNestedBlocksToTag(tagNameFromTemplate: string, nestedBlocks: TBlockator[]) {
        let nestedBlocksProps = this._makePropsProxy(nestedBlocks);
        Object.assign(this.props[Blockator.NESTED_BLOCKS_PROPS], {
            [tagNameFromTemplate]: nestedBlocksProps
        });
        this.eventBus().emit(Blockator.EVENTS.FLOW_CDU);
    }

    deleteNestedBlocksFromTag(tagNameFromTemplate: string) {
        this.props[Blockator.NESTED_BLOCKS_PROPS][tagNameFromTemplate].length = 0;
        this.eventBus().emit(Blockator.EVENTS.FLOW_CDU);
    }

    _setNestedNodes() {
        if (this.props[Blockator.NESTED_BLOCKS_PROPS]) {
            Object.keys(this.props[Blockator.NESTED_BLOCKS_PROPS]).forEach(tag => {
                const childNode = this.getContent().querySelector(tag);
                if (childNode) {
                    const parentTag = childNode.parentElement;
                    const nestedFragment = document.createDocumentFragment();
                    this.props[Blockator.NESTED_BLOCKS_PROPS][tag].forEach((block: TBlockator) => nestedFragment.appendChild(block.getContent()));
                    if (parentTag) {
                        parentTag.replaceChild(nestedFragment, childNode);
                    }
                }
            });
        }
    }

    private _registerEvents(eventBus: TEventBusator): void {
        eventBus.on(Blockator.EVENTS.INIT, this.init.bind(this));

        eventBus.on(Blockator.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));

        eventBus.on(Blockator.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

        eventBus.on(Blockator.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Blockator.EVENTS.FLOW_RENDER, this._setNestedNodes.bind(this));
        eventBus.on(Blockator.EVENTS.FLOW_RENDER, this._addEvents.bind(this));
    }

    private _createResources(): void {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    /**
     * Инициализация блока, создание обертки
     *
     * @memberof Blockator
     */
    init(): void {
        this._createResources();
        this.eventBus().emit(Blockator.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.props = this._makePropsProxy(this.props);
        this.eventBus().emit(Blockator.EVENTS.FLOW_RENDER);
    }

    /**
     * Метод для переопределения приватного метода установки блока
     *
     * @memberof Blockator
     */
    componentDidMount() {}

    _componentDidUpdate() {
        this.componentDidUpdate();
        this.eventBus().emit(Blockator.EVENTS.FLOW_RENDER);
    }

    /**
     * Метод для переопределения приватного метода обновления блока
     *
     * @memberof Blockator
     */
    componentDidUpdate() {}

    /**
     * Метод присваивания и изменения свойств блоку
     *
     * @memberof Blockator
     */
    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    getThis() {
        return this;
    }

    _render() {
        const blockFromInstance: string = this.render();
        if (this.tmpl && !blockFromInstance) {
            this._element.innerHTML = new Templator(this.tmpl).compile(this.props);
        } else {
            this._element.innerHTML = blockFromInstance;
        }
    }

    /**
     * Метод для переопределения приватного метода отрисовки блока
     *
     * @memberof Blockator
     */
    render(): string {
        const block: string = '';
        return block;
    }

    getContent() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    _makePropsProxy(props: {}) {
        props = new Proxy(props, {
            set: <T>(target: T, prop: keyof T, val: any) => {
                target[prop] = val;
                this.eventBus().emit(Blockator.EVENTS.FLOW_CDU);
                return true;
            },
            get: <T>(target: T, prop: keyof T) => {
                return target[prop];
            },
            deleteProperty: () => {
                throw new Error('Этот элемент нельзя удалить');
            }
        });

        return props;
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    protected _addEvents() {
        const {events = []} = this.props;
        events.forEach((event: {name: string, selector: string, callback: () => any}) => {
            const {name, selector, callback} = event;
            const elements = this._element?.querySelectorAll(selector);
            elements.forEach((element: HTMLElement) => {
                element.addEventListener(name, callback);
            });
        });
    }

    show() {
        this._element.style.display = 'block';
    }

    hide() {
        this._element.style.display = 'none';
    }
}
