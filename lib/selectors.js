'use babel'
// @flow

import { fromJS } from "immutable";

export function getStateOfRequestID(reducer: any, requestID: string): string {
  return fromJS(reducer).getIn(requestID.split('.'), fromJS({})).get('state', 'DEFAULT');
}
