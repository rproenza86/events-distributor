# events-distributor
[![Build Status](https://travis-ci.org/rproenza86/events-distributor.svg?branch=master)](https://travis-ci.org/rproenza86/events-distributor)
[![npm (scoped)](https://img.shields.io/npm/v/@rproenza/events-distributor.svg)](https://www.npmjs.com/package/@rproenza/events-distributor)
[![npm](https://img.shields.io/npm/dt/@rproenza/events-distributor.svg)](https://www.npmjs.com/package/@rproenza/events-distributor)
[![license](https://img.shields.io/github/license/rproenza86/events-distributor.svg)](https://github.com/rproenza86/events-distributor/blob/master/LICENSE)


## Description

This Node.js module would work as a helper to support Micro UI architectures allowing the event communications among apps or modules.

## Module concepts

This module was inspired by (redux)[https://redux.js.org] and its actions communication system.

### Concepts

### Store

Object with a `dispatch` function.

Ex. this `appA.store` :

```javascript
// Applications
const appA = {
    name: 'MicroAppA',
    store: {
        dispatch: function(event) {
            // App's event manipulation
            const appACatch = {
                ...event,
                meta: 'Event catch on A'
            };
            // App logic
            eventCatchQueue.push(appACatch);
        }
    }
};
```

### Events

Object passed as parameter  to the `dispatch` function.

> The `events` objects are like Redux's actions. They could hold any structure but there is a preferred framework which will ensure the proper module functioning under good practices.

Ex. of a basic and well structured event:

```javascript
// Applications
const event = {
  type: 'UPDATE_TEST_DRIVE_DAY',
  payload:{
      date:  '2018-12-21T05:00:00.000Z'
  },
  meta: {
    appSource: 'AppointmentDatePicker',
    eventType: 'BROAD_CAST_ACTION',
    state: {
      testDrive: {
        day: '2018-12-21T05:00:00.000Z',
        email: 'Raul@gmail.com',
        firstName: 'Raul',
        hasError: false,
        isCalculating: false,
        lastName: 'Proenza',
        phone: '123-624-4321',
        time: 'Morning'
      }
    }
  }
};
```

## Installation
```sh
npm install @rproenza/events-distributor --save

yarn add @rproenza/events-distributor
```

## Usage

### Javascript

```javascript
var eventsDistributorModule = require('@rproenza/events-distributor');

var GlobalEventDistributor = eventsDistributorModule.default;
var EventDistributor = new GlobalEventDistributor();

// Apps registrations
EventDistributor.registerStore(appA.name, appA.store);
// Broadcast event
EventDistributor.dispatch(broadCastEvent);
// Sent event to specific app
EventDistributor.dispatch(directEventForAppB, appB.name);
```

### TypeScript
```typescript
import GlobalEventDistributor from '@rproenza/events-distributor';

const EventDistributor = new GlobalEventDistributor();

// Apps registrations
EventDistributor.registerStore(appA.name, appA.store);
// Broadcast event
EventDistributor.dispatch(broadCastEvent);
// Sent event to specific app
EventDistributor.dispatch(directEventForAppB, appB.name);
```

## Test
```sh
npm run test
```