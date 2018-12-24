'use strict';
// Assertion library
const expect = require('chai').expect;
// Module
const index = require('../dist/index.js');

// Applications
const appA = {
    name: 'MicroAppA',
    store: {
        dispatch: function(event) {
            const appACatch = {
                ...event,
                meta: 'Event catch on A'
            };
            eventCatchQueue.push(appACatch);
        }
    }
};
const appB = {
    name: 'MicroAppB',
    store: {
        dispatch: function(event) {
            const appACatch = {
                ...event,
                meta: 'Event catch on B'
            };
            eventCatchQueue.push(appACatch);
        }
    }
};
// Constants
const BROAD_CAST_EVENT = 'BROAD_CAST_EVENT';
const DIRECT_EVENT_TO_APP_B = 'DIRECT_EVENT_TO_APP_B';
// Events
const broadCastEvent = {
    type: BROAD_CAST_EVENT,
    payload: {
        msg: 'Hi!'
    }
};
const directEventForAppB = {
    type: DIRECT_EVENT_TO_APP_B,
    payload: {
        msg: 'Hi APP B!'
    }
};
// Module EventDistributor class
const GlobalEventDistributor = index.default;
// Module class instance holder
let EvenDistributor;
// Helper array to store events received by apps
let eventCatchQueue = [];

describe('The EventDistribution module', () => {
    before('create module instance', () => {
        // EventDistributor instantiation
        EvenDistributor = new GlobalEventDistributor();
        // Apps registrations
        EvenDistributor.registerStore(appA.name, appA.store);
        EvenDistributor.registerStore(appB.name, appB.store);
        // Broadcast event
        EvenDistributor.dispatch(broadCastEvent);
        // Sent event to specific app
        EvenDistributor.dispatch(directEventForAppB, appB.name);
    });
    it('should register app A', () => {
        const registeredAppA = EvenDistributor.stores.filter(store => store.appName === appA.name);
        expect(registeredAppA.length).to.equal(1);
    });
    it('should register app B', () => {
        const registeredAppB = EvenDistributor.stores.filter(store => store.appName === appB.name);
        expect(registeredAppB.length).to.equal(1);
    });
    it('should dispatch event to app B', () => {
        const directEventCatchByAppB = eventCatchQueue[2];
        expect(directEventCatchByAppB.type).to.equal(DIRECT_EVENT_TO_APP_B);
        expect(directEventCatchByAppB.meta).to.equal('Event catch on B');
    });
    describe('the broadcast event feature', () => {
        it('should have distributed two events already ', () => {
            const broadcastedEvents = eventCatchQueue.filter(
                event => event.type === BROAD_CAST_EVENT
            );
            expect(broadcastedEvents.length).to.equal(2);
        });
        it('should have sent  a broadcasted event to AppA', () => {
            const eventCatchOnA = eventCatchQueue[0];
            expect(eventCatchOnA.type).to.equal('BROAD_CAST_EVENT');
            expect(eventCatchOnA.meta).to.equal('Event catch on A');
        });
        it('should have sent  a broadcasted event to AppB', () => {
            const eventCatchOnB = eventCatchQueue[1];
            expect(eventCatchOnB.type).to.equal('BROAD_CAST_EVENT');
            expect(eventCatchOnB.meta).to.equal('Event catch on B');
        });
        it('should omit app emitter from broadcast when meta info present on event', () => {
            const eventWithMetaInfo = {
                ...broadCastEvent,
                payload: {
                    msg: 'Message from A to the world'
                },
                meta: { appSource: appA.name, eventType: 'BROAD_CAST_ACTION' }
            };
            EvenDistributor.dispatch(eventWithMetaInfo);
            const broadcastedEventsToAppB = eventCatchQueue.filter(event => {
                return event.type === BROAD_CAST_EVENT && event.meta === 'Event catch on B' && event.payload.msg === 'Message from A to the world';
            });
            expect(broadcastedEventsToAppB.length).to.equal(1);
        });
    });
});
