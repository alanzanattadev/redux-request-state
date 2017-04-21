# redux-request-state

Request state management for Redux and React. Handles "loading", "impossible to fetch data" and "already loaded" states easily.

## Why

It's hard and boring to create actions linked to a request,
you have to make a PENDING one, a SUCCESS one, and an ERROR one,
for each requests, and then handle them in reducers.
Your components have to be aware of the state and display different things based on the request state.
It's a lot of boilerplate, and this projects speeds up things by giving you every pieces needed to handle requests state management.

Install module
```shell
npm install --save redux-request-state
```
## How it works

It handles dispatching of different states automatically by reading promise states. You can then get this status with some Higher Order Components. Things are linked together through a request id.

## Use

### Setup

#### Middleware

Handles request actions and automaticaly dispatches actions depending on Promise state.

Add middleware to store config
```javascript
import { RequestStateMiddleware } from 'redux-request-state';

let middleware = applyMiddleware(fetchState());
```
#### Reducer

Default reducer that handles actions dispatched by the middleware and let you access the request state.

Add reducer to store config
```javascript
import { RequestStateReducer } from 'redux-request-state';

let reducer = combineReducers({requests: RequestStateReducer});
```

[AVOID WHEN POSSIBLE] Access request with id 'user.profile.getphoto' informations
```javascript
store.getState().reducer.user.profile.getphoto.state == "PENDING"
```

### Connect

#### Wire tasks to the launch track (task manager)

Define some Routes. Routes are the basic building block, it acts like an action factory that define how the task you'll launch will be executed and what is its id.

```javascript

import { Route } from 'redux-request-state';

const UserFetchRoute = new Route({
  type: "USER_FETCH",
  resolve: (userId) => api.users.get(userId), // Must return a promise,
  requestIDFactory: (userId) => `user.${userid}.fetch`, // Must return a requestID
  replayWith: (user) => ({type: "USER_CHANGED", payload: user}), // OPTIONAL : dispatch the action returned, can helps you to link libraries together.
});


const UserUpdateRoute = new Route({
  type: "USER_UPDATE",
  resolve: (userId, userInfos) => api.users.post(userId, userInfos) // Must return a promise,
  requestIDFactory: (userId, userInfos) => `user.${euserid}.update` // Must return a requestID
});

```

Send them to a RoutesProvider. RoutesProvider helps with wiring things together throught the requestID. It receives a routes props which is an API like object containing routes.

```javascript

import { RouteProvider } from 'redux-request-state';

function App({children}) {
  return (
    <RoutesProvider routes={{
      users: {
        fetch: UserFetchRoute,
        update: UserUpdateRoute
      }
    }}>
      {children}
    </RoutesProvider>
  )
}

```

Now you can dispatch on the launch track. You need to use the WithRoutes HOC to get the Routes / Factories.

```javascript

import { connect } from 'react-redux';
import { WithRoutes } from 'redux-request-state';

const Container = WithRoutes(connect(
  (state) => ({

  }),
  (dispatch, ownProps) => ({
    dispatch(ownProps.routes.users.fetch.create("user_id_21"));
  })
)(Comp))

```

#### Display

To link your views to the request state you have two building blocks.

First of all you need to get the state of the request. You do that with RequestStateConnecter, an HOC which helps you to get it.
RequestStateConnecter only requires a "requests" props which is the reducer from the state.

Let's take back from where we were before and add the RequestStateConnecter to it.
The only thing it needs is a function that return the requestID of the one'state you want to link your views with.

```javascript

import { connect } from 'react-redux';
import { WithRoutes } from 'redux-request-state';

const Container = WithRoutes(connect(
  (state) => ({
    requests: state.requests
  }),
  (dispatch, ownProps) => ({
    dispatch(ownProps.routes.users.fetch.create("user_id_21"));
  })
)(RequestStateConnecter(
  (props, routes) => routes.users.fetch.getRequestID("user_id_21")
)(Comp)))

```

Comp will receive a state and details props. state is the request state, details the resolved data.

You can use the provided constants to match with the request state.

```javascript

import { STATUS_SUCCESS, STATUS_ERROR, STATUS_PENDING } from 'redux-request-state';

function Comp(props) {
  return (
    <div>
      {props.state === STATUS_SUCCESS && <span>Succeed : {props.details}</span>}
      {props.state === STATUS_PENDING && <Spinner/>}
      {props.state === STATUS_ERROR && <Error message={props.details}/>}
    </div>
  )
}

```

You're done.

But for some special cases you need some advanced behaviors.
For example, you have a users list, and you want the list to display a spinner the first time it loads data, but not the others times.

I've made an helper for you. This helper is called RenderedStateConnecter. RenderedStateConnecter is a defined by a function which returns a React element based on state. it handles what to display depending on params you've sent.

You have to pass it the state and details props coming from the RequestStateConnecter.

```javascript

import { RenderedStateConnecter } from 'redux-request-state';

const Comp = RenderedStateConnecter((state, props, details) => {
  if (state == STATUS_PENDING)
    return <Spinner/>
  else if (state == STATUS_SUCCESS)
    return <List items={props.items}/>
  else if (state == STATUS_ERROR)
    return <ErrorMessage message={details.message}/>
  else if (state == STATUS_CACHE)
    return <List/>
  else if (state == STATUS_DEFAULT)
    return <Nothing/>
  else
    return null;
}, (props, state) => {
  return true
}, true)

```

params:
- Function that return a react element depending on request state, component props, and request details (data on success and error details on error)
```javascript
mapStateToComponent(requestState: string, props: any, details: any) => React.Element
```
- Function that tells to the component whether to use the one of state "CACHE" or not. If true, returns the component of STATUS_CACHE instead of STATUS_PENDING when request has succeed at least once.
```javascript
useCache(props: any, requestState: string) => boolean
```

- Boolean that tells to the component whether to use the one of STATUS_DEFAULT if no element is returned for current state.
```javascript
useFallback: boolean
```
