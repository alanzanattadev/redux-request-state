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
  replayWith: ?ReplayWithFn,
  requestID: string,
};

export const STATUS_SUCCESS = "SUCCESS";
export const STATUS_ERROR = "ERROR";
export const STATUS_PENDING = "PENDING";
export const STATUS_DEFAULT = "DEFAULT";
export const STATUS_CACHE = "CACHE";

import Route from './Route';
export type Routes = {[key: string]: Routes | Route};

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
