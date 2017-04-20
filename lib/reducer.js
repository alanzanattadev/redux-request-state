"use strict";
"use babel";
// @flow weak

var { fromJS } = require("immutable");

module.exports = function reducer(state = {}, action) {
  switch (action.type) {
    case "REQUEST_STATE_CHANGED":
      return fromJS(state)
        .setIn(action.payload.requestID.split("."), {
          state: action.payload.state,
          error: action.payload.error,
          params: action.payload.params,
          data: action.payload.data,
        })
        .toJS();
      break;
    default:
      return state;
  }
};
