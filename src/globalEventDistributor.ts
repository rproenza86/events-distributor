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
        if (appTarget) {
            this.dispatchByAppName(event, appTarget);
        } else {
            this.broadCastEvent(event);
        }
    }

    private dispatchByAppName(event: any, appTarget: string) {
        this.stores.map(s => {
            if (s.appName === appTarget) {
                s.store.dispatch(event);
            }
        });
    }

    private broadCastEvent(event: any) {
        this.stores.forEach(s => s.store.dispatch(event));
    }
}
