'use strict'
'use babel'
// @flow

import React from 'react';
import {fromJS} from 'immutable';

export default (requestID, {mapStateToComponent, mapRequestIDToProps, useCache} = {}, {cached} = {}) => (
  React.createClass({
    propTypes: {
      reducer: React.PropTypes.object.isRequired
    },
    render: function() {
      let mapStateToComponentFunc;
      let mapRequestIDToPropsFunc;
      useCache = useCache || function() {false};
      if (typeof mapStateToComponent == 'function')
        mapStateToComponentFunc = mapStateToComponent;
      else if (typeof mapStateToComponent == 'object')
        mapStateToComponentFunc = (state) => mapStateToComponent[state];
      else
        throw new Error('mapStateToComponent must be a function or an object');
      if (typeof mapRequestIDToProps == 'function')
        mapRequestIDToPropsFunc = mapRequestIDToProps;
      else if (typeof mapRequestIDToProps == 'object')
        mapRequestIDToPropsFunc = (reqID) => mapRequestIDToProps[reqID];
      else if (typeof mapRequestIDToProps == 'undefined')
        mapRequestIDToPropsFunc = (reqID) => undefined;
      else
        throw new Error('mapRequestIDToProps must be a function or an object');
      let reqState = fromJS(this.props.reducer).getIn(requestID.split('.'), fromJS({})).get('state', 'DEFAULT');
      let component;
      if (mapStateToComponentFunc("CACHE") && useCache(this.props, reqState))
        component = mapStateToComponentFunc("CACHE");
      else
        component = mapStateToComponentFunc(reqState);
      let props = mapRequestIDToPropsFunc(requestID) !== undefined ? mapRequestIDToPropsFunc(requestID) : {};
      if (component !== undefined)
        return React.cloneElement(component, Object.assign({}, this.props, props));
      else
        return null;
    },
  })
);
