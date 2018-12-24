"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalEventDistributor = /** @class */ (function () {
    function GlobalEventDistributor() {
        this.stores = [];
    }
    GlobalEventDistributor.prototype.registerStore = function (appName, store) {
        this.stores.push({ appName: appName, store: store });
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
