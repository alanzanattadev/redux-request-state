'use strict'
'use babel'
// @flow

import React from 'react';
import {fromJS} from 'immutable';

function convertMapStateToComponentOptionToFunc(mapStateToComponent) {
  if (typeof mapStateToComponent == 'function')
    return mapStateToComponent;
  else if (typeof mapStateToComponent == 'object')
    return (state, props) => mapStateToComponent[state];
  else
    throw new Error('mapStateToComponent must be a function or an object');
}

function convertMapRequestIDToPropsOptionToFunc(mapRequestIDToProps) {
  if (typeof mapRequestIDToProps == 'function')
    return mapRequestIDToProps;
  else if (typeof mapRequestIDToProps == 'object')
    return (reqID) => mapRequestIDToProps[reqID];
  else if (typeof mapRequestIDToProps == 'undefined')
    return (reqID) => undefined;
  else
    throw new Error('mapRequestIDToProps must be a function or an object');
}

export default (
  requestID: string,
  {mapStateToComponent, mapRequestIDToProps, useCache}: any = {},
  {fallbackToDefault, cached}: {fallbackToDefault: boolean, cached?: boolean} = {fallbackToDefault: true, cached: false}
) => (
  React.createClass({
    propTypes: {
      reducer: React.PropTypes.object.isRequired
    },
    render: function() {
      let mapStateToComponentFunc = convertMapStateToComponentOptionToFunc(mapStateToComponent);
      let mapRequestIDToPropsFunc = convertMapRequestIDToPropsOptionToFunc(mapRequestIDToProps);
      useCache = useCache || function() {return false};
      let reqState = fromJS(this.props.reducer).getIn(requestID.split('.'), fromJS({})).get('state', 'DEFAULT');
      let props = Object.assign({}, this.props, mapRequestIDToPropsFunc(requestID));
      let component;
      if (mapStateToComponentFunc("CACHE", props) && useCache(this.props, reqState))
        component = mapStateToComponentFunc("CACHE", props);
      else
        component = mapStateToComponentFunc(reqState, props);
      if (component == null && fallbackToDefault)
        component = mapStateToComponentFunc('DEFAULT', props);
      return component != null ? React.cloneElement(component, props) : null;
    },
  })
);
