# events-distributor

[![Build Status](https://travis-ci.org/rproenza86/events-distributor.svg?branch=master)](https://travis-ci.org/rproenza86/events-distributor)
[![Code Factor/Quality](https://www.codefactor.io/repository/github/rproenza86/events-distributor/badge)](https://www.codefactor.io/repository/github/rproenza86/events-distributor)
[![Coverage Status](https://coveralls.io/repos/github/rproenza86/events-distributor/badge.svg?branch=master)](https://coveralls.io/github/rproenza86/events-distributor?branch=master)
[![npm (scoped)](https://img.shields.io/npm/v/@rproenza/events-distributor.svg)](https://www.npmjs.com/package/@rproenza/events-distributor)
[![npm](https://img.shields.io/npm/dt/@rproenza/events-distributor.svg)](https://www.npmjs.com/package/@rproenza/events-distributor)
[![license](https://img.shields.io/github/license/rproenza86/events-distributor.svg)](https://github.com/rproenza86/events-distributor/blob/master/LICENSE)

> System to enable communication between Micro UI/Frontend applications

## Description

Node.js package to use as NPM module. It will work as a helper utility to support Micro UI/Frontend architectures allowing the event communications among applications or modules.

The use of the `events-distributor` enable the proper encapsulation, low coupling and high cohesion which all scalable system must to have in order to achieve total indecency on his release train and Software Development Life Circle.

## Table of Contents

- [Installation](#installation)
- [How to use](#usage)
- [Test](#test)
- [Contributing](#contributing)
- [Concepts](#concepts)
- [Support](#support)
- [License](#license)

## Installation
```sh
npm install @rproenza/events-distributor --save

yarn add @rproenza/events-distributor
```


## Usage

### Module instantiation

```javascript
import GlobalEventDistributor from '@rproenza/events-distributor';

const eventDistributor = new GlobalEventDistributor();
```

### Application registration

```javascript
/**
 * appStore = {
 *    dispatch: () => {},
 *    getStore: () => {}
 * }
*/
eventDistributor.registerStore(appName, appStore);
```

### Events communications

#### Broadcasting event

```javascript
/**
 * eventToBroadCast = {
 *    type: 'YOUR_GREAT_ACTION_SUCCESS,
 *    payload: {}
 * }
*/
eventDistributor.dispatch(eventToBroadCast);
```

#### Sent event to specific application

```javascript
/**
 * directEventToAppB = {
 *    type: 'YOUR_GREAT_APP_A_ACTION_SUCCESS,
 *    payload: {}
 * }
*/
eventDistributor.dispatch(directEventToAppB, appB.name);
```

### Get an application state

```typescript
/**
 * The function parameter is optional.
 * If omitted it will be returned the parent's app state
*/
eventDistributor.getState(appTarget: string = '');
```

## Test

```sh
npm run test
```

## Contributing

*(see [Contributing Doc](CONTRIBUTING.md))

## Concepts

> This module was inspired by [redux](https://redux.js.org) and its actions communication system.

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

## Support

 Create an [Issue](https://github.com/rproenza86/events-distributor/issues) for any bug or feature request.

 Expect a response within 2 business days after submitted your [bug report or feature request](https://github.com/rproenza86/events-distributor/issues). However, in many cases you'll see a response within 24 hours.

## License

[![license](https://img.shields.io/github/license/rproenza86/events-distributor.svg)](https://github.com/rproenza86/events-distributor/blob/master/LICENSE)

- **[GNU General Public License version 3](LICENSE)**
- Copyright 2025 © <a href="https://atomiccoders.com" target="_blank">Atomic Coders</a>.
