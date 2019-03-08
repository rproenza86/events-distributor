import { Store } from 'redux';
interface IDistributorStore {
    appName: string;
    store: Store<any> | any;
    itIsHostApp: boolean;
}
export declare class GlobalEventDistributor {
    stores: IDistributorStore[];
    constructor();
    /**
     * Returns an object containing an app state.
     *
     * If apps' names does not match the appName passed as param it will
     * return the `undefined` object.
     *
     * @return The default return it's the state the one of the registered as parent app.
     */
    getState(appTarget?: string): any;
    getStore(appTarget: string): any;
    isStoreRegistered(storeAppName: string): boolean;
    /**
     * Register an Micro UI store into the system.
     *
     * @param itIsHostApp should be use just once to register the parent app.
     * The rest of the time should be omitted.
     *
     */
    registerStore(appName: string, store: Store<any>, itIsHostApp?: boolean): void;
    /**
     * Broadcast event or send event to an specific app.
     *
     * @param appTarget is optional. When omitted, the event will be send to the
     * parent app.
     *
     */
    dispatch(event: any, appTarget?: string): boolean;
    private dispatchByAppName;
    private broadCastEvent;
}
export {};
