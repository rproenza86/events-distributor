import { Store } from 'redux';
interface IDistributorStore {
    appName: string;
    store: Store<any> | any;
    itIsHostApp: boolean;
}
export declare class GlobalEventDistributor {
    stores: IDistributorStore[];
    constructor();
    getState(appTarget?: string): any;
    getStore(appTarget: string): any;
    isStoreRegistered(storeAppName: string): boolean;
    registerStore(appName: string, store: Store<any>, itIsHostApp?: boolean): void;
    dispatch(event: any, appTarget?: string): boolean;
    private dispatchByAppName;
    private broadCastEvent;
}
export {};
