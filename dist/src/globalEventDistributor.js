"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalEventDistributor = /** @class */ (function () {
    function GlobalEventDistributor() {
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
    GlobalEventDistributor.prototype.getState = function (appTarget) {
        if (appTarget === void 0) { appTarget = ''; }
        var searchCondition = appTarget
            ? function (store) { return store.appName === appTarget; }
            : function (store) { return store.itIsHostApp === true; };
        var state;
        this.stores.map(function (store) {
            if (searchCondition(store)) {
                state = store.store.getState();
            }
        });
        return state;
    };
    GlobalEventDistributor.prototype.getStore = function (appTarget) {
        var store;
        if (appTarget) {
            this.stores.map(function (registeredAppStore) {
                if (registeredAppStore.appName === appTarget) {
                    store = registeredAppStore.store;
                }
            });
        }
        return store;
    };
    GlobalEventDistributor.prototype.isStoreRegistered = function (storeAppName) {
        var filteredStore = this.stores.filter(function (store) { return store.appName === storeAppName; });
        return filteredStore.length > 0;
    };
    /**
     * Register an Micro UI store into the system.
     *
     * @param itIsHostApp should be use just once to register the parent app.
     * The rest of the time should be omitted.
     *
     */
    GlobalEventDistributor.prototype.registerStore = function (appName, store, itIsHostApp) {
        if (itIsHostApp === void 0) { itIsHostApp = false; }
        if (!this.isStoreRegistered(appName)) {
            this.stores.push({ appName: appName, store: store, itIsHostApp: itIsHostApp });
        }
    };
    /**
     * Broadcast event or send event to an specific app.
     *
     * @param appTarget is optional. When omitted, the event will be send to the
     * parent app.
     *
     */
    GlobalEventDistributor.prototype.dispatch = function (event, appTarget) {
        if (appTarget === void 0) { appTarget = ''; }
        if (!event) {
            return false;
        }
        if (appTarget) {
            this.dispatchByAppName(event, appTarget);
        }
        else {
            this.broadCastEvent(event);
        }
        return true;
    };
    GlobalEventDistributor.prototype.dispatchByAppName = function (event, appTarget) {
        this.stores.map(function (s) {
            if (s.appName === appTarget) {
                s.store.dispatch(event);
            }
        });
    };
    GlobalEventDistributor.prototype.broadCastEvent = function (event) {
        var appNameOfEventEmitter = (event && event.meta && event.meta.appSource) || '';
        var storesExcludingEventEmitter = this.stores.filter(function (store) {
            return store.appName !== appNameOfEventEmitter;
        });
        storesExcludingEventEmitter.forEach(function (s) { return s.store.dispatch(event); });
    };
    return GlobalEventDistributor;
}());
exports.GlobalEventDistributor = GlobalEventDistributor;
