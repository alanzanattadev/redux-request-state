# redux-request-state

Request state managment for redux and react. Handles "loading", "impossible to fetch data" and "already loaded" states easily.

It's hard and boring to create actions linked to a request,
you have to make a PENDING one, a SUCCESS one, and an ERROR one,
for each requests, and then handle them in reducers.
Your components have to be aware of the state and display differents things based on the request state.
It's a lot of boiletplate, and this projects speeds up things by giving you every pieces needed to handle requests state managment.

This module is divided into several parts that you can replace or not use.

Install module
```shell
npm install --save redux-request-state
```
# Redux

## Actions

By using this module, you only have to define one action to handle of the lifecycle of a request.

The idea is to define an action that associate a request (defined by a function that returns Promise) with a namespaced id (defined by dots ex: "user.profile.photo")
The payload is copied in params attribut of dispatched actions's payload

type:
```javascript
{
  type: String,
  requestID: String,
  resolve: function,
  payload: any
}
```

example :
```javascript
let token = "aiozdaijdaiojdzaoijdiozdajd"
let action = {
  type: "REFRESH_DATA",
  requestID: "namespace.refreshData",
  resolve: () => api.get(token),
  payload: {
    token
  }
};

dispatch(action);
```

or with actionCreator

```javascript
function refreshDataOfUser(userid) {
    return {
      type: "REFRESH_DATA_OF_USER",
      requestID: `${userid}.data`,
      resolve: () => api.getDataOfUser(userid)
    };
}

dispatch(refreshDataOfUser("alan"));
```

You can add replayWith to link state managment with your app by decoupling them.
replayWith is a function that takes data from resolved Promise and returns an action (data) => action.
It's only called after the request succeed

```javascript
{
  type: "REFRESH_DATA",
  requestID: "namespace.refreshData",
  resolve: () => api.get(),
  replayWith: (data) => ({type: "DATA_REFRESHED", payload: data})
}
```

## Middleware

Handles request actions and automaticaly dispatches actions depending on Promise state.

### Use
Add middleware to store config
```javascript
let fetchState = require('redux-request-state/lib/middleware')({

});
let middleware = applyMiddleware(fetchState)
```
## Reducer

Default reducer that handles actions dispatched by the middleware and let you access the request state.

### Use
Add reducer to store config
```javascript
let reducer = combineReducers({requests: require('redux-request-state/lib/reducer')});
```

Access request with id 'user.profile.getphoto' informations
```javascript
store.getState().reducer.user.profile.getphoto.state == "PENDING"
```

# React

With a functionnal API inspired by redux, you can easily configure a request aware component that displays components depending on fetch state.

### Use

Create your components that display differents state of the data

The connecter take three parameters :
  - the request id
  - a component configuration map
  - a user configuration map

mapStateToComponent is a function or a map that let you define which component is associated with which state

mapRequestIDToProps is a function or a map that let you add props depending on the request id

useCache is a function that takes props and request state as parameters and let you decide if the component has to use Data or Spinner component when data are reloading.
```javascript
let SuccessComponent = React.createClass({render: () => null});
let LoadingComponent = React.createClass({render: () => null});
let ErrorComponent = React.createClass({render: () => null});
```

Configure a connecter that manage loading of component
```javascript
import default as RequestStateConnecter from 'redux-request-state/lib/react';

let DataComponent = RequestStateConnecter('data.fetch', {
  mapStateToComponent: {
    'PENDING': (<LoadingComponent myProp="test"/>),
    'SUCCESS': (<SuccessComponent/>),
    'ERROR': (<ErrorComponent/>),
    'DEFAULT': (<LoadingComponent/>),
    'CACHE': (<SuccessComponent/>)
  },
  mapRequestIDToProps: {
    'data.fetch': {
      download: true
    }
  },
  useCache: (props, requestState) => {
    if (props.data && props.data.length > 0 && requestState == "PENDING")
      return true;
    else
      return false;
  }
}, {});
```

Connect component to redux store
```javascript
import {connect} from 'react-redux';

let ConnectedDataComponent = connect((state) => (
  {reducer: state.requests}
))(DataComponent)
```

Display your request aware component
```javascript
<ConnectedDataComponent/>
```
