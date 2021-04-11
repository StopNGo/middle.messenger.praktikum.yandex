type TCallback = () => void;
export type TEventBusator = InstanceType<typeof EventBusator>;

export default class EventBusator {
    private listeners: {[event: string]: TCallback[]};
    constructor() {
        this.listeners = {};
    }

    /**
     * Привязка к уже существующему событию event указанной колбэк функции.
     * Если такого события не существует - создаем его.
     *
     * @param event
     * @param callback
     *
     * @returns Количество колбэк функций, привязанных к этому событию
     * @memberof EventBusator
     */
    on(event: string, callback: TCallback): number {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        return this.listeners[event].push(callback);
    }

    /**
     * Удаление указанной колбэк функции, привязанной к event.
     * Если функций больше нет - удаляем событие полностью.
     *
     * @param event
     * @param callback
     *
     * @memberof EventBusator
     */
    off(event: string, callback: TCallback): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((el: TCallback) => el !== callback);

        if (this.listeners[event].length === 0) {
            delete this.listeners[event];
        }
    }

    /**
     * Запускаем выполнение всех колбэк функции, привязанных к event.
     *
     * @param event
     * @param callback
     *
     * @returns Функции, привязанные к этому событию
     * @memberof EventBusator
     */
    emit(event: string, ...args: []) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        return this.listeners[event].map((listener: TCallback) => {
            listener(...args);
            return listener;
        });
    }
}
