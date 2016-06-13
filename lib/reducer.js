'use strict'
'use babel'
// @flow weak

var {fromJS} = require('immutable');

module.exports = function reducer(state = {}, action) {
  switch(action.type) {
    case "REQUEST_STATE_CHANGED":
      return fromJS(state).setIn(action.payload.requestID.split(' '), action.payload.state).toJS();
      break;
    default:
      return state;
  }
};
