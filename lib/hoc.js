'use babel'
// @flow

import React from 'react';
import {getStateOfRequestID, getDetailsOfRequestID} from "./selectors";


export function RequestStateConnecter(mapPropsToRequestID: (props: any) => string) {
  return function(WrappedComponent) {
    return class Enhanced extends React.Component {
      render() {
        if (!this.props.requests)
          throw new Error("RequestStateConnect must get the reducer requests as props");
        return (
          <WrappedComponent {...this.props} state={getStateOfRequestID(this.props.requests, mapPropsToRequestID(this.props))} details={getDetailsOfRequestID(this.props.requests, mapPropsToRequestID(this.props))}/>
        )
      }
    }
  }
}

export function RenderedStateConnecter(
  mapStateToComponent: (state: string, props: any, details: any) => React.Element<any>,
  useCache: (props: any, state: string) => boolean | boolean = false,
  useFallback: boolean = true
) {
  return class StateDependant extends React.Component {
    render() {
      let component;
      if (mapStateToComponent("CACHE", this.props, this.props.details) && (typeof useCache == 'boolean' ? useCache : useCache(this.props, this.props.state)))
        component = mapStateToComponent("CACHE", this.props, this.props.details);
      else
        component = mapStateToComponent(this.props.state, this.props, this.props.details);
      if (component == null && useFallback)
        component = mapStateToComponent('DEFAULT', this.props, this.props.details);
      return component || null;
    }
  }
}
