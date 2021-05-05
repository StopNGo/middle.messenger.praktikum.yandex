import Screen, {TScreen} from '../../components/screen/main';
import {isEqual} from '../utils/utils';

export type TRoute = InstanceType<typeof Route>;
export class Route {
    private _pathname: string;
    private _screenClass: typeof Screen;
    private _screen: TScreen | null;
    private _props: {[propName: string]: any};

    constructor(pathname: string, screen: typeof Screen, props: {}) {
        this._pathname = pathname;
        this._screenClass = screen;
        this._screen = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._screen) {
            this._screen.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._screen) {
            this._screen = new this._screenClass();
            this._screen.place(this._props.rootQuery);
            return;
        }

        this._screen.show();
    }

    getRestrictions() {
        if (this._props.restrictionCondition !== undefined && this._props.redirect) {
            return {
                restrictionCondition: this._props.restrictionCondition,
                redirect: this._props.redirect
            };
        }

        return undefined;
    }
}

export type TRouterator = InstanceType<typeof Routerator>;
export class Routerator {
    private static __instance: Routerator;

    routes: TRoute[] = [];
    history: History;
    _currentRoute: TRoute | null;
    _rootQuery: string;
    _restrictionPromise: Promise<boolean>;
    _pathname404: string;

    constructor(rootQuery: string, pathname404: string = '/404') {
        if (Routerator.__instance) {
            return Routerator.__instance;
        }

        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._pathname404 = pathname404;

        Routerator.__instance = this;
    }

    use(pathname: string, screen: typeof Screen, props?: {}) {
        const route = new Route(pathname, screen, {...props, rootQuery: this._rootQuery});
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target: Window = event.currentTarget as Window;
            if (target) {
                this._onRoute(target.location.pathname);
            }
        };

        this.go(window.location.pathname);
    }

    setResctrictionPromise(restrictionPromise: Promise<boolean>) {
        this._restrictionPromise = restrictionPromise;
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute(this._pathname404);
            pathname = this._pathname404;
        }

        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute(this._pathname404);
            pathname = this._pathname404;
        }

        if (route) {
            const restriction = route.getRestrictions();
            if (this._restrictionPromise && restriction) {
                this._restrictionPromise.then(response => {
                    let condition = response;
                    if (condition === restriction.restrictionCondition) {
                        pathname = restriction.redirect;
                    }

                    this.history.pushState({}, '', pathname);
                    this._onRoute(pathname);
                });
            } else {
                this.history.pushState({}, '', pathname);
                this._onRoute(pathname);
            }
        }
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    static redirect(pathname: string) {
        Routerator.__instance.go(pathname);
    }
}
