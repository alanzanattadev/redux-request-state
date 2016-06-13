'use strict'
'use babel'
// @flow weak


import type {PendingRequestAction, ErrorRequestAction, SuccessRequestAction} from './types';

module.exports = function middleware(config) {
  return store => next => action => {
    if (typeof action !== 'object')
      return next(action);
    else if (!(typeof action.requestID == 'string' && typeof action.resolve == 'function'))
      return next(action);
    else {
      let pendingAction: PendingRequestAction = {
        type: "REQUEST_STATE_CHANGED",
        payload: {
          requestID: action.requestID,
          state: "PENDING",
        }
      };
      store.dispatch(pendingAction);
      let returnedValue = action.resolve();
      if (typeof returnedValue === 'undefined' || typeof returnedValue.then !== 'function')
        throw new Error('Resolve must return a Promise');
      else {
        return returnedValue.then((result) => {
          let successAction: SuccessRequestAction = {
            type: "REQUEST_STATE_CHANGED",
            payload: {
              requestID: action.requestID,
              state: "SUCCESS",
            },
          };
          store.dispatch(successAction);
        }).catch((error) => {
          let errorAction: ErrorRequestAction = {
            type: "REQUEST_STATE_CHANGED",
            payload: {
              requestID: action.requestID,
              state: "ERROR",
              error
            },
          };
          store.dispatch(errorAction);
        });
      }
    }
  };
};