import EventBusator, {TEventBusator} from '../event-busator/event-busator';
export type TBlockator = InstanceType<typeof Blockator>;
interface IMeta {
    tagName: string;
    props: {};
}

export default class Blockator {
    static EVENTS: {[alias: string]: string} = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    static NESTED_BLOCKS_PROPS: string = 'nestedBlocks';

    private _element: HTMLElement;
    private _meta: IMeta;
    eventBus: () => any;
    props: {[propName: string]: any};

    /**
     * @constructor
     * @param tagName Тег, которым будет обернут элемент
     * @param props Параметры блока
     *
     * @memberof Blockator
     */
    constructor(tagName: string = 'div', props: {} = {}) {
        const eventBus: TEventBusator = new EventBusator();
        Object.assign(props, {[Blockator.NESTED_BLOCKS_PROPS]: {}});
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Blockator.EVENTS.INIT);
    }

    addNestedBlocksToTag(tagNameFromTemplate: string, nestedBlocks: any) {
        nestedBlocks = this._makePropsProxy(nestedBlocks);
        Object.assign(this.props[Blockator.NESTED_BLOCKS_PROPS], {
            [tagNameFromTemplate]: nestedBlocks
        });
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

    _render() {
        const block: string = this.render();
        this._element.innerHTML = block;
        this._setNestedNodes();
        this._addEvents();
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
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }
}
