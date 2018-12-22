import { Store } from 'redux';
interface IDistributorStore {
    appName: string;
    store: Store | any;
}
export declare class GlobalEventDistributor {
    stores: IDistributorStore[];
    constructor();
    registerStore(appName: string, store: Store): void;
    dispatch(event: any, appTarget?: string): void;
    private dispatchByAppName;
    private broadCastEvent;
}
export {};
