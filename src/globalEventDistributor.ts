import { Store } from 'redux';

interface IDistributorStore {
    appName: string;
    store: Store<any> | any;
    itIsHostApp: boolean;
}

export class GlobalEventDistributor {
    public stores: IDistributorStore[];

    constructor() {
        this.stores = [];
    }
    /**
     * Returns an object containing an app state.
     *
     * If apps' names does not match the appName passed as param it will
     * return the `undefined` object.
     *
     * @return The default return it's the state the one of the registered as parent app.
     */
    public getState(appTarget: string = '') {
        const searchCondition = appTarget
            ? (store: IDistributorStore) => store.appName === appTarget
            : (store: IDistributorStore) => store.itIsHostApp === true;
        let state: any;

        this.stores.map(store => {
            if (searchCondition(store)) {
                state = store.store.getState();
            }
        });

        return state;
    }

    public getStore(appTarget: string) {
        let store: any;

        if (appTarget) {
            this.stores.map(registeredAppStore => {
                if (registeredAppStore.appName === appTarget) {
                    store = registeredAppStore.store;
                }
            });
        }

        return store;
    }

    public isStoreRegistered(storeAppName: string) {
        const filteredStore = this.stores.filter(store => store.appName === storeAppName);
        return filteredStore.length > 0;
    }

    /**
     * Register an Micro UI store into the system.
     *
     * @param itIsHostApp should be use just once to register the parent app.
     * The rest of the time should be omitted.
     *
     */
    public registerStore(appName: string, store: Store<any>, itIsHostApp: boolean = false) {
        if (!this.isStoreRegistered(appName)) {
            this.stores.push({ appName, store, itIsHostApp });
        }
    }

    /**
     * Broadcast event or send event to an specific app.
     *
     * @param appTarget is optional. When omitted, the event will be send to the
     * parent app.
     *
     */
    public dispatch(event: any, appTarget: string = '') {
        if (!event) {
            return false;
        }
        if (appTarget) {
            this.dispatchByAppName(event, appTarget);
        } else {
            this.broadCastEvent(event);
        }
        return true;
    }

    private dispatchByAppName(event: any, appTarget: string) {
        this.stores.map(s => {
            if (s.appName === appTarget) {
                s.store.dispatch(event);
            }
        });
    }

    private broadCastEvent(event: any) {
        const appNameOfEventEmitter = (event && event.meta && event.meta.appSource) || '';
        const storesExcludingEventEmitter = this.stores.filter(store => {
            return store.appName !== appNameOfEventEmitter;
        });
        storesExcludingEventEmitter.forEach(s => s.store.dispatch(event));
    }
}
