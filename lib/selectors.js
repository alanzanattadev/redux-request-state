'use babel'
// @flow

import { fromJS } from "immutable";

export function getStateOfRequestID(reducer: any, requestID: string): string {
  return fromJS(getRequestOfRequestID(reducer, requestID)).get('state', 'DEFAULT');
}

export function getDetailsOfRequestID(reducer: any, requestID: string): ?any {
  let request = getRequestOfRequestID(reducer, requestID);
  if (request.state == 'SUCCESS')
    return request.data;
  else if (request.state == 'ERROR')
    return request.error;
  else
    return null;
}

export function getRequestOfRequestID(reducer: any, requestID: string): any {
  return fromJS(reducer).getIn(requestID.split('.'), fromJS({})).toJS();
}
