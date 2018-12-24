import { Store } from 'redux';

interface IDistributorStore {
    appName: string;
    store: Store | any;
}

export class GlobalEventDistributor {
    public stores: IDistributorStore[];

    constructor() {
        this.stores = [];
    }

    public registerStore(appName: string, store: Store) {
        this.stores.push({ appName, store });
    }

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
            return store.appName !== appNameOfEventEmitter
        });
        storesExcludingEventEmitter.forEach(s => s.store.dispatch(event));
    }
}
