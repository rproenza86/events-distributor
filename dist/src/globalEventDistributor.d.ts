import { Store } from 'redux';
interface IDistributorStore {
    appName: string;
    store: Store | any;
    itIsHostApp: boolean;
}
export declare class GlobalEventDistributor {
    stores: IDistributorStore[];
    constructor();
    getState(appTarget?: string): any;
    registerStore(appName: string, store: Store, itIsHostApp?: boolean): void;
    dispatch(event: any, appTarget?: string): boolean;
    private dispatchByAppName;
    private broadCastEvent;
}
export {};
