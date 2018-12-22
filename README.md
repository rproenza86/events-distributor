# events-distributor

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