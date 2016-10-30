'use babel'
// @flow

import React from 'react';
import {getStateOfRequestID} from "./selectors";


export function RequestStateConnecter(mapPropsToRequestID: (props: any) => string) {
  return function(WrappedComponent) {
    return class Enhanced extends React.Component {
      render() {
        return (
          <WrappedComponent state={getStateOfRequestID(this.props.requests, mapPropsToRequestID(this.props))} {...this.props}/>
        )
      }
    }
  }
}

export function RenderedStateConnecter(
  mapStateToComponent: (state: string, props: any) => React.Element<any>,
  useCache: (props: any, state: string) => boolean | boolean = false,
  useFallback: boolean = true
) {
  return class StateDependant extends React.Component {
    render() {
      let component;
      if (mapStateToComponent("CACHE", this.props) && (typeof useCache == 'boolean' ? useCache : useCache(this.props, this.props.state)))
        component = mapStateToComponent("CACHE", this.props);
      else
        component = mapStateToComponent(this.props.state, this.props);
      if (component == null && useFallback)
        component = mapStateToComponent('DEFAULT', this.props);
      return component != null ? React.cloneElement(component, this.props) : null;
    }
  }
}
