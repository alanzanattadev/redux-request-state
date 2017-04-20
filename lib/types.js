"use babel";
// @flow weak

export type RequestID = string;
export type ResolveResult = Promise<any>;
export type ResolveFn = (...params: Array<any>) => ResolveResult;
export type ReplayWithFn = (response: any) => { type: string };
export type RequestIDFactory = (...params: Array<any>) => string;
export type RequestAction = {
  type: string,
  resolve: () => ResolveResult,
  replayWith?: ReplayWithFn,
};

export type PendingRequestAction = {
  type: string,
  payload: {
    requestID: RequestID,
    state: string,
  },
};

export type SuccessRequestAction = {
  type: string,
  payload: {
    requestID: RequestID,
    state: string,
  },
};

export type ErrorRequestAction = {
  type: string,
  payload: {
    requestID: RequestID,
    state: string,
    error: any,
  },
};
