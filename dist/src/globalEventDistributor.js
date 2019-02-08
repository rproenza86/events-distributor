"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalEventDistributor = /** @class */ (function () {
    function GlobalEventDistributor() {
        this.stores = [];
    }
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
    GlobalEventDistributor.prototype.registerStore = function (appName, store, itIsHostApp) {
        if (itIsHostApp === void 0) { itIsHostApp = false; }
        if (!this.isStoreRegistered(appName)) {
            this.stores.push({ appName: appName, store: store, itIsHostApp: itIsHostApp });
        }
    };
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
