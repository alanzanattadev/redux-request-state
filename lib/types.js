'use babel'
// @flow weak

type Resource = {};
type Request = string;
type Promise = {then: function; catch: function};

export type PendingRequestAction = {
  type: string;
  payload: {
    requestID: Request;
    state: string;
  }
};

export type SuccessRequestAction = {
  type: string;
  payload: {
    requestID: Request;
    state: string;
  }
};

export type ErrorRequestAction = {
  type: string;
  payload: {
    requestID: Request;
    state: string;
    error: any;
  }
};
